"""
worker.py
RabbitMQ consuming logic to process tickets asynchronously.
"""
import pika
import json
import time
from nlp_model import analyze_ticket

def start_consuming():
    print("Worker: Initializing RabbitMQ listener...")
    
    connection = None
    while not connection:
        try:
            credentials = pika.PlainCredentials('admin', 'password123')
            parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)
            connection = pika.BlockingConnection(parameters)
        except pika.exceptions.AMQPConnectionError:
            print("Worker: Connection failed, retrying in 5 seconds...")
            time.sleep(5)
            
    channel = connection.channel()
    channel.queue_declare(queue='ticket_created_queue', durable=True)
    
    def callback(ch, method, properties, body):
        ticket_data = json.loads(body)
        print(f"Received ticket: {ticket_data.get('title')}")
        
        try:
           ai_result = analyze_ticket(ticket_data.get('description', ''))
           print(f"Analysis Status: {ai_result['priority']}")
        except Exception as e:
           print(f"Processing Error: {e}")
        
        ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='ticket_created_queue', on_message_callback=callback)
    
    print("Worker: Awaiting messages...")
    channel.start_consuming()

if __name__ == '__main__':
    start_consuming()
