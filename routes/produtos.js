const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {// req=Requisição, res=Respota conn=conexão
mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error: error}) }
    conn.query(
        'SELECT * FROM produtos;',
        (error, resultado, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
// Melhorando o resultado da resposta
const response = {
    quantidade: resultado.length,
    produtos: resultado.map(prod => {
        return {
            id_produto: prod.id_produto,
            nome: prod.nome,
            preco: prod.preco,
            request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um produto',
                url: 'http://localhost:3000/produtos/' + resultado.id_produto
            }
        }
    })
}
return res.status(200).send({response});
//Fim melhoria

            }
        )
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error}) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],

            //callBack da Query
            (error, resultado, field) => {
                conn.release();//libera conexão, para a api não travar
                if (error) { return res.status(500).send({error: error}) }
// Melhorando o resultado da resposta
const response = {
    mensagem: 'produto inserido com sucesso!',
    produtoCriado: {
        id_produto: resultado.id_produto,
        nome: req.body.nome,
        preco: req.body.preco,
        request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos'
        }
    }
}
return res.status(201).send(response);
//Fim melhoria                         
            }
        )
    });
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error}) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
// Melhorando o resultado da resposta
if (resultado.length == 0){
    return res.status(404).send({
        mensagem: 'Não foi encotrado produto'
    })
}
const response = {
       produto: {
        id_produto: resultado[0].id_produto,
        nome: resultado[0].nome,
        preco: resultado[0].preco,
        request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos'
        }
    }
}
return res.status(200).send(response);
//Fim melhoria                 
            }
        )
    });
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE produtos SET nome =?, preco =? WHERE id_produto =?',
            [req.body.nome, req.body.preco, req.body.id_produto],

            //callBack da Query
            (error, resultado, field) => {
                conn.release();//libera conexão, para a api não travar
                if (error) { return res.status(500).send({error: error}) }

// Melhorando o resultado da resposta
const response = {
    mensagem: 'produto atualizado com sucesso!',
    produtoAtualizado: {
        id_produto: resultado.id_produto,
        nome: req.body.nome,
        preco: req.body.preco,
        request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos' + resultado.id_produto
        }
    }
}
return res.status(202).send(response);
//Fim melhoria  

            }
        )
    });
});

// DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error}) }
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],

            //callBack da Query
            (error, resultado, field) => {
                conn.release();//libera conexão, para a api não travar
                if (error) { return res.status(500).send({error: error}) }

const response = {
    mensagem: 'Produto removido com sucesso',
    request: {
        tipo: 'GET',
        descricao: 'inseri um produto',
        url: 'http://localhost:3000/produtos'
/*         body: {
            nome: 'String',
            preco: 'Number'
        } */
    }
}
                    return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;