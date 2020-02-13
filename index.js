const app = require('./config/custom-express')();
var porta = process.env.PORT || 8080;
app.listen(porta, () => {
    console.log("Servidor rodando na porta "+porta);
});
