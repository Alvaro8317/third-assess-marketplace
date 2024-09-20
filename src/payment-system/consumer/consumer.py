import grpc
import payment_pb2, payment_pb2_grpc
import re
import ast
from fastapi import FastAPI
import pika
from grpc_client.client import run as run_payment

app = FastAPI()


def run(user_id=1, amount=100.0, payment_method="credit_card"):
    with grpc.insecure_channel('gateway:50051') as channel:
        stub = payment_pb2_grpc.PaymentServiceStub(channel)
        response = stub.MakePayment(
            payment_pb2.PaymentRequest(user_id=user_id, amount=amount, payment_method=payment_method))
        return response


@app.get("/consume")
def consume_message():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host="rabbitmq", credentials=pika.PlainCredentials("user", "password")
        )
    )
    channel = connection.channel()
    channel.queue_declare(queue="payments")
    method_frame, header_frame, body = channel.basic_get(queue="payments", auto_ack=True)

    if method_frame:
        message = body.decode('utf-8')
        print(f" [x] Received {message}")
        match = re.search(r"\{.*\}", message)
        json_string = match.group(0)
        payment_details = ast.literal_eval(json_string)
        response_gateway = run_payment(user_id=payment_details["user_id"], amount=payment_details["amount"],
                                       payment_method=payment_details["payment_method"])
        connection.close()
        return {"message": message,
                "payment_details": payment_details,
                "statusGateway": response_gateway}
    connection.close()
    return {"message": "No messages in the queue"}
