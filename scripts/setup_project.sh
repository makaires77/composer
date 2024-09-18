#!/bin/bash

# Nome do ambiente virtual
ENV_NAME="env_mus"

# Ativar o ambiente virtual
source "$ENV_NAME/bin/activate"

# Clonar o repositório fullstack-boilerplate-flask-react
git clone --depth 1 --recursive https://github.com/DevSkillsHQ/fullstack-boilerplate-flask-react.git temp_repo

# Move the contents of the temporary directory to the current directory
mv temp_repo/* .
mv temp_repo/.* .
rm -rf temp_repo

# Instalar as dependências do backend (Flask)
pip install -r requirements.txt

# Instalar PyTorch com suporte a CUDA (se disponível)
if command -v nvidia-smi &> /dev/null; then
  echo "GPU detected. Installing PyTorch with CUDA support."
  # Verifique a versão do CUDA e ajuste a URL abaixo
  pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu124 
else
  echo "No GPU detected. Installing CPU-only PyTorch."
  pip install torch torchvision torchaudio
fi

# Instalar PyTorch Geometric
pip install torch-geometric

# Criar e executar os containers Docker para o Neo4j e o Ollama
# (Certifique-se de ter os arquivos docker-compose.yml e .env configurados)
# Habilitar a integração do WSL 2 nas configurações do Docker Desktop manualmente.
# Aqui estão os passos detalhados:

# Abra o Docker Desktop: Inicie o Docker Desktop no seu sistema Windows.
# Acesse as Configurações: Clique no ícone de engrenagem no canto superior direito da janela do Docker Desktop para abrir as configurações.
# Navegue até a seção WSL Integration: Na barra lateral esquerda, procure e clique na seção "Resources" e, em seguida, em "WSL Integration".
# Habilite a integração para sua distribuição: Na seção "WSL Integration", você verá uma lista das distribuições WSL instaladas em seu sistema. Localize a distribuição que você está usando para o seu projeto (provavelmente Ubuntu ou outra que você escolheu) e marque a caixa de seleção ao lado dela para habilitar a integração.
# Aplique as alterações: Clique no botão "Apply & Restart" para aplicar as alterações e reiniciar o Docker Desktop.

# Após seguir esses passos, o Docker Desktop estará configurado para funcionar com o WSL 2, e você poderá executar seus containers Docker diretamente no ambiente WSL.

# Observações:
# Certificar de usar uma versão recente do Docker Desktop que suporte a integração com o WSL 2.
# Se há várias distribuições WSL instaladas, habilitar a integração apenas a qual usar com o Docker.
# Se você encontrar algum problema durante a configuração, consulte a documentação oficial do Docker Desktop para obter mais informações e solução de problemas.
# Com a integração do WSL 2 habilitada, o script Bash que você criou anteriormente poderá executar os containers Docker no WSL sem problemas, permitindo que você utilize o Docker Desktop em conjunto com seu ambiente de desenvolvimento no WSL.

docker-compose up -d

## Dar atributos de executável ao script no Terminal Bash e rodar:
## chmod +x setup_project.sh
## ./setup_project.sh