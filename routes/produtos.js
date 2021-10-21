const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
//permite o upload de img
const multer = require ('multer');
const login = require('../middleware/login');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads/');
    },
    filename: function(req, file, callback) {
        /* callback(null, new Date().toISOString() + file.originalname); */ //coloca uma data ao subir um file. Essa linha está dando error foi substituida pela linha abaixo.
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        callback(null, data + file.originalname );
    }
});
//
const upload = multer ({ 
    storage: storage,
    limites: {
        fileSize:  1024 * 1024 * 5 //Limita a 5megas o tamanho de cada imagens.
    }
});

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
            imagem_produto: prod.imagem_produto,
            createdAt: prod.createdAt,
            updateAt: prod.updateAt
          /*             request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um produto',
                url: 'http://localhost:3000/produtos/' + resultado.id_produto
            } */
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
router.post('/', login, upload.single('produto_imagem'), (req, res, next) => {// req=Requisição, res=Respota conn=conexão
    console.log(req.file);

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error}) }
        conn.query(
            'INSERT INTO produtos (nome, preco, imagem_produto, createdAt) VALUES (?,?,?,?)',//imagem_produto: coluna para IMG 
            [req.body.nome, req.body.preco, req.file.path, req.body.createdAt], //como o req.file.path permite salvar a IMG no BD

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
        imagem_produto: req.file.path,
        //createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: req.body.createdAt
/*         request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos'
        } */
    }
}
return res.status(201).send(response);
//Fim melhoria                         
            }
        )
    });
});

// RETORNA OS DADOS DE UM PRODUTO PELO ID
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
        imagem_produto: resultado[0].imagem_produto,
        createdAt: resultado[0].createdAt,
        updateAt: resultado[0].updateAt

        /* createdAt: moment().format('YYYY-MM-DD HH:mm:ss') */
/*         request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos'
        } */
    }
}
return res.status(200).send(response);
//Fim melhoria                 
            }
        )
    });
});

// ALTERA UM PRODUTO
router.patch('/', login, (req, res, next) => {
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
    mensagem: 'Produto Atualizado com Sucesso!',
    produtoAtualizado: {
        ///id_produto: req.id_produto,////
        nome: req.body.nome,
        preco: req.body.preco,
        ///updateAt: req.body.createdAt /////

        /* updateAt: moment().format('YYYY-MM-DD HH:mm:ss'), */
/*         request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:3000/produtos' + resultado.id_produto
        } */
    }
}
return res.status(202).send(response);
//Fim melhoria  

            }
        )
    });
});

// DELETA UM PRODUTO
router.delete('/', login, (req, res, next) => {
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
    deletedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
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
 /*
//Inserindo varias imagens de um produto
    router.post('/:id_produto/imagem', (req, res, next) => {// req=Requisição, res=Respota conn=conexão
        console.log(req.file);
    
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({error: error}) }
            conn.query(
                'INSERT INTO imagens_produtos (id_produto, caminho) VALUES (?,?)',
                [req.params.id_produto, req.file.path], 
    
                //callBack da Query
                (error, resultado, field) => {
                    conn.release();//libera conexão, para a api não travar
                    if (error) { return res.status(500).send({error: error}) }
    // Melhorando o resultado da resposta
    const response = {
        mensagem: 'Imagem inserido com sucesso!',
        imagemCriada: {
            id_produto: req.params.id_produto,
            id_imagem: resultado.id_produto,
            imagens_produtos: req.file.path,
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
*/
module.exports = router;