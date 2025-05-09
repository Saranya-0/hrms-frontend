
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import Layout from './Components/layout/Layout'
import EmployeeManagement from './pages/employee/EmployeeManagement'
function App() {
  
  return (
    <>
     <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>

      <Route element={<Layout/>} >
    <Route path='/' element={<Dashboard/>}  />
    <Route  path='/employee' element={<EmployeeManagement/>}/>
    </Route>
     </Routes>
    </>
  )
}

export default App
