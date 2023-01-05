import {BrowserRouter,Routes,Route} from 'react-router-dom'

import AuthLayout from './layout/AuthLayout';

import Chat from './pages/Chat';
import Login from './pages/Login';

import {AuthProvider} from './context/AuthProvider';
import RutaProtegida from './layout/RutaProtegida';


function App() {

return (
  <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
          </Route>

          <Route path='/chat' element={<RutaProtegida/>}>
              <Route index element={<Chat/>}/>
          </Route>

        </Routes>
      </AuthProvider>
  </BrowserRouter>
)
}

export default App
