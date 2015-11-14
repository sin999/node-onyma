/**
 * Created by 1 on 07.11.2015.
 */
var http    = require('http');
var static = require('node-static');
var WebSocketServer = new require('ws');

// Веб сервер для статичесого содержимого
var file = new static.Server('./public');

//Таймер генерящий каждую секунду
var myTimer= new eventGentrator(500);

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(60081);

// Веб сокет сервер
var webSocketServer = new WebSocketServer.Server({
    port: 60082
});

webSocketServer.on('connection', function(ws) {
    //Регстрация в таймере для посылки пакета клиенту каждую секунду
    var subscriberId = myTimer.addSubscriber(function(message,cssClass){
        //Отправка сообщения клиенту
        ws.send(JSON.stringify({message: message,cssClass: cssClass}));
    });

    ws.on('close', function() {
        myTimer.removeSubscriber(subscriberId);
    });
});


    function eventGentrator(interval){
        this.interval=interval;
        this.subsribers = [];
        var self=this;
        this.counter= 0;
        this.addSubscriber = function(subscriber){
            this.subsribers.push(subscriber);
            var subscriberId=this.subsribers.length;
            return subscriberId;
        }

        this.removeSubscriber = function(subscriberId){
          self.subsribers=self.subsribers.splice(subscriberId,1);
        }

        this.func= function() {
            self.subsribers.forEach(function(subscriber){
                subscriber('Новое событие! '+self.counter,self.counter%2==0?'odd':'even');
            });
            self.counter++;
            setTimeout(self.func, self.interval);
        }
        this.func();
    }


