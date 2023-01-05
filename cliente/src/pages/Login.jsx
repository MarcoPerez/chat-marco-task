import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email,setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({})


  const {setAuth}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();

    if([email,password].includes('')){
      setAlerta({
        msg:'Todos Los campos son obligatorios',
        error:true,
      })
      return
    }
   
    setAlerta({})
    setAuth({email,password});
    navigate('/chat');
  }

  const {msg}=alerta;

  return (
    <>
    <div className='md:w-2/3 lg:w-2/5'>
        <form 
         className="my-10 bg-white shadow rounded-lg p-10 container" 
         onSubmit={handleSubmit}
         >
        {msg && <Alerta alerta={alerta}/>}
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder='Email de Usuario'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder='Password de Usuario'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
            hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />

      </form>
      </div>
    </>

  )
}

export default Login;