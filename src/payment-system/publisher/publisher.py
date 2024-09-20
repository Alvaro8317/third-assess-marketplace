import random
import pika
import time


def send_message():
    payment_details = {
        "amount": random.randint(3000, 10000),
        "payment_method": "Tarjeta",
        "user_id": 1,
    }
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host="rabbitmq", credentials=pika.PlainCredentials("user", "password")
        )
    )
    channel = connection.channel()

    # Declarar la cola
    channel.queue_declare(queue="payments")

    # Enviar mensaje
    message = f"New payment received! Details: {payment_details}"
    channel.basic_publish(exchange="", routing_key="payments", body=message)
    print(f" [x] Sent '{message}'")
    connection.close()


while True:
    time.sleep(15)
    send_message()
