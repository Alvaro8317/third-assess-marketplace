import grpc
from protobuffers import payment_pb2, payment_pb2_grpc


def run(user_id=1, amount=100.0, payment_method="credit_card"):
    with grpc.insecure_channel('gateway:50051') as channel:
        stub = payment_pb2_grpc.PaymentServiceStub(channel)
        response = stub.MakePayment(
            payment_pb2.PaymentRequest(user_id=user_id, amount=amount, payment_method=payment_method))
        return response
