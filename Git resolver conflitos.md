# Quando você inicia clonando repositório você fica mirando seus commits para ele
Quando você clona um repositório para iniciar seus trabalhos, por exemplo quando clona um boilerplate, ou template qualquer, você essencialmente cria uma cópia dele em sua máquina local. No entanto, essa cópia ainda está vinculada ao repositório remoto original (origin). 

Portanto, qualquer comando git pull ou git push que você executar irá interagir com o repositório original por padrão, a menos que você altere a origem remota.

Para corrigir isso, você precisa desconectar seu repositório local do repositório boilerplate original e conectá-lo ao seu novo repositório no GitHub. Aqui estão os passos:

## Reiniciar o controle de versão escolhendo um novo repositório
Para manter as modificações locais, mas eliminar o histórico de pull requests e commits relacionados ao repositório original DevSkillsHQ/fullstack-boilerplate-flask-react, você pode seguir estes passos:

1. Para criar um novo repositório, acesse o GitHub e crie um repositório vazio para o seu projeto, copie a URL do novo repositório com conteúdo mostrado na barra de endereços do browser.

2. Para remover a conexão com o repositório original, no terminal, estando dentro da pasta raiz, execute o seguinte comando:

    ```bash
    git remote remove origin
    ```

3. Para inicializar um novo repositório Git na sua pasta local, execute no terminal:

    ```bash
    git init
    ```

4. Para adicionar e commitar suas alterações, adicione todos os arquivos do seu projeto ao staging area com o comando:
    
```bash
git add .
```

Agora faça um commit inicial para registrar o estado atual do seu projeto:

```bash
git commit -m "Estrutura de pastas do projeto"
```

5. Para adicionar o seu repositório como origem (origin) execute o comando:

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

Após seguir esses passos, seu repositório local estará conectado ao seu novo repositório no GitHub. Todo o histórico de pull requests e commits relacionados ao repositório original será eliminado, e quaisquer novos commits que você fizer e enviar (push) irão para o seu próprio repositório, não para o repositório boilerplate original. Assim, você terá controle total sobre o histórico de versões e a colaboração no seu projeto.

## Resumo só com os comandos da parte de iniciar a conexão com o novo repositório:

```
git add .
git commit -m "Commit inicial"
git push -u origin main
```

# Verificar para onde os commits estão apontando:
Para enxergar para onde os commits estão apontando no momento, você pode usar o comando git remote -v no seu terminal, dentro da pasta do seu projeto.

Este comando listará todos os repositórios remotos configurados no seu projeto, juntamente com as URLs associadas a eles. A saída geralmente se parece com isso:

```
origin  <URL_DO_SEU_REPOSITÓRIO> (fetch)
origin  <URL_DO_SEU_REPOSITÓRIO> (push)
```

- origin: É o nome padrão dado ao repositório remoto principal.

- <URL_DO_SEU_REPOSITÓRIO>: É a URL do repositório remoto para o qual seus commits serão enviados (push) e de onde você buscará atualizações (fetch).

Se a URL exibida corresponder à URL do seu novo repositório no GitHub, significa que seus commits estão apontando para o repositório correto.

Se a URL exibida ainda for a do repositório original DevSkillsHQ/fullstack-boilerplate-flask-react, significa que você ainda não desconectou seu repositório local do repositório original e precisa seguir os passos que descrevi anteriormente para criar um novo repositório e configurar a nova origem remota.


# Indicar uma pasta para ficar de fora do controle de versão do Git
É comum querermos que alguns arquivos ou pastas não sejam salvos no repositório remoto, seja por questões de privacidade, como arquivos de senhas, seja pelo tamanho, como para uma pasta onde armazenamos os pacotes do ambiente virtual, elas não precisam ser armazenadas no repositório remoto, basta que as versões de cada pacote sejam guardadas, por exemplo, em um arquivo requirements.txt

Considere que nosso ambiente virtual foi criado na pasta env_mus e não quero encher meu repositório remoto com arquivos desnecessários, então é preciso dizer para o Git qual pasta ele deve ignorar. Para adicionar a pasta env_mus ao .gitignore, primeiro localize o arquivo .gitignore geralmente fica na raiz do seu projeto. Abra o arquivo .gitignore em um editor de texto favorito (VS Code, Sublime Text, etc.) para abrir o arquivo .gitignore. Adicione a pasta env_mus à lista de ignorar, inserindo a seguinte linha no arquivo .gitignore:
```
env_mus/
```

Certifique-se de que não há espaços em branco antes ou depois da barra (/) no final da linha e salve o arquivo .gitignore
