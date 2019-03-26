var mongoose = require("mongoose");
var Acampamento = require("./models/acampamento");
var Comentario = require("./models/comentario");

var dados = 
[
    {
        nome: "Pedra do Sino" ,
        imagem: "https://abrilviagemeturismo.files.wordpress.com/2016/10/camping-pedra-do-sino-ilhabela-sao-paulo-divu"
            + "lgacao.jpeg?quality=70&strip=info&w=928" ,
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"
            + "e et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al"
            + "iquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do"
            + "lore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici"
            + "a deserunt mollit anim id est laborum." ,
        comentarios: []
    } ,
    {
        nome: "Paraíso Tropical" ,
        imagem: "https://abrilviagemeturismo.files.wordpress.com/2016/10/acampamento-paraiso-tropical-praia-de-marisca"
            + "l-bombinhas-santa-catarina-divulgacao.jpeg?quality=70&strip=info&w=921" ,
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"
            + "e et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al"
            + "iquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do"
            + "lore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici"
            + "a deserunt mollit anim id est laborum." ,
        comentarios: []
    } ,
    {
        nome: "Chapéu de Sol" ,
        imagem: "https://abrilviagemeturismo.files.wordpress.com/2016/10/camping-chapeu-de-sol-itu-sao-paulo-divulgaca"
            + "o.jpeg?quality=70&strip=info&w=921" ,
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"
            + "e et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al"
            + "iquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do"
            + "lore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici"
            + "a deserunt mollit anim id est laborum." ,
        comentarios: []
    }
];

function seedDB()
{
    Acampamento.remove({} , function(err)
    {
        if (err)
            console.log(err);
    //     else
    //     {
    //         console.log("Acampamentos removidos do banco de dados.");
            
    //         dados.forEach(function(seed)
    //         {
    //             Acampamento.create(seed , function(err , seed)
    //             {
    //                 if (err)
    //                     console.log(err);
    //                 else
    //                 {
    //                     console.log("Acampamento adicionado");
    //                     Comentario.create(
    //                     {
    //                         texto: "Acampamento perfeito, mas poderia ter internet gratuita." ,
    //                         autor: "Homer Simpson"
    //                     } , function(err , comentario)
    //                         {
    //                             if (err)
    //                                 console.log(err);
    //                             else
    //                             {
    //                                 seed.comentarios.push(comentario);
    //                                 seed.save();
    //                                 console.log("Comentario adicionado");
    //                             }
    //                         });
    //                 }
    //             });
    //         });
    //     }
    });
}

module.exports = seedDB;