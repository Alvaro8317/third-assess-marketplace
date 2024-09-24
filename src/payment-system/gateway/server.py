import time
from concurrent import futures
import grpc
from grpc_reflection.v1alpha import reflection
from protobuffers import payment_pb2
from protobuffers import payment_pb2_grpc


class PaymentService(payment_pb2_grpc.PaymentServiceServicer):
    def MakePayment(self, request, context):
        print(f"Processing payment for user {request.user_id} with amount {request.amount}")
        if request.amount > 0:
            return payment_pb2.PaymentResponse(status="success", message="Payment processed successfully")
        else:
            return payment_pb2.PaymentResponse(status="failed", message="Invalid payment amount")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    payment_pb2_grpc.add_PaymentServiceServicer_to_server(PaymentService(), server)
    services = [
        payment_pb2.DESCRIPTOR.services_by_name['PaymentService'].full_name,
        reflection.SERVICE_NAME
    ]
    reflection.enable_server_reflection(services, server)
    server.add_insecure_port('[::]:50051')
    print("Starting server with reflection on port 50051...")
    server.start()
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()
