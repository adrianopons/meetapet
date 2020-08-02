module.exports = app => {
  const usuario = require("../controllers/usuario.controller.js");
  const pet     = require("../controllers/pet.controller.js");
  const listaPet= require("../controllers/listapet.controller.js")

  var router = require("express").Router();

  router.post("/cadastrarUsuario", usuario.criar);
  router.post("/verificarUsuario", usuario.verificarUsuario);

  router.post("/cadastrarPet", pet.criar);
  router.post("/consultarPet", pet.consultar);
  router.post("/editarPet", pet.editar);
  router.post("/removerPet", pet.apagar);
  router.post("/listarPet", listaPet.listarPetUsuario);

  app.use('/api/', router);
};