"""
nlp_model.py
Sentiment analysis logic using HuggingFace Transformers.
"""
from transformers import pipeline

print("Loading HuggingFace Pipeline (savasy/bert-base-turkish-sentiment-cased)...")
try:
    sentiment_analyzer = pipeline("sentiment-analysis", model="savasy/bert-base-turkish-sentiment-cased")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    sentiment_analyzer = None

def analyze_ticket(description: str):
    """
    Evaluates text sentiment to determine ticket priority subclass.
    """
    if not sentiment_analyzer:
        return {"category": "UNCATEGORIZED", "priority": "NORMAL", "ai_confidence_score": 0.0}
        
    result = sentiment_analyzer(description)[0]
    label = result['label']
    score = result['score']
    
    priority = "NORMAL"
    category = "TECH_SUPPORT"
    
    if label == "negative":
        priority = "URGENT"
        category = "COMPLAINT"
    else:
        priority = "NORMAL"
        if "fatura" in description.lower() or "billing" in description.lower():
            category = "BILLING"
        elif "kargo" in description.lower() or "delivery" in description.lower():
            category = "DELIVERY"
            
    return {
        "priority": priority,
        "category": category,
        "ai_confidence_score": score
    }
