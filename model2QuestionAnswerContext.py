from transformers import pipeline

# Load the question answering pipeline
qa_pipeline = pipeline("question-answering", model="rohandagar/my_awesome_qa_model")

# Provide context and question
context = "Your context here..."
question = "Your question here..."

# Get the answer
answer = qa_pipeline(question=question, context=context)

print(answer)