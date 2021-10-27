# api-ecommerce
//////////////////
confirmar em 'main'
git push
npm start
//////////////////

SCRIPTS DA CRIAÇÃO DAS TABELAS:

CREATE TABLE produtos(
	id_produto INT(11) NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	preco FLOAT(11) NOT NULL,
	PRIMARY KEY (id_produto))
	//ENGINE = InnoDB
	//DEFAULT CHARACTER SET = utf8;

CREATE TABLE pedidos (
	id_pedido INT(11) NOT NULL AUTO_INCREMENT,
	id_produto INT(11) NOT NULL,
	quantidade SMALLINT(6) NOT NULL,
	PRIMARY KEY (id_pedido))
	//ENGINE = InnoDB
	//DEFAULT CHARACTER SET = utf8;

INSERINDO REGISTRO:
	select * from produtos
	
insert into `produtos` (nome, preco)
	values (`Notebook`, 2100.00);	

#/////////////////////////////////

select * from produtos;
select * from pedidos;
describe pedidos;

#//////////////////////

SELECT      pedidos.id_pedido,
            produtos.id_produto,
            produtos.nome,
            produtos.preco,
            pedidos.quantidade
FROM        pedidos
INNER JOIN  produtos ON produtos.id_produto = pedidos.id_produto;

#/////////////////////////////////
ALTER TABLE produtos
ADD COLUMN imagem_produto VARCHAR(500);

CREATE TABLE IF NOT EXISTS imagens_produtos (
    id_imagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,
    caminho VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);

//////////////////////////////////////////////////////////////////////////////

Criei a pasta no windows e no githut e os comandos abaixo não estão funcionando.
-git remote add origin https://github.com/Miguellyto/api-conect.git
-git push -u origin master

Segue o erro:
fatal: remote origin already exists.

Isso provavelmente está acontecendo porque você já rodou a primeira linha outra vez. Se você executar o comando git remote deve aparecer "origin", indicando que esse repositório remoto, no Github, já foi configurado.
Se for esse mesmo o caso, basta usá-lo, ou seja, pode pular essa primeira linha e partir direto pro

-git push -u origin master
ou
-git push --set-upstream origin main

//////////////////////////////////////////////////////////////////////////////

confirmar em 'main'

git push

npm start

//////////////////////////////////////////////////////////////////////////////
ATALHOS NO VSCODE:

#-CTRL+ESPAÇO = Monta a estrutura da var,for,if.

#-ALT+SETA CIMA/BAIXO = desloca linha no VSCode.

#-CTRL+' (aspas simples) = ativa e desativa o terminal no VSCode.

#-SHIFT+ALT+F = sql formate extensão.

#-CTRL+SHIFT+P = e digita "formatar" e escolhe mysql.

#-CTRL+SHIFT+F = identação do cod.

#-CTRL+E depois H = mostra o histórico de um file.

#-CTRL+G = Pesquisa por linha.

#-CTRL+E, S = PESQUISA NO BANCO NO VSCode.

#-CTRL+D = Edita varias linhas no VSCode, CTRL+D vai selecionando outras palavars iguais.

#-CTRL+SHIFT+ALT+ SETA DIREITA/ESQUERDA = APOS SELECIONAR AS LINHAS, posiciona o curso para fazer alterações

#-SHIFT+ALT + SETA Down/Up =  APOS SELECIONAR AS LINHAS, duplicas a(s) linha(s).

///////////////////////////////////////////////////
Alterar repositório remoto git

Existem algumas respostas diferentes para essa pergunta, mas a que melhor se adequou à situação foi o seguinte:

git remote rm origin/git remote remove origin
git remote add origin https://github.com/Miguellyto/api-laser.git
git branch -M main
git push -u origin main

Alterar o diretório remoto
git remote set-url origin git://suaUrl

Ou pode renomeá-lo o atual e adicionar um novo.
git remote rename origin old-origin
git remote add origin novaurl

https://pt.stackoverflow.com/questions/111842/alterar-reposit%C3%B3rio-remoto-git
https://gist.github.com/leocomelli/2545add34e4fec21ec16
