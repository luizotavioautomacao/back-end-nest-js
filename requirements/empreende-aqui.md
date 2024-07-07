# Prova 

✅ - Configuração Inicial Criar um projeto NestJS  
✅ - Adicionar endpoints para registro e login de usuários  
✅ - Autenticação e Autorização Implementação de Segurança Adicionar um sistema de autenticação baseado em JWT (JSON Web Token) usando NestJS  
✅ - Implementar um sistema de autorização que permita que apenas usuários autenticados possam criar contas e registrar pagamentos  
✅ - Cadastro de Contas Criação de Contas Implementar uma API REST usando NestJS para cadastro de contas bancárias.  
✅ - Cada conta deve ter os seguintes campos: id, nome, tipo de conta (corrente, poupança), saldo inicial  
✅ - Validar os dados de entrada (por exemplo, o saldo inicial não pode ser negativo)  
✅ - Armazenar as contas em uma base de dados (por exemplo, PostgreSQL ou MongoDB)  
✅ - Cadastro de Pagamentos Criação de Pagamentos Implementar uma API REST usando NestJS para cadastro de pagamentos  
✅ - Cada pagamento deve ter os seguintes campos: id, id da conta, valor, data, descrição  
✅ - Validar que a conta associada ao pagamento existe e que o saldo da conta é suficiente para cobrir o pagamento  
✅ - Atualizar o saldo da conta após o pagamento ser registrado  
✅ - Armazenar os pagamentos na base de dados  
✅ - Relatório de Transações Geração de Relatórios Implementar uma API REST para geração de um relatório de transações por conta  
✅ - O relatório deve incluir todas as transações (pagamentos) realizadas por uma conta específica em um intervalo de datas fornecido pelo usuário  
✅ - O relatório deve incluir a soma total dos pagamentos realizados no período especificado  
✅ - Upload de Imagem para ~~Amazon S3~~ [minio](https://min.io)  
✅ - Como não foi possível usar o Amazon S3 por erro da plataforma, foi usado o [minio](https://min.io) que é compatível com Amazon S3 (acessar o gerenciador em http://localhost:9001)  
⚠️ - [bug na plataforma da amazon para completar login](amazon-s3-failed.png)  
⚠️ - [sugestões não funcionou](./amazon-s3-support.png)  
⚠️ - [não foi possível criar um buckets](./amazon-s3-buckets.png)  
✅ - Permitir que os usuários façam upload apenas de imagem associando um pagamento  
✅ - Armazenar a URL da imagem no banco de dados  

• Lembre-se que você pode utilizar os padrões de projetos que deseja, demostre todo o seu conhecimento nesta prova!  

✅ - Adicionar Docker Compose  
✅ - Adicionar MakeFile  
✅ - Adicionar .env  
❌ - Credenciais do banco de dados em .env (banco de dados sem senha)  
✅ - JWT_SECRET em .env  
✅ - Credenciais minio em .env  
✅ - Adicionar Swagger  
❌ - Documentação das apis no Swagger => acessar em http://localhost:3000/api   
✅ - Validações em auth  
❌ - Validações em bankAccount  
❌ - Validações em payment  
✅ - Encriptografar senha  
✅ - Implementar testes unitários para email-validator-adapter  
✅ - Implementar camada infra para email-validator-adapter  
✅ - Implementar camada presentatin para erros e validators  
❌ - Implementar testes unitários  
❌ - Implementar arquitetura solid  (domain, data, infra, presentation, main)  