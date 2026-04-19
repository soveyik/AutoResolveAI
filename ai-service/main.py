"""
main.py
Entry point for the FastAPI AI Service.
Initializes the RabbitMQ worker in a background thread.
"""
from fastapi import FastAPI
import threading
from worker import start_consuming

app = FastAPI(title="AutoResolve AI", description="Sentiment Analysis Service")

@app.on_event("startup")
def startup_event():
    print("Initializing AI Service...")
    thread = threading.Thread(target=start_consuming)
    thread.daemon = True
    thread.start()

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "AutoResolve-Worker"}
