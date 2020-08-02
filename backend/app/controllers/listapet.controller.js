const db = require("../models");
const Pet = db.pet;
const Usuario = db.usuario;

exports.listarPetUsuario = (req, res) => {
  var condition = { };

  if (req.body.idusuario) {
    condition.idusuario = req.body.idusuario
  }
  if (req.body.cidadesConsulta) {
    condition.cidade = req.body.cidadesConsulta
  }
  

  Pet.find(condition)
    .then(async (data) => {
      const listaPets = data;
      let objPetsRetorno = {};
      let listaPetsRetorno = [];

      for (let index = 0; index < listaPets.length; index++) {
        const pet = listaPets[index];
        await Usuario.find({ _id: pet.idusuario })
          .then((usuData) => {
            objPetsRetorno.idlista = pet._id
            objPetsRetorno.linkEditar = `/home/editarPet?id=${pet._id}`
            objPetsRetorno.idusuario = pet.idusuario
            objPetsRetorno.nomeusuario = usuData[0].nome
            objPetsRetorno.emailusuario = usuData[0].email
            objPetsRetorno.nomepet = pet.nome
            objPetsRetorno.racapet = pet.raca
            objPetsRetorno.idadepet = pet.idade
            objPetsRetorno.pesopet = pet.peso
            objPetsRetorno.cidadepet = pet.cidade

            listaPetsRetorno.push(objPetsRetorno)
            objPetsRetorno = {};
          })
      }
      res.send(listaPetsRetorno);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao retornar lista de Pets."
      });
    });
};
