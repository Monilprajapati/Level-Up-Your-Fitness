from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI
from langchain.chains import LLMChain
import re
import google.generativeai as genai

load_dotenv()

# Set up your Gemini API key

google_api_key = os.getenv("GOOGLE_API_KEY")
# Configure the Gemini model
genai.configure(api_key=google_api_key)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize the Gemini model
llm_resto = GoogleGenerativeAI(model="gemini-pro", temperature=0.6)

prompt_template_resto = PromptTemplate(
    input_variables=['age', 'gender', 'weight', 'height', 'veg_or_nonveg', 'disease', 'region', 'allergics', 'foodtype'],
    template="Diet Recommendation System:\n"
             "Based on the following criteria, please provide recommendations:\n"
             "Person age: {age}\n"
             "Person gender: {gender}\n"
             "Person weight: {weight}\n"
             "Person height: {height}\n"
             "Person veg_or_nonveg: {veg_or_nonveg}\n"
             "Person generic disease: {disease}\n"
             "Person region: {region}\n"
             "Person allergics: {allergics}\n"
             "Person foodtype: {foodtype}\n\n"
             "Please provide your recommendations in the following format, including all categories:\n"
             "Restaurants:\n[List at least 2-3 restaurant names and locations suitable for the person's diet, one per line]\n"
             "Breakfast:\n[List breakfast items, one per line]\n"
             "Dinners:\n[List dinner items, one per line]\n"
             "Workout Plans:\n[List workout types, one per line]\n"
             "Additional Considerations:\n[List any additional considerations based on the person's health conditions]\n"
             "Ensure to provide recommendations for all categories, especially restaurants. Do not use asterisks, bullet points, bold text, or any special characters."
)

def clean_and_process_list(lst):
    if not lst:
        return []
    items = lst[0].strip().split('\n')
    cleaned_items = []
    for item in items:
        if item.strip() and not item.lower().startswith(('restaurants:', 'breakfast:', 'dinners:', 'workout plans:', 'additional considerations:')):
            cleaned_item = item.strip().replace('', '').replace('*', '').replace('-', '').strip()
            if cleaned_item:
                cleaned_items.append(cleaned_item)
    return cleaned_items

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    required_fields = ['age', 'gender', 'weight', 'height', 'veg_or_nonveg', 'disease', 'region', 'allergics', 'foodtype']
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Please provide all required fields."}), 400

    try:
        chain_resto = LLMChain(llm=llm_resto, prompt=prompt_template_resto)
        results = chain_resto.run(data)

        sections = {
            'restaurant_names': r'Restaurants:(.*?)(?:Breakfast|Dinners|Workout Plans|Additional Considerations|$)',
            'breakfast_names': r'Breakfast:(.*?)(?:Dinners|Workout Plans|Additional Considerations|$)',
            'dinner_names': r'Dinners:(.*?)(?:Workout Plans|Additional Considerations|$)',
            'workout_names': r'Workout Plans:(.*?)(?:Additional Considerations|$)',
            'additional_considerations': r'Additional Considerations:(.*?)$'
        }

        processed_data = {key: clean_and_process_list(re.findall(pattern, results, re.DOTALL | re.IGNORECASE))
                          for key, pattern in sections.items()}

        processed_data = {k: v for k, v in processed_data.items() if v}

        if 'restaurant_names' not in processed_data or not processed_data['restaurant_names']:
            processed_data['restaurant_names'] = ["Please consult a local directory for restaurant recommendations."]

        if not processed_data:
            return jsonify({"error": "Sorry, we couldn't generate any recommendations. Please try again."}), 500

        response = {
            "restaurants": processed_data.get('restaurant_names', []),
            "breakfast": processed_data.get('breakfast_names', []),
            "dinners": processed_data.get('dinner_names', []),
            "workout_plans": processed_data.get('workout_names', []),
            "additional_considerations": processed_data.get('additional_considerations', [])
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)