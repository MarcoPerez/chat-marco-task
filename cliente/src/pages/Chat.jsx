import { useState,useEffect } from 'react';
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth'

const socket=io('http://localhost:4000');

const Chat = () => {

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const {auth}=useAuth();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('msg',{mensaje,email:auth.email}) //borrar email:auth.email
    const newMessage={
      body:mensaje,
      from:auth.email.split("@")[0]
    }
    setMensajes([...mensajes,newMessage])
    setMensaje('');
  };

  useEffect(() => {

    const msgResivido=(msg)=>{
       setMensajes([...mensajes,msg]);
    }

     socket.on('msgE',msgResivido)

    return()=>{
      socket.off('msgE',msgResivido)
    }

  }, [mensajes])
  


  return (
    <div className="h-screen text-white flex items-center justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="bg-zinc-900 p-10"
      >
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        
        {/*<button className='bg-blue-600' type='submit'>Enviar</button>*/}
        
        <ul className="h-80 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            
            <div className='my-2 table p-2 bg-sky-700 rounded-sm' key={index}>
              <p>{mensaje.from}:{mensaje.body}</p>
            </div>
         
          ))}
        </ul>
        <input
          name="message"
          type="text"
          placeholder="Escribe tu mensaje..."
          onChange={(e) => setMensaje(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={mensaje}
          autoFocus
        />
      </form>
    </div>
  )
}

export default Chat