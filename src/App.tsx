
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Role from "./components/Role"
import { useState } from "react"
import Register from "./components/Register"

function App() {
  var tokenAuth:any = localStorage.getItem("token") || ""
  const [token, setToken] = useState(tokenAuth);
  return (
    <>
      <Routes>
        {
          !token ?
          <>
        <Route path="/auth" element={<Auth setToken={setToken}/>}/>
        <Route path="register" element={<Register/>} />
        <Route path="*" element={<Auth setToken={setToken}/>} />
        </>
        :
        <Route path="/role" element={<Role/>} />
 }     </Routes>
    </>
  )
}

export default App