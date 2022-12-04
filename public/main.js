//CHAT
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

socket.on('productos', async data=>{
    const respuesta = await fetch('/productos'); //traer la vista que acabamos de pintar
    const tablaProductos = await respuesta.text();
    document.getElementById('table-products').innerHTML= tablaProductos; //id donde vamos a pintar la tabla
    console.log(tablaProductos);
});



//FUNCIÓN DEL FORMULARIO CHAT
function addMessage(){
    const message= {
        usuario:document.getElementById('usuario').value,
        text:document.getElementById('text').value,
        date:new Date().toLocaleString()
    }
    socket.emit('new-message', message)
    return
}

//FUNCIÓN DEL FORMULARIO USUARIO
function addProduct(event){ //eventos que ocurren sobre el formulario
    event.preventDefault();//no recargar la página 
    const formularioProducto = document.getElementById('form-product');//traer el form capturo la información del formulario
    const formProduct = new FormData(formularioProducto);
    const productoJson = Object.fromEntries(formProduct.entries()); //json
    
    socket.emit('new-producto', productoJson)//envio al servirod
    formularioProducto.reset();
    return
}
    
