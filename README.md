# Instalação da API


## Clone

1. Clonar o repo para um diretório local

---

## Configurar virtual enviroment

Dentro do diretório do projeto, criar e ativar o virtual enviroment.

1. virtualenv venv
2. source venv/bin/activate

---

## Instalar dependências

1. pip install -r requirements.txt

---

## Configurar o postgres

Criar database e usuário do postgres

1. **Comando para inciar o postgres:** psql

2. CREATE DATABASE estagio_web;
3. CREATE USER postgres;
4. GRANT ALL PRIVILEGES ON DATABASE estagio_web TO postgres;

5. **Comando para sair do postgres:** \q

---

## Config.py do projeto

Verificar se o nome do database no arquivo de configurações do projeto corresponde ao que foi criado

1. SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:3khkydv7@localhost/estagio_web'

---

## Startar o DB no postgres

Processo realizado na UI do postgres

---

## Update no DB da aplicação e iniciar o servidor

1. ./utils_gen/update_database.sh
2. ./utils_gen/start_server.sh 

---

## Popular o DB

Através do pgAdmin, executar o escript abaixo no DB da Api.


```sql

delete from privileges;
delete from resources;
delete from actions;
delete from controllers;
--delete from users;
delete from roles;

---
--  Roles
---

insert into roles (id, name) values (1, 'administrator');
insert into roles (id, name) values (2, 'users');

---
--  Standard users
---

insert into users (username, password, role_id, email) values ('admin', 'sha256$l2ygbSdF$2d03f994b4d99fdf6ca30832852826564189f3438a9f6abc7249bc74c08b7843', 1, 'lucasssousa10@gmail.com');
insert into users (username, password, role_id, email) values ('user', 'sha256$l2ygbSdF$2d03f994b4d99fdf6ca30832852826564189f3438a9f6abc7249bc74c08b7843', 2, 'lucas.sousa@ppgcc.ifce.edu.br');

---
--  Controllers
---

insert into controllers (id, name) values (1, 'users');
insert into controllers (id, name) values (2, 'centroEstagio');	
insert into controllers (id, name) values (3, 'tipoEstudante');
insert into controllers (id, name) values (4, 'seguradora');
insert into controllers (id, name) values (5, 'empresa');
insert into controllers (id, name) values (6, 'contatoEmpresa');
insert into controllers (id, name) values (7, 'contratoEmpresa');

---
--  Actions
---

insert into actions (id, name) values (1, 'all');
insert into actions (id, name) values (2, 'view');
insert into actions (id, name) values (3, 'add');
insert into actions (id, name) values (4, 'edit');
insert into actions (id, name) values (5, 'delete');

---
--  Resources
---

insert into resources (id, controller_id, action_id) values (  1, 1, 1); -- users/all
insert into resources (id, controller_id, action_id) values (  2, 1, 2); -- users/view
insert into resources (id, controller_id, action_id) values (  3, 1, 3); -- users/add
insert into resources (id, controller_id, action_id) values (  4, 1, 4); -- users/edit
insert into resources (id, controller_id, action_id) values (  5, 1, 5); -- users/delete

insert into resources (id, controller_id, action_id) values (  6, 2, 1); -- centroEstagio/all
insert into resources (id, controller_id, action_id) values (  7, 2, 2); -- centroEstagio/view
insert into resources (id, controller_id, action_id) values (  8, 2, 3); -- centroEstagio/add
insert into resources (id, controller_id, action_id) values (  9, 2, 4); -- centroEstagio/edit
insert into resources (id, controller_id, action_id) values ( 10, 2, 5); -- centroEstagio/delete

insert into resources (id, controller_id, action_id) values ( 11, 3, 1); -- tipoEstudante/all
insert into resources (id, controller_id, action_id) values ( 12, 3, 2); -- tipoEstudante/view
insert into resources (id, controller_id, action_id) values ( 13, 3, 3); -- tipoEstudante/add
insert into resources (id, controller_id, action_id) values ( 14, 3, 4); -- tipoEstudante/edit
insert into resources (id, controller_id, action_id) values ( 15, 3, 5); -- tipoEstudante/delete

insert into resources (id, controller_id, action_id) values ( 16, 4, 1); -- seguradora/all
insert into resources (id, controller_id, action_id) values ( 17, 4, 2); -- seguradora/view
insert into resources (id, controller_id, action_id) values ( 18, 4, 3); -- seguradora/add
insert into resources (id, controller_id, action_id) values ( 19, 4, 4); -- seguradora/edit
insert into resources (id, controller_id, action_id) values ( 20, 4, 5); -- seguradora/delete

insert into resources (id, controller_id, action_id) values ( 21, 5, 1); -- empresa/all
insert into resources (id, controller_id, action_id) values ( 22, 5, 2); -- empresa/view
insert into resources (id, controller_id, action_id) values ( 23, 5, 3); -- empresa/add
insert into resources (id, controller_id, action_id) values ( 24, 5, 4); -- empresa/edit
insert into resources (id, controller_id, action_id) values ( 25, 5, 5); -- empresa/delete

insert into resources (id, controller_id, action_id) values ( 26, 6, 1); -- contatoEmpresa/all
insert into resources (id, controller_id, action_id) values ( 27, 6, 2); -- contatoEmpresa/view
insert into resources (id, controller_id, action_id) values ( 28, 6, 3); -- contatoEmpresa/add
insert into resources (id, controller_id, action_id) values ( 29, 6, 4); -- contatoEmpresa/edit
insert into resources (id, controller_id, action_id) values ( 30, 6, 5); -- contatoEmpresa/delete

insert into resources (id, controller_id, action_id) values ( 31, 7, 1); -- contratoEmpresa/all
insert into resources (id, controller_id, action_id) values ( 32, 7, 2); -- contratoEmpresa/view
insert into resources (id, controller_id, action_id) values ( 33, 7, 3); -- contratoEmpresa/add
insert into resources (id, controller_id, action_id) values ( 34, 7, 4); -- contratoEmpresa/edit
insert into resources (id, controller_id, action_id) values ( 35, 7, 5); -- contratoEmpresa/delete

---
--  Privileges
---

-- administrator

insert into privileges (role_id, resource_id, allow) values (1,  1, true); -- users/all
insert into privileges (role_id, resource_id, allow) values (1,  2, true); -- users/view
insert into privileges (role_id, resource_id, allow) values (1,  3, true); -- users/add
insert into privileges (role_id, resource_id, allow) values (1,  4, true); -- users/edit
insert into privileges (role_id, resource_id, allow) values (1,  5, true); -- users/delete

insert into privileges (role_id, resource_id, allow) values (1,  6, true); -- centroEstagio/all
insert into privileges (role_id, resource_id, allow) values (1,  7, true); -- centroEstagio/view
insert into privileges (role_id, resource_id, allow) values (1,  8, true); -- centroEstagio/add
insert into privileges (role_id, resource_id, allow) values (1,  9, true); -- centroEstagio/edit
insert into privileges (role_id, resource_id, allow) values (1, 10, true); -- centroEstagio/delete

insert into privileges (role_id, resource_id, allow) values (1, 11, true); -- tipoEstudante/all
insert into privileges (role_id, resource_id, allow) values (1, 12, true); -- tipoEstudante/view
insert into privileges (role_id, resource_id, allow) values (1, 13, true); -- tipoEstudante/add
insert into privileges (role_id, resource_id, allow) values (1, 14, true); -- tipoEstudante/edit
insert into privileges (role_id, resource_id, allow) values (1, 15, true); -- tipoEstudante/delete

insert into privileges (role_id, resource_id, allow) values (1, 16, true); -- seguradora/all
insert into privileges (role_id, resource_id, allow) values (1, 17, true); -- seguradora/view
insert into privileges (role_id, resource_id, allow) values (1, 18, true); -- seguradora/add
insert into privileges (role_id, resource_id, allow) values (1, 19, true); -- seguradora/edit
insert into privileges (role_id, resource_id, allow) values (1, 20, true); -- seguradora/delete

insert into privileges (role_id, resource_id, allow) values (1, 21, true); -- empresa/all
insert into privileges (role_id, resource_id, allow) values (1, 22, true); -- empresa/view
insert into privileges (role_id, resource_id, allow) values (1, 23, true); -- empresa/add
insert into privileges (role_id, resource_id, allow) values (1, 24, true); -- empresa/edit
insert into privileges (role_id, resource_id, allow) values (1, 25, true); -- empresa/delete

insert into privileges (role_id, resource_id, allow) values (1, 26, true); -- contatoEmpresa/all
insert into privileges (role_id, resource_id, allow) values (1, 27, true); -- contatoEmpresa/view
insert into privileges (role_id, resource_id, allow) values (1, 28, true); -- contatoEmpresa/add
insert into privileges (role_id, resource_id, allow) values (1, 29, true); -- contatoEmpresa/edit
insert into privileges (role_id, resource_id, allow) values (1, 30, true); -- contatoEmpresa/delete

insert into privileges (role_id, resource_id, allow) values (1, 31, true); -- contratoEmpresa/all
insert into privileges (role_id, resource_id, allow) values (1, 32, true); -- contratoEmpresa/view
insert into privileges (role_id, resource_id, allow) values (1, 33, true); -- contratoEmpresa/add
insert into privileges (role_id, resource_id, allow) values (1, 34, true); -- contratoEmpresa/edit
insert into privileges (role_id, resource_id, allow) values (1, 35, true); -- contratoEmpresa/delete

-- users

insert into privileges (role_id, resource_id, allow) values (2, 1, false); -- users/all
insert into privileges (role_id, resource_id, allow) values (2, 2, false); -- users/view
insert into privileges (role_id, resource_id, allow) values (2, 3, false); -- users/add
insert into privileges (role_id, resource_id, allow) values (2, 4, false); -- users/edit
insert into privileges (role_id, resource_id, allow) values (2, 5, false); -- users/delete

insert into privileges (role_id, resource_id, allow) values (2,  6, true); -- centroEstagio/all
insert into privileges (role_id, resource_id, allow) values (2,  7, true); -- centroEstagio/view
insert into privileges (role_id, resource_id, allow) values (2,  8, true); -- centroEstagio/add
insert into privileges (role_id, resource_id, allow) values (2,  9, true); -- centroEstagio/edit
insert into privileges (role_id, resource_id, allow) values (2, 10, true); -- centroEstagio/delete

insert into privileges (role_id, resource_id, allow) values (2, 11, true); -- tipoEstudante/all
insert into privileges (role_id, resource_id, allow) values (2, 12, true); -- tipoEstudante/view
insert into privileges (role_id, resource_id, allow) values (2, 13, true); -- tipoEstudante/add
insert into privileges (role_id, resource_id, allow) values (2, 14, true); -- tipoEstudante/edit
insert into privileges (role_id, resource_id, allow) values (2, 15, true); -- tipoEstudante/delete

insert into privileges (role_id, resource_id, allow) values (2, 16, true); -- seguradora/all
insert into privileges (role_id, resource_id, allow) values (2, 17, true); -- seguradora/view
insert into privileges (role_id, resource_id, allow) values (2, 18, true); -- seguradora/add
insert into privileges (role_id, resource_id, allow) values (2, 19, true); -- seguradora/edit
insert into privileges (role_id, resource_id, allow) values (2, 20, true); -- seguradora/delete

insert into privileges (role_id, resource_id, allow) values (2, 21, true); -- empresa/all
insert into privileges (role_id, resource_id, allow) values (2, 22, true); -- empresa/view
insert into privileges (role_id, resource_id, allow) values (2, 23, true); -- empresa/add
insert into privileges (role_id, resource_id, allow) values (2, 24, true); -- empresa/edit
insert into privileges (role_id, resource_id, allow) values (2, 25, true); -- empresa/delete

insert into privileges (role_id, resource_id, allow) values (2, 26, true); -- contatoEmpresa/all
insert into privileges (role_id, resource_id, allow) values (2, 27, true); -- contatoEmpresa/view
insert into privileges (role_id, resource_id, allow) values (2, 28, true); -- contatoEmpresa/add
insert into privileges (role_id, resource_id, allow) values (2, 29, true); -- contatoEmpresa/edit
insert into privileges (role_id, resource_id, allow) values (2, 30, true); -- contatoEmpresa/delete

insert into privileges (role_id, resource_id, allow) values (2, 31, true); -- contratoEmpresa/all
insert into privileges (role_id, resource_id, allow) values (2, 32, true); -- contratoEmpresa/view
insert into privileges (role_id, resource_id, allow) values (2, 33, true); -- contratoEmpresa/add
insert into privileges (role_id, resource_id, allow) values (2, 34, true); -- contratoEmpresa/edit
insert into privileges (role_id, resource_id, allow) values (2, 35, true); -- contratoEmpresa/delete

```

