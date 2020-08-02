module.exports = mongoose => {
  const ListaPet = mongoose.model(
    "listaPet",
    mongoose.Schema(
      {
        idusuario: String,
        nomeusuario: String,
        emailusuario: String,
        nome: String,
        raca: String,
        idade: Number,
        peso: String,
        cidade: String
        // foto: String
      },
      { timestamps: true }
    )
  );
  return ListaPet;
};