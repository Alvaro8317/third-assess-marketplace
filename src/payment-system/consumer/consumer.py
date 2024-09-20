from fastapi import FastAPI
import pika

app = FastAPI()


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
        connection.close()
        return {"message": message}
    connection.close()
    return {"message": "No messages in the queue"}
