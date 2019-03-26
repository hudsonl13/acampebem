var express = require("express");
var router = express.Router();
var passport = require("passport");
var Usuario = require("../models/usuario");

router.get("/" , function(req , res)
{
    res.render("landing");
});

router.get("/registrar" , function(req , res)
{
    res.render("registrar");
});

router.post("/registrar" , function(req , res)
{
    var usuario = new Usuario({nomeDeUsuario: req.body.nomeDeUsuario});
    
    Usuario.register(usuario , req.body.senha , function(err , usuario)
    {
        if (err)
        {
            req.flash("erro" , err.message);
            return res.redirect("/registrar");
        }
        passport.authenticate("local")(req , res , function()
        {
            req.flash("sucesso" , "Seja bem-vindo(a), " + usuario.nomeDeUsuario + "!");
            res.redirect("/acampamentos");    
        });
    });
});

router.get("/logar" , function(req , res)
{
    res.render("logar" , {mensagem: req.flash("erro")});
});

router.post("/logar" , passport.authenticate("local" , 
{
    successRedirect: "/acampamentos" ,
    failureRedirect: "/logar" ,
    failureFlash: true
}));

router.get("/deslogar" , function(req , res)
{
    req.logout();
    req.flash("sucesso" , "Você foi desconectado.");
    res.redirect("/acampamentos");
});

module.exports = router;