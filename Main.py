from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app) 

genai.configure(api_key="put your api key here!")
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/ask', methods=['POST'])
def ask_teacher():
    data = request.json
    prompt_usuario = data.get("prompt")

    instrucao = f"""
    Você é um professor de matemática de alto nível da BhaskarMath Academy.
    Resolva e explique para o aluno: {prompt_usuario}.
    Regras: 1. Linguagem didática. 2. Explique a fórmula. 3. Use quebras de linha.
    """

    try:
        response = model.generate_content(instrucao)
    
        return jsonify({"text": response.text.replace("\n", "<br>")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

