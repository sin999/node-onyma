/**
 * Created by 1 on 07.11.2015.
 */
window.onload = function(){
    var socketURL="ws://localhost:60082";
    var socket = new WebSocket(socketURL);
    var messageList=new MessageList('target',50);
    //По приходу сообщения с сервера
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        messageList.add(data.message,data.cssClass);
    };

    //Конструктор объекта MessageList
    function MessageList(targetContainerId,bufferSize) {
        this.messasgeCount=bufferSize;
        this.tagrgetContainerId=targetContainerId;
        var self=this;
        this.add = function (message, cssClass) {
            var conteiner = document.getElementById(self.tagrgetContainerId);
            //Добавить сообщение в начало списка
            conteiner.innerHTML = '<div class="' + cssClass + '">'
                + new Date()
                + message
                + ' div count -> ' + conteiner.childElementCount
                + '</div>'
                + conteiner.innerHTML;
            // Удалить старые сообщения
            while (conteiner.childElementCount > self.messasgeCount) {
                var elem = conteiner.children[conteiner.childElementCount - 1];
                elem.remove();
            }
        }
    }


}