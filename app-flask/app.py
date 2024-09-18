from flask import Flask, request, jsonify
import compose

app = Flask(__name__)

@app.route('/')  # Rota para a raiz
def hello():
    return "Bem-vindos compositores!"

@app.route('/generate-music', methods=['POST'])
def generate_music():
    data = request.get_json()
    letra = data['letra']
    estilo = data['estilo']

    melodia, acordes = compose.criar_musica(letra, estilo)

    # TODO: Integrar com Neo4j e Ollama (opcional)

    return jsonify({'melodia': melodia, 'acordes': acordes})

if __name__ == '__main__':
    app.run(debug=True)
