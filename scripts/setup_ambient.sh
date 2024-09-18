#!/bin/bash

# Verificar se o python3.10-venv está instalado
if ! command -v python3.10 -m venv &> /dev/null; then
    echo "python3.10-venv não encontrado. Instalando..."
    sudo apt-get update
    sudo apt-get install -y python3.10-venv
else
    sudo apt-get install --reinstall python3.10-venv
    echo "python3.10-venv já está instalado."
fi

# Nome do ambiente virtual
ENV_NAME="env_mus"

# Criar o ambiente virtual
python3 -m venv "$ENV_NAME"

# Criar o ambiente virtual
python3 -m venv "$ENV_NAME"

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "Git não encontrado. Instalando..."
    sudo apt-get update
    sudo apt-get install -y git
else
    echo "Git já está instalado."
fi

# Verificar se o Node.js e o npm estão instalados
if ! command -v node &> /dev/null; then
    echo "Node.js e npm não encontrados. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js e npm já estão instalados."
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Docker não encontrado. Instalando..."
    sudo apt-get update
    sudo apt-get install -y docker.io
else
    echo "Docker já está instalado."
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose não encontrado. Instalando..."
    sudo apt-get update
    sudo apt-get install -y docker-compose
else
    echo "Docker Compose já está instalado."
fi

# Criar o grupo 'docker' se não existir
if ! grep -q '^docker:' /etc/group; then
    sudo groupadd docker
fi

# Adicionar o usuário atual ao grupo 'docker'
if ! groups | grep -qw docker; then
    echo "Adicionando o usuário atual ao grupo 'docker'..."
    sudo usermod -aG docker $USER
    echo "Reinicie o shell para que as alterações tenham efeito."
fi

## Dar atributos de executável ao script no Terminal Bash e rodar:
## chmod +x setup_dependencies.sh
## ./setup_dependencies.sh