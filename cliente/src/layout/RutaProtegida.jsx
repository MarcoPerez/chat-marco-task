
import {Outlet,Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {
    const {auth}=useAuth();
  return (
    <>
      {auth.email?
        (
            <div className='bg-gray-100'>
                   <Outlet />
            </div>
        ):  <Navigate to="/" />}

    </>
  )
}

export default RutaProtegida