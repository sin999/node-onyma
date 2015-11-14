/**
 * Created by 1 on 11.11.2015.
 */
//var amqp = require('amqp');
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://guest:guest@46.20.64.8:5672', function(err, conn) {
    if(!err){
        console.log( 'Connected!');

    }else{
        console.log( err);
    }


    //conn.createChannel(function(err, ch) {});
});
    //rabbitMqConnection = amqp.createConnection({ host: '46.20.64.8' });
    //rabbitMqConnection.on('ready', function(){
    //    console.log( 'Connected!');
    //
    //});
