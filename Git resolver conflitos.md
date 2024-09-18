# Excluir pasta do controle de versão do Git
Para adicionar a pasta env_mus ao .gitignore, siga estes passos:

Localize o arquivo .gitignore:
O arquivo .gitignore geralmente está localizado na raiz do seu projeto. Se você estiver usando o boilerplate que mencionou anteriormente, ele deve estar na pasta encantar.
Abra o arquivo .gitignore em um editor de texto:
Utilize seu editor de texto favorito (VS Code, Sublime Text, etc.) para abrir o arquivo .gitignore.
Adicione a pasta env_mus:
Insira a seguinte linha no arquivo .gitignore:
env_mus/

Certifique-se de que não há espaços em branco antes ou depois da barra (/) no final da linha.

Salve o arquivo .gitignore

# Verificar para onde os commits estão apontando:
Para enxergar para onde os commits estão apontando no momento, você pode usar o comando git remote -v no seu terminal, dentro da pasta do seu projeto.

Este comando listará todos os repositórios remotos configurados no seu projeto, juntamente com as URLs associadas a eles. A saída geralmente se parece com isso:

origin  <URL_DO_SEU_REPOSITÓRIO> (fetch)
origin  <URL_DO_SEU_REPOSITÓRIO> (push)
origin: É o nome padrão dado ao repositório remoto principal.
<URL_DO_SEU_REPOSITÓRIO>: É a URL do repositório remoto para o qual seus commits serão enviados (push) e de onde você buscará atualizações (fetch).
Interpretando a saída:

Se a URL exibida corresponder à URL do seu novo repositório no GitHub, significa que seus commits estão apontando para o repositório correto.
Se a URL exibida ainda for a do repositório original DevSkillsHQ/fullstack-boilerplate-flask-react, significa que você ainda não desconectou seu repositório local do repositório original e precisa seguir os passos que descrevi anteriormente para criar um novo repositório e configurar a nova origem remota.

# Reiniciar o controle de versão escolhendo um novo repositório
Para manter as modificações locais, mas eliminar o histórico de pull requests e commits relacionados ao repositório original DevSkillsHQ/fullstack-boilerplate-flask-react, você pode seguir estes passos:

1. Criar um novo repositório no GitHub:
    Acesse sua conta no GitHub e crie um novo repositório vazio para o seu projeto.
    Copie a URL do novo repositório.
2. Remover a conexão com o repositório original:
    No terminal, dentro da pasta do seu projeto (encantar), execute o seguinte comando:

    ```bash
    git remote remove origin
    ```

    Isso remove a conexão com o repositório original do boilerplate.

3. Inicializar um novo repositório Git:
    Inicialize um novo repositório Git na sua pasta local:

    ```bash
    git init
    ```

4. Adicionar e commitar suas alterações:

Adicione todos os arquivos do seu projeto ao staging area:
    
```bash
git add .
```

Faça um commit inicial para registrar o estado atual do seu projeto:

```bash
git commit -m "Estrutura de pastas do projeto"
```

5. Adicionar o seu repositório como origem (origin):

Adicione o seu novo repositório como a origem remota:

```bash
git remote add origin <URL_DO_SEU_REPOSITÓRIO>
```

Substitua <URL_DO_SEU_REPOSITÓRIO> pela URL do repositório que você criou no GitHub.

6. Enviar as alterações para o seu novo repositório:

Envie (push) as alterações para o seu repositório no GitHub:

```bash
git push -u origin main
```

A opção -u configura o seu branch local main para rastrear o branch remoto origin/main, facilitando futuros pushs e pulls.

Após seguir esses passos:
    Você terá um novo repositório Git na sua pasta local, com um histórico de commits limpo, contendo apenas as suas modificações.
    
O novo repositório estará conectado ao seu repositório no GitHub, permitindo que você faça push e pull das suas alterações.
    
Todo o histórico de pull requests e commits relacionados ao repositório original DevSkillsHQ/fullstack-boilerplate-flask-react será eliminado.
