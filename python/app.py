from flask import Flask, render_template, request, jsonify
import os
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI
from langchain.chains import LLMChain
import re
import google.generativeai as genai

# Set up your Gemini API key
os.environ['GOOGLE_API_KEY'] = 'AIzaSyAIHpltEk3Hr39dGWjNbnnUinzQKiaJbmU'

# Configure the Gemini model
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

app = Flask(__name__)

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
            # Remove asterisks, bold markdown syntax, and hyphens
            cleaned_item = item.strip().replace('*', '').replace('**', '').replace('-', '').strip()
            # Only add non-empty items
            if cleaned_item:
                cleaned_items.append(cleaned_item)
    return cleaned_items

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    if request.method == "POST":
        required_fields = ['age', 'gender', 'weight', 'height', 'veg_or_nonveg', 'disease', 'region', 'allergics', 'foodtype']
        if not all(field in request.form for field in required_fields):
            return jsonify({"error": "Please fill all required fields."}), 400

        input_data = {field: request.form[field] for field in required_fields}

        try:
            chain_resto = LLMChain(llm=llm_resto, prompt=prompt_template_resto)
            results = chain_resto.run(input_data)

            sections = {
                'restaurant_names': r'Restaurants:(.*?)(?:Breakfast|Dinners|Workout Plans|Additional Considerations|$)',
                'breakfast_names': r'Breakfast:(.*?)(?:Dinners|Workout Plans|Additional Considerations|$)',
                'dinner_names': r'Dinners:(.*?)(?:Workout Plans|Additional Considerations|$)',
                'workout_names': r'Workout Plans:(.*?)(?:Additional Considerations|$)',
                'additional_considerations': r'Additional Considerations:(.*?)$'
            }

            data = {key: clean_and_process_list(re.findall(pattern, results, re.DOTALL | re.IGNORECASE))
                    for key, pattern in sections.items()}

            data = {k: v for k, v in data.items() if v}

            if 'restaurant_names' not in data or not data['restaurant_names']:
                data['restaurant_names'] = ["Please consult a local directory for restaurant recommendations."]

            if not data:
                return jsonify({"error": "Sorry, we couldn't generate any recommendations. Please try again."}), 500

            # Prepare the JSON response
            response = {
                "restaurants": data.get('restaurant_names', []),
                "breakfast": data.get('breakfast_names', []),
                "dinners": data.get('dinner_names', []),
                "workout_plans": data.get('workout_names', []),
                "additional_considerations": data.get('additional_considerations', [])
            }

            return jsonify(response), 200

        except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    return jsonify({"error": "Method not allowed"}), 405

if __name__ == '__main__':
    app.run(debug=True)