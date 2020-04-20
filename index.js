const app = require('./config/custom-express')();
var cors = require('cors')
app.use(cors())

var porta = process.env.PORT || 8080;
app.listen(porta, () => {
    console.log("Servidor rodando na porta "+porta);
});
