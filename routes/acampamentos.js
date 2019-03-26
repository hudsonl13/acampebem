var express = require("express");
var middleware = require("../middleware");
var Acampamento = require("../models/acampamento");

var router = express.Router();

router.get("/" , function(req , res)
{
    Acampamento.find({} , function(err , acampamentos)
    {
        if (err)
            console.log(err);
        else
        {
            res.render("acampamentos/index" ,
            {
                acampamentos: acampamentos
            });
        }
    });
});

router.get("/novo" , middleware.checarLogin , function(req , res)
{
    res.render("acampamentos/novo");
});

router.post("/" , middleware.checarLogin , function(req , res)
{
    var nome = req.body.nome;
    var preco = req.body.preco;
    var imagem = req.body.imagem;
    var descricao = req.body.descricao;
    var autor =
    {
        id: req.user._id ,
        nomeDeUsuario: req.user.nomeDeUsuario
    };
    
    Acampamento.create(
    {
        nome: nome ,
        preco: preco ,
        imagem: imagem ,
        descricao: descricao ,
        autor: autor
    } , function(err , acampamento)
        {
            if (err)
            {
                console.log("Registro não concluído.");
                console.log(err);
            }
            else
                res.redirect("/acampamentos");
        }
    );
});

router.get("/:id" , function(req , res)
{
    Acampamento.findById(req.params.id).populate("comentarios").exec(function(err , acampamento)
    {
        if (err)
            console.log(err);
        else
        {
            res.render("acampamentos/exibir" ,
            {
                acampamento: acampamento
            });
        }
    });
});

router.get("/:id/editar" ,  middleware.checarAutoriaDoAcampamento , function(req , res)
{
    Acampamento.findById(req.params.id , function(err , acampamento)
    {
        if (err)
            res.redirect("back");
        else
            res.render("acampamentos/editar" , {acampamento: acampamento});
    });
});

router.put("/:id" , middleware.checarAutoriaDoAcampamento , function(req , res)
{
    Acampamento.findByIdAndUpdate(req.params.id , req.body.acampamento , function(err , acampamento)
    {
        if (err)
            res.redirect("/acampamentos");
        else
            res.redirect("/acampamentos/" + req.params.id);
    });
});

router.delete("/:id" , middleware.checarAutoriaDoAcampamento , function(req , res)
{
    Acampamento.findByIdAndRemove(req.params.id , function(err)
    {
        if (err)
            res.redirect("/acampamentos");
        else
            res.redirect("/acampamentos");
    });
});

module.exports = router;