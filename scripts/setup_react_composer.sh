#!/bin/bash

# Criar a pasta 'components' se não existir
mkdir -p app-react/src/components

# Navegar para o diretório do frontend (React)
cd app-react

# Instalar as dependências do frontend
npm install

# Instalar bibliotecas para visualização do teclado virtual (exemplo: react-piano)
npm install react-piano

# Voltar para o diretório raiz do projeto
cd ..

# Criar a rota '/generate-music' no backend
cat << EOF > app-flask/app.py
from flask import Flask, request, jsonify
import composer

app = Flask(__name__)

@app.route('/generate-music', methods=['POST'])
def generate_music():
    data = request.get_json()
    letra = data['letra']
    estilo = data['estilo']

    melodia, acordes = composer.criar_musica(letra, estilo)

    # TODO: Integrar com Neo4j e Ollama (opcional)

    return jsonify({'melodia': melodia, 'acordes': acordes})

if __name__ == '__main__':
    app.run(debug=True)
EOF


## Dar atributos de executável ao script no Terminal Bash e rodar:
## chmod +x setup_react_composer.sh
## ./setup_react_composer.sh