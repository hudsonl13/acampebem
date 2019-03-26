var mongoose = require("mongoose");

var acampamentoSchema = new mongoose.Schema(
{
    nome: String ,
    preco: Number ,
    imagem: String ,
    descricao: String ,
    autor:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Usuario"
        } ,
        nomeDeUsuario: String
    } ,
    comentarios:
    [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Comentario"
        }
    ]
});
var Acampamento = mongoose.model("Acampamento" , acampamentoSchema);

module.exports = Acampamento;