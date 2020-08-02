module.exports = mongoose => {
  const Pet = mongoose.model(
    "pet",
    mongoose.Schema(
      {
        idusuario: String,
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
  return Pet;
};