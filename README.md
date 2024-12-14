# Desafio Back-End Pigz

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

Este repositório contém a implementação de um desafio back-end utilizando tecnologias modernas e padrões de arquitetura para garantir qualidade, manutenção e escalabilidade do código.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript no lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Prisma**: ORM moderno para manipulação de banco de dados com foco em produtividade.
- **Docker**: Plataforma de conteinerização para criar ambientes isolados e replicáveis.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional robusto e escalável.

## Padrões de Arquitetura

- **Repository Pattern**: Centraliza o acesso a dados em repositórios, desacoplando a lógica de negócio da camada de persistência.
- **Factory Pattern**: Fornece uma maneira de criar objetos de forma organizada e flexível, garantindo que as dependências sejam resolvidas corretamente.

## Configuração do Ambiente

### Requisitos

- Docker e Docker Compose instalados.
- Node.js (v14 ou superior) e npm/yarn.

### Passos para Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/desafio-pigz.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd desafio-pigz
   ```
3. Inicie os containers:
   ```bash
   docker-compose up -d
   ```
4. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
5. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. Crie uma arquivo .env na raíz do projeto e defina suas varíaveis de ambiente baseado no arquivo .env.example:

   ```bash
    .env
   ```

7. Inicie a aplicação:
   ```bash
   npm run start
   # ou
   yarn start
   ```

## Estrutura do Projeto

```
/src
  |-- controllers    # Controladores da aplicação
  |-- errors         # Manipulação de erros e exceções
  |-- factories      # Factories para criar instâncias de classes
  |-- helpers        # Interface utilitárias para suporte ao código
  |-- middlewares    # Interceptadores para requisições HTTP (apenas lógica de autorização com JWT)
  |-- repositories   # Implementações do Repository Pattern para acesso a dados
  |-- types          # Definições de tipos e interfaces
  |-- use-case       # Casos de uso que representam a lógica de negócios
  index.ts           # Ponto de entrada da aplicação
```

## Melhorias Futuras

- Implementar testes de carga e desempenho.
- Implementar testes E2E
- Documentar a API usando Swagger
