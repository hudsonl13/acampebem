var mongoose = require("mongoose");

var comentarioSchema = new mongoose.Schema(
{
    texto: String ,
    autor: 
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Usuario"
        } ,
        nomeDeUsuario: String
    }
});
var Comentario = mongoose.model("Comentario" , comentarioSchema);

module.exports = Comentario;