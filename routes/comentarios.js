var express = require("express");
var middleware = require("../middleware");
var Acampamento = require("../models/acampamento");
var Comentario = require("../models/comentario");

var router = express.Router(
{
    mergeParams: true
});

router.get("/novo" , middleware.checarLogin , function(req , res)
{
    Acampamento.findById(req.params.id , function(err , acampamento)
    {
        if (err)
            console.log(err);
        else
        {
            res.render("comentarios/novo" ,
            {
                acampamento: acampamento
            });
        }
    });
});

router.post("/" , middleware.checarLogin ,  function(req , res)
{
    Acampamento.findById(req.params.id , function(err , acampamento)
    {
        if (err)
        {
            console.log(err);
            res.redirect("/acampamentos");
        }
        else
        {
            Comentario.create(req.body.comentario , function(err , comentario)
            {
                if (err)
                {
                    req.flash("erro" , "Algo deu errado. Tente novamente.");
                    res.redirect("/acampamentos");
                }
                else
                {
                    comentario.autor.id = req.user._id;
                    comentario.autor.nomeDeUsuario = req.user.nomeDeUsuario;
                    comentario.save();
                    acampamento.comentarios.push(comentario);
                    acampamento.save();
                    req.flash("sucesso" , "Comentário adicionado com sucesso!");
                    res.redirect("/acampamentos/" + acampamento._id);
                }
            });        
        }
    });
});

router.get("/:id_do_comentario/editar" , middleware.checarAutoriaDoComentario , function(req , res)
{
    Comentario.findById(req.params.id_do_comentario , function(err , comentario)
    {
        if (err)
            res.redirect("back");
        else
            res.render("comentarios/editar" , {idAcampamento: req.params.id , comentario: comentario});
        
    });
});

router.put("/:id_do_comentario" , middleware.checarAutoriaDoComentario , function(req , res)
{
    Comentario.findByIdAndUpdate(req.params.id_do_comentario , req.body.comentario , function(err , comentario)
    {
        if (err)
            res.redirect("back");
        else
            res.redirect("/acampamentos/" + req.params.id);
    });
});

router.delete("/:id_do_comentario" , middleware.checarAutoriaDoComentario , function(req , res)
{
    Comentario.findByIdAndRemove(req.params.id_do_comentario , function(err)
    {
        if (err)
            res.redirect("back");
        else
        {
            req.flash("sucesso" , "Comentário removido deletado com sucesso!");
            res.redirect("/acampamentos/" + req.params.id);
        }
    });
});

module.exports = router;