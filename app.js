var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Acampamento = require("./models/acampamento");
var Usuario = require("./models/usuario");
var Comentario = require("./models/comentario");
var indexRoute = require("./routes/index");
var acampamentoRoutes = require("./routes/acampamentos");
var comentarioRoutes = require("./routes/comentarios");
var seedDB = require ("./seeds");
var app = express();
var databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/green-camping-tent";

mongoose.connect(databaseUrl);

mongoose.Promise = Promise;

// seedDB();

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));

// Configuracao do Passport
app.use(require("express-session")(
{
    secret: process.env.PASSPORT_SECRET ,
    resave: false ,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
{
    usernameField: "nomeDeUsuario" ,
    passwordField: "senha"
} , Usuario.authenticate()));

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

app.use(function(req , res , next)
{
    res.locals.usuarioAtual = req.user;
    res.locals.sucesso = req.flash("sucesso");
    res.locals.erro = req.flash("erro");
    next();
});

app.use("/acampamentos" , acampamentoRoutes);
app.use("/acampamentos/:id/comentarios" , comentarioRoutes);
app.use(indexRoute);

app.listen(process.env.PORT , process.env.IP , function()
{
    console.log("Servidor inicializado");
});