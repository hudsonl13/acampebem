var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var usuarioSchema = new mongoose.Schema(
{
    nomeDeUsuario: String ,
    senha: String
});

usuarioSchema.plugin(passportLocalMongoose , 
{
    usernameField: "nomeDeUsuario" ,
    passwordField: "senha" ,
    errorMessages:
    {
        MissingPasswordError: "Campo \"senha\" inválido." ,
        IncorrectPasswordError: "Nome de usuário e/ou senha incorretos." ,
        IncorrectUserNameError: "Nome de usuário e/ou senha incorretos." ,
        MissingUserNameError: "Campo \"nome de usuário\" inválido." ,
        UserExistsError: "Já existe alguém utilizando este mesmo nome de usuário."
    }
});

var Usuario = mongoose.model("Usuario" , usuarioSchema);

module.exports = Usuario;