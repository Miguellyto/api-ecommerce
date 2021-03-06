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
--Exclui colunas
ALTER TABLE cadastro DROP COLUMN created, DROP COLUMN modified;

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

--Alterar um campo existente para UNIQUE
ALTER TABLE cadastro ADD UNIQUE (email);
ALTER TABLE `cadastro` ADD UNIQUE(`email`); -- no phpMyadmin
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

---21/10/2021
ALTER TABLE produtos
ADD COLUMN createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE produtos
ADD COLUMN updateAt TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE produtos
ADD COLUMN deleteAt DATETIME NOT NULL;

ALTER TABLE produtos DROP COLUMN createdAt, DROP COLUMN updateAt;

select * from produtos;

ALTER TABLE produtos RENAME COLUMN createdAt TO updateAt;

ALTER TABLE produtos RENAME COLUMN updateAt TO createdAt;

---QUERY DO phpMyAdmin
ALTER TABLE `produtos` CHANGE `createdAt` `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `produtos` CHANGE `updateAt` `updateAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

---NO POSTGRES
--Listar os Bancos de Dados
SELECT datname FROM pg_database;

--Exibindo tabelas do Banco de Dados
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

--Selecionando Exibe os campos da tabela
 Select * from ILOG where 1 = 2;

--Selecionar apenas o primeiro registro da tabela
 Select * from ILOG LIMIT 1;

--Visualizando as colunas de uma tabela
SELECT column_name FROM information_schema.columns WHERE table_name = 'recurso';

--Ver detalhes das colunas de uma tabela
SELECT * FROM information_schema.columns WHERE table_name ='recurso';

/* select * from RECURSO
WHERE NOME LIKE 'FOGAO 4B. ESMALTEC BALI CRISTAL BR'
LIMIT 10 */

-------------Criando a coluna createdAt & updatedAt no Postgres---------------
ALTER TABLE products
ADD COLUMN createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE products ADD COLUMN updatedAt TIMESTAMP;

-------------Criando Gatilho para a coluna updatedAt no Postgres---------------

/* 
CREATE FUNCTION update_timestamp() RETURNS trigger AS $update_timestamp$
    BEGIN
        NEW.updatedAt := current_timestamp; ---//pode ser  NEW.updated
        RETURN NEW;
    END;
$update_timestamp$ LANGUAGE plpgsql;

----
CREATE TRIGGER update_timestamp BEFORE INSERT OR UPDATE ON products --//Inserir/Atualizar
--CREATE TRIGGER update_timestamp BEFORE UPDATE ON products --//Apenas quando Atualizar
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp(); 

 */

---DO INNOVARO--

---Query imagem 
Select iKey, iVersion, iFieldNames, iBeforeValues
From iLog
Where iType = -1898145931 /* Registro Removido */;

Select distinct p.PESSOA, p.NUMERO, p.EMISSAO, p.CHCRIACAO, p.YIDPEDIDO, e.CODIGO as CODIGORASTREIO, e.CHAVE as CHAVE_EVENTO
        From PEDIDO p
        join INTEGRACAO i on i.YIDPEDIDO = p.YIDPEDIDO
        left outer join EVENTO e on e.CRPEDIDO = p.CHCRIACAO and e.CLASSE = -1894804814 /* Código de Rastreamento */
        Where i.YAVISOFATURAMENTO is not null
            and p.OPERACAOCANCELADA is null
            and p.CHPEDBAIXA is not null
            and p.APROVACAO is not null
            and p.STATUSNFE = -1894641856 /* Enviada com Sucesso */
        " + whereExpress + "
---
        -- select
        --     YDATAINCLUSAO,
        --     MAX(YHORAINCLUSAO) as HORAINCLUSAO
        -- from
        --     INTEGRACAO
        -- where
        --     CLASSE = " + ECommerceConstantesCC.classes.INTEGRACAO_PEDIDO + "
        --     and YDATAINCLUSAO in (
        --         select
        --             MAX(YDATAINCLUSAO) as DATAINCLUSAO
        --         from
        --             INTEGRACAO
        --         where
        --             CLASSE = " + ECommerceConstantesCC.classes.INTEGRACAO_PEDIDO + "
        --     )
        -- group by YDATAINCLUSAO";

---
--TABELA INTEGRACAO
/* select
CHAVE,
VERSAOPEDIDO,
DATAGRAVACAOPEDIDO,
HORAGRAVACAOPEDIDO,
DADOSPEDIDO,
YAVISOFATURAMENTO,
YAVISOFATURAMENTOH,
YAVISOFATURAMENTOUSUARIO,
YDADOSPAGAMENTO,
YSITUACAOPAGAMENTO,
YDADOSPEDIDO,
YSTATUS,
YIDPEDIDO,
YEMAIL
from integracao LIMIT 2; */

--TABELA PEDIDO
/* select
CHAVE,
CHCRIACAO,
RECURSO,
PEDIDO,
UNITARIO,
QUANTIDADE,
EMISSAOPED,
EMISSAOPEDH,
DATAENTREGA,
EMISSAOUTC,
EMISSAOHUTC,
RASTREIO,
TIPOFRETE,
FRETE,
NUMEROPEDIDOCOMPRA,
ITEMPEDIDOCOMPRA,
YIDPEDIDO
from PEDIDO LIMIT 2; */

---Produto OK---
select 
    a.chave, 
    a.ean,
    '' as ncm,
    a.nome, 
    a.codigo,
    'quantidade' as quantidade,
    'preço especial' as preço_especial,
    b.fator as preço,
    a.descricaogenerica,
    a.marca, 
    'custo' as custo,
    a.prazogarantia,
    'observacao' as observacao,
    'link produto' as link_produto,
    'acessivel' as acessivel,
    a.classe,   
    'tempo manuseio' as tempo_manuseio,
    'tempo fabricacao' as tempo_fabricacao,
    a.comprimento as comprimento,
    a.largura as largura,
    a.altura as altura,
    a.pesbruunid as peso,
    'atributos' as atributos,
    'fotos' as fotos,
    'tabelas de preco' as tabela_preco,
    'deposito' as deposito,
    'variacoes' as variacoes
    from RECURSO a 
    join fator b
    on a.chave = b.recursoorig
    and b.tabfator = 462894
    and b.fim is null
where codigo = '1056'