

var Chart = function(){
    this.clients = [];
}

Chart.prototype.connect = function(res){
    var self = this;
    self.clients.push(res);
    res.on("close", function() { self.disconnect(res); });
    console.log("Connected, %d", self.clients.length);
}

Chart.prototype.send = function(data){
    this.clients.forEach(function(client){ client.end(data); });
    console.log("Send All");
    this.clients.splice(0, this.clients.length);
}

Chart.prototype.disconnect = function(res){
    this.clients.splice(this.clients.indexOf(res), 1);
    console.log("Disconnect, %d", this.clients.length);
}

module.exports = Chart;