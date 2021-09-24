# api-ecommerce

SCRIPTS DA CRIAÇÃO DAS TABELAS:

CREATE TABLE produtos(
	´id_produto´ INT(11) NOT NULL AUTO_INCREMENT,
	´nome´ VARCHAR(45) NOT NULL,
	´preco´ FLOAT(11) NOT NULL,
	PRIMARY KEY (´id_produto´))
	//ENGINE = InnoDB
	//DEFAULT CHARACTER SET = utf8;

CREATE TABLE pedidos (
	´id_pedido´ INT(11) NOT NULL AUTO_INCREMENT,
	´id_produto´ INT(11) NOT NULL,
	´quantidade´ SMALLINT(6) NOT NULL,
	PRIMARY KEY (´id_pedido´))
	//ENGINE = InnoDB
	//DEFAULT CHARACTER SET = utf8;

INSERINDO REGISTRO:
	select * from produtos
	
insert into `produtos` (nome, preco)
	values (`Notebook`, 2100.00);	

/////////////////////////////////
select * from produtos;

describe pedidos;

select * from pedidos;
//////////////////////
SELECT      pedidos.id_pedido,
            produtos.id_produto,
            produtos.nome,
            produtos.preco,
            pedidos.quantidade
FROM        pedidos
INNER JOIN  produtos ON produtos.id_produto = pedidos.id_produto;
/////////////////////////////////	