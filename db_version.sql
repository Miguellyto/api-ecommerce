select * from produtos;

describe pedidos;

---24-09-2021
select * from pedidos;

SELECT      pedidos.id_pedido,
            produtos.id_produto,
            produtos.nome,
            produtos.preco,
            pedidos.quantidade
FROM        pedidos
INNER JOIN  produtos ON produtos.id_produto = pedidos.id_produto;

---27-09-2021
describe produtos;

ALTER TABLE produtos
ADD COLUMN imagem_produto VARCHAR(500);

select * from produtos;

show tables;

CREATE TABLE IF NOT EXISTS imagens_produtos (
    id_imagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,
    caminho VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);

describe imagens_produtos;

--05-10-2021
CREATE TABLE usuarios (
id_usuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
email UNIQUE varchar (100),
senha varchar (100)
);


select * from usuarios;
DESCRIBE usuarios;

show tables;    

ALTER TABLE usuarios ADD UNIQUE (email);
RENAME TABLE usuario TO usuarios

--NO POSTGRES:
CREATE DATABASE ecommerce
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE IF NOT EXISTS public.produtos
(
    sku integer NOT NULL DEFAULT nextval('produtos_produtosid_seq'::regclass),
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    quantidade integer NOT NULL,
    preco numeric(10,2),
    CONSTRAINT produtos_pkey PRIMARY KEY (sku)
)

CREATE TABLE pedidos (
	id_pedido SERIAL PRIMARY KEY NOT NULL,
	id_produto NUMERIC(11) NOT NULL,
	quantidade NUMERIC(11) NOT NULL
);

ALTER TABLE produtos RENAME TO products;

ALTER TABLE pedidos RENAME TO orders;

ALTER TABLE orders RENAME id_pedido TO id_order; --Alteração não aplicada

ALTER TABLE orders RENAME id_produto TO sku_produto;

---20-10-2021
DESCRIBE produtos;

ALTER TABLE produtos
ADD COLUMN createdAt VARCHAR(100);

ALTER TABLE produtos
ADD COLUMN updateAt VARCHAR(100);

ALTER TABLE produtos
ADD COLUMN updateAt timestamp NOT NULL;
--ADD COLUMN updateAt DATETIME NOT NULL;

ALTER TABLE produtos
ADD COLUMN createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
--ADD COLUMN updateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE produtos
ADD COLUMN deleteAt DATETIME NOT NULL;

ALTER TABLE produtos DROP COLUMN createdAt, DROP COLUMN updateAt;

select * from produtos;

ALTER TABLE produtos RENAME COLUMN createdAt TO updateAt;

ALTER TABLE produtos RENAME COLUMN updateAt TO createdAt;