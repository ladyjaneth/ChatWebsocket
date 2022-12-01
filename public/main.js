const socket= io();

socket.on('messages', data=>{
    console.log(data);
    if(data.length != 0){
        const html = data.map(msj=>{
            return `<div>
            <strong style='color: blue'>${msj.usuario}</strong>
            <strong style='color: Brown'<em>[${msj.date}]</em></strong>
            <strong><em>${msj.text}</em></strong>

            </div>`
        })
        .join(' ')
        document.getElementById('chat').innerHTML = html;
    }
});

function addMessage(){
    const message= {
        usuario:document.getElementById('usuario').value,
        text:document.getElementById('text').value,
        date:new Date().toLocaleString()
    }
    socket.emit('new-message', message)
    return
}