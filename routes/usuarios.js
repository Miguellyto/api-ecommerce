const express = require ('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

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

module.exports = router;
 