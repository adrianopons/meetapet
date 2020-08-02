module.exports = mongoose => {
  const Usuario = mongoose.model(
    "usuario",
    mongoose.Schema(
      {
        nome: String,
        email: String,
        endereco: String,
        cidade: String,
        senha: String
      },
      { timestamps: true }
    )
  );
  return Usuario;
};