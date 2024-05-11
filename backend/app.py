from flask import Flask, render_template, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM , pipeline

import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")

text_qa_model = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

# Function to generate summaries
def generate_summary(text):
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", max_length=5120, truncation=True)

    # Generate summary
    summary_ids = model.generate(inputs.input_ids, max_length=500, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)

    # Decode and return summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

@app.route('/summarize', methods=['POST'])
def home():
    data = request.json
    input_text = data['text']
    print(input_text)
    summary = generate_summary(input_text)
    return jsonify({'summary': summary});

@app.route('/answer', methods=['POST'])
def get_answer():
    # Get question from request data
    question = request.json['question']
    
    # Get context from request data (optional)
    context = request.json['context']
    
    # Get the answer
    answer = text_qa_model(question=question, context=context)
    
    # Return answer as JSON response
    return jsonify(answer)

if __name__ == '__main__':
    app.run(debug=True)