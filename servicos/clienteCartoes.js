let clients = require('restify-clients');

function CartoesClient(){
  this._cliente = clients.createJsonClient({
    url:'http://localhost:3000'
  });
}

CartoesClient.prototype.autoriza = function(cartao, callback){
  this._cliente.post('/cartoes/autoriza', cartao , callback);
}

module.exports = function(){
  return CartoesClient;
}
