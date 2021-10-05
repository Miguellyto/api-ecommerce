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

Criei a pasta no windows, criei a pasta no site githut e os comandos abaixo não estão funcionando.
-git remote add origin https://github.com/Miguellyto/api-conect.git
-git push -u origin master

Segue o erro:
fatal: remote origin already exists.

Olavo, isso provavelmente está acontecendo porque você já rodou a primeira linha outra vez. Se você executar o comando git remote deve aparecer "origin", indicando que esse repositório remoto, no Github, já foi configurado.
Se for esse mesmo o caso, basta usá-lo, ou seja, pode pular essa primeira linha e partir direto pro

-git push -u origin master

ou
-git push --set-upstream origin main


//////////////////////////////////////////////////////////////////////////////
confirmar em 'main'
git push
npm start