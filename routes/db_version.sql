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

CREATE TABLE IF NOT EXISTS imagens_produtos
    id_imagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_produto INT,
    caminho VARCHAR(255),
    FOREING KEY (id_produto) REFERENCES produtos (id_produto)
);
