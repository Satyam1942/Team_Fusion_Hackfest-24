from keras.models import load_model
import numpy as np

# Load the model
model = load_model('chatbot_model.h5')

# Example input data for prediction (you'll replace this with your own data)
input_data = np.array([[1, 2, 3, 4]])

# Make predictions
predictions = model.predict(input_data)

# Print the predictions
print("Predictions:", predictions)
