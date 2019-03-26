var Acampamento = require("../models/acampamento");
var Comentario = require("../models/comentario");

var object = {};

object.checarLogin = function(req , res , next)
{
    if (req.isAuthenticated())
        return next();
    req.flash("erro" , "Você precisa estar logado.");
    res.redirect("/logar");
}

object.checarAutoriaDoAcampamento = function(req , res , next)
{
    if (req.isAuthenticated())
    {
        Acampamento.findById(req.params.id , function(err , acampamento)
        {
            if (err)
            {
                req.flash("erro" , "Acampamento não encontrado.");
                res.redirect("back");
            }
            else
                if (acampamento.autor.id.equals(req.user._id)) 
                    next();
                else
                {
                    req.flash("erro" , "Você não tem permissão para fazer isso.");
                    res.redirect("back");
                }
        });
    }
    else
    {
        req.flash("erro" , "Você precisa estar logado.");
        res.redirect("back");
    }
};

object.checarAutoriaDoComentario = function(req , res , next)
{
    if (req.isAuthenticated())
    {
        Comentario.findById(req.params.id_do_comentario , function(err , comentario)
        {
            if (err)
            {
                req.flash("erro" , "Comentário não encontrado.");
                res.redirect("back");
            }
            else
                if (comentario.autor.id.equals(req.user._id)) 
                    next();
                else
                {
                    req.flash("erro" , "Você não tem permissão para fazer isso.");
                    res.redirect("back");
                }
        });
    }
    else
    {
        req.flash("erro" , "Você precisa estar logado.");
        res.redirect("back");
    }
};

module.exports = object;