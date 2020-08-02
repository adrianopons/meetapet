const db = require("../models");
const Pet = db.pet;

// Criando novo Usuario
exports.criar = (req, res) => {
  // Validate request
  if (!req.body.idusuario) {//TODO fazer validação!
    res.status(400).send({ message: "Dados não preenchidos" });
    return;
  }

  const pet = new Pet({
    idusuario: req.body.idusuario,
    nome: req.body.nome,
    raca: req.body.raca,
    idade: req.body.idade,
    peso: req.body.peso,
    cidade: req.body.cidade
    // foto: req.body.foto
  });

  pet
    .save(pet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao cadastrar Pet"
      });
    });
};

exports.consultar = (req, res) => {
  var condition = {"_id": req.body.id};

  Pet.find(condition)
    .then(async (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao consultar Pet"
      });
    });
};

exports.editar = (req, res) => {
  let id =  req.body.id;
  let dadosPetNovo = {
    "nome": req.body.nome,
    "raca": req.body.raca,
    "idade": req.body.idade,
    "peso": req.body.peso,
    "cidade": req.body.cidade
  }
  Pet.findByIdAndUpdate(id, dadosPetNovo, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possível atualizar o ID=${id}`
        });
      } else res.send({ message: "Atualizado com Sucesso" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o id=" + id
      });
    });
};

exports.apagar = (req, res) => {
  const id = req.body.id;

  Pet.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possível remover o Pet com id=${id}.`
        });
      } else {
        res.send({
          message: "Pet removido com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível remover o Pet id=" + id
      });
    });
}

