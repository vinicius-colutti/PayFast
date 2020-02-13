const promise = require("promise");
function PagamentoDao(connection) {
    this._connection = connection;
}

PagamentoDao.prototype.salva = function(pagamento,callback) {
    let stmt = `INSERT INTO pagamentos (forma_de_pagamento, valor, moeda, descricao, status) values(?, ?, ?, ?, ?)`;
    let todo = [pagamento.forma_de_pagamento, pagamento.valor, pagamento.moeda, pagamento.descricao, pagamento.status];

        this._connection.query(stmt, todo,
            function(err, result) {
                let id = result.insertId;
                let resultado = {"id_payment": id, "status": "PENDING"};
                res.send(resultado);
        });
    
}

PagamentoDao.prototype.salvaComCartao = function(pagamento, res) {
   
    let stmt = `INSERT INTO pagamentos (forma_de_pagamento, valor, moeda, descricao, status, cartao) values(?, ?, ?, ?, ?, ?)`;
    let todo = [pagamento.forma_de_pagamento, pagamento.valor, pagamento.moeda, pagamento.descricao, pagamento.status, pagamento.cartao];

        this._connection.query(stmt, todo,
            function(err, result) {
                let id = result.insertId;
                let resultado = {"id_payment": id, "status": "Accept"};
                res.send(resultado);
        });
    
}

PagamentoDao.prototype.lista = function(res) {
    let stmt = `select * from pagamentos`;
    this._connection.query(stmt,
        function(err, result) {
            res.send(result);
    });
}

PagamentoDao.prototype.listaPorId = function (pagamento, res) {
    let stmt = `select * from pagamentos where id = ?`;
    let todo =[pagamento.id];
    let query = this._connection.query(stmt, todo,
        function(err, result){
            res.send(result);
        });
        
        console.log(query)    
}


PagamentoDao.prototype.atualizaStatus = function (pagamento, res) {

    let stmt = `UPDATE pagamentos set status = ? where id = ?`;
    let todo = [pagamento.status, pagamento.id];

    this._connection.query(`select * from pagamentos where id = ?`, [pagamento.id],
        function(err, result){
            if(result == ''){
                res.status(400).json("ERRO")
            }else{
                this._connection.query(stmt, todo,
                    function(err, result) {
                        let resultado = {"id_payment": pagamento.id, "status": pagamento.status};
                        res.send(resultado);
                });
            }
        }); 

        

        


    
}


module.exports = function(){
    return PagamentoDao;moeda, descricao, status
};
