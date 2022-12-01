//const { Socket } = require('dgram');
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const Contenedor = require('./manejadorarchivos');
const contenedor = new Contenedor('productos.txt');
const mensajes = [];

const app=express();
const httpServer= HttpServer(app);
const io= new IOServer(httpServer);

//para poder utilizar los archivos de html en la carpeta public
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true})); //PERMITE PASAR DATOS PORLA URL, BODY

app.set('views', './views');
app.set('view engine', 'pug');

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
});

//generar laconexión por websocket -- servidor de websocketque tenemos en la variable io
 io.on('connection',socket=>{
    console.log('Un cliente se ha conectado'); 
    //cuando ya se ha conectado emitir los mensajes que hayan habido 
    socket.emit('messages',mensajes);
    socket.on('new-message', data=>{
        mensajes.push(data)
        io.sockets.emit('messages', mensajes)

    })
})

app.get('/', async(req, res)=>{
    const productos = await contenedor.getAll(); //trae todos los productos
    res.render('formulario', { productos }); //le paso la vista que quiero que muestre 
});

//GUARDAR PRODUCTOS
app.post('/productos',async (req, res)=>{
    const producto = await req.body; //recibo el producto
    contenedor.save(producto); 
    res.redirect('/');  //redireccionar a la ruta principal
});