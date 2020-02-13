module.exports = (app) =>{

  let validarCartao = require("validador-cartao-credito")

  app.get('/pagamentos/list', (req, res) => {
    let connection = new app.DAO.connection();
    let pagamentoDao = new app.DAO.PagamentoDao(connection);
    pagamentoDao.lista(res);
  });

  app.get('/pagamentos/list/:id', (req, res) => {
    let id = req.params.id; 
    let pagamento = {};  
    pagamento.id = id;
    let connection = new app.DAO.connection();
    let pagamentoDao = new app.DAO.PagamentoDao(connection);
    pagamentoDao.listaPorId(pagamento, res);
  });

  app.delete('/pagamentos/add/:id', (req, res) =>{

    let id = req.params.id; 
    console.log("Cancelando o pagamento");
    let pagamento = {};  
    pagamento.status = 'CANCEL';
    pagamento.id = id;
    let connection = new app.DAO.connection();
    let pagamentoDao = new app.DAO.PagamentoDao(connection);

    pagamentoDao.atualizaStatus(pagamento, res);

  });

  app.put('/pagamentos/add/:id', (req, res) =>{

    let id = req.params.id; 
    console.log("Confirmando o pagamento");
    let pagamento = {};  
    pagamento.status = 'CONFIRMED';
    pagamento.id = id;
    let connection = new app.DAO.connection();
    let pagamentoDao = new app.DAO.PagamentoDao(connection);

    pagamentoDao.atualizaStatus(pagamento, res)

  });

  app.post('/pagamentos/add', (req, res) => {
      console.log(req.body)
      let pagamento = req.body.pagamento; 
      pagamento.status = "PENDING";
      let connection = new app.DAO.connection();
      let pagamentoDao = new app.DAO.PagamentoDao(connection);
      if(validarCartao(pagamento.cartao)){
        if(pagamento.cartao){
          console.log("OK")
          pagamentoDao.salvaComCartao(pagamento, res)
        }else{
          console.log("OK")
          pagamentoDao.salva(pagamento, res)
        }
      }else{
        res.status(400).send('Invalid card');
      }

  });
}
