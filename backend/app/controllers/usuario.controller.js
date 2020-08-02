const db = require("../models");
const Usuario = db.usuario;

exports.criar = (req, res) => {
  if (!req.body.nome) {//TODO fazer validação!
    res.status(400).send({ message: "Dados não preenchidos" });
    return;
  }

  const usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    senha: req.body.senha
  });

  usuario
    .save(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo deu errado cadastrando um usuário..."
      });
    });
};

exports.verificarUsuario = (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  Usuario.find({ email: email, senha: senha })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao verificar usuário."
      });
    });
};