const express = require ('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {return res.status(500).send({error: error}) }

// Consulta se o usuário a ser cadastrado já exite
        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results) => {
            if (error) { return res.status(500).send({ error }) }
            if (results.length > 0) {
                res.status(409).send({ mensagem: 'Usuário já Cadastrado!' })
            } else {

// inseri novo usuário
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuarios (email, senha) VALUES (?,?)`, 
                    [req.body.email, hash],
                    (error, results) => {
                        conn.release();
                        response = {
                            mensagem: 'Usuário criado com sucesso',
                            usuarioCriado: {
                                id_usuario: results.insertId,
                                email: req.body.email
                            } 
                        }
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).send(response)
                    });
                });

            }
        });

    });
});


// RETORNA TODOS OS USERS
router.get('/cadastro', (req, res, next) => {// req=Requisição, res=Respota conn=conexão
    mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error: error}) }
    conn.query(
        'SELECT * FROM usuarios;',
        (error, resultado, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
// Melhorando o resultado da resposta
const response = {
    users: resultado.length,
    email: resultado.map(user => {
        return {
            id_user: user.insertId,
            user: user.nome,
            email: req.body.email,
            }
    })
}
return res.status(200).send({response});
//Fim melhoria

            }
        )
    });
});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status (500).send({ error: error }) }
            if (results.ength < 1) {
                return res.status(401).send({ mensagem: 'Falha na Autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na Autenticação' })
                }
                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
                    return res.status(200).send({ 
                        mensagem: 'Autenticado com Sucesso!', 
                        token: token
                    });
                }
                return res.status(401).send({ mensagem: 'Falha na Autenticação' })
            });
        });
    });
});

module.exports = router;