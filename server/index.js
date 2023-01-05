import express from 'express';
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import {PORT} from './config.js'
import cors from 'cors';


const app=express();

const server=http.createServer(app);
const io=new SocketServer(server,{
    cors:{
        origin:'http://127.0.0.1:5174',
    }
})

app.use(cors());
app.use(morgan('dev'));

io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on('msg',(m)=> { //mensaje
        const nombre=m.email.split("@")[0];
        socket.broadcast.emit('msgE',{
            body:m.mensaje,
            from:nombre,
        });
    });
});

server.listen(PORT);
console.log(`Server start on Port ${PORT}`);
