# Prova

✅ Configuração Inicial Criar um projeto NestJS
✅ Adicionar endpoints para registro e login de usuários
Autenticação e Autorização Implementação de Segurança Adicionar um sistema de autenticação baseado em JWT (JSON Web Token) usando NestJS

• Cadastro de Contas Criação de Contas Implementar uma API REST usando NestJS para cadastro de contas bancárias. Cada conta deve ter os seguintes campos:
id, nome, tipo de conta (corrente, poupança), saldo inicial. 
Validar os dados de entrada (por exemplo, o saldo inicial não pode ser negativo). 
Armazenar as contas em uma base de dados (por exemplo, PostgreSQL ou MongoDB).

• Cadastro de Pagamentos Criação de Pagamentos Implementar uma API REST usando NestJS para cadastro de pagamentos. 
Cada pagamento deve ter os seguintes campos: id, id da conta, valor, data, descrição. 
Validar que a conta associada ao pagamento existe e que o saldo da conta é suficiente para cobrir o pagamento. 
Atualizar o saldo da conta após o pagamento ser registrado. 
Armazenar os pagamentos na base de dados.

• Relatório de Transações Geração de Relatórios Implementar uma API REST para geração de um relatório de transações por conta. 
O relatório deve incluir todas as transações (pagamentos) realizadas por uma conta específica em um intervalo de datas fornecido pelo usuário. 
O relatório deve incluir a soma total dos pagamentos realizados no período especificado.

• . 
Implementar um sistema de autorização que permita que apenas usuários autenticados possam criar contas e registrar pagamentos. 


• Upload de Imagem para Amazon S3 Permitir que os usuários façam upload apenas de imagem associando um pagamento. 
Armazenar a URL da imagem no banco de dados.

• Lembre-se que você pode utilizar os padrões de projetos que deseja, demostre todo o seu conhecimento nesta prova!