import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import instance from '../api/bookApi'
import store from '../store/store'
import { setToken } from '../store/Slices/authSlice'
import "./Login.css";
const Login = () => {
  const [form,setForm] = useState({user:'', password:''})
  const [loading, setLoading] = useState(false)
  const {user, password} = form
  const updateFields=(e)=>{
    const {name,value} = e.target
    setForm({...form,[name]:value})
  }
  const logIn=async()=>{
    setLoading(true)
    try{
      const response = await instance.post('/validarAdmin',form);
      store.dispatch(setToken(response.data))
    }
    catch(e){
      alert(e.message)
    }
    setLoading(false)
  }
  return (
    <div className="login-form">
      <h1> Bienvenido a Book2Up</h1>
      <TextField required variant="standard" value={user}
      name ="user" label="Usuario" className="fields" onChange={updateFields}/>
      <TextField
        label="Password"
        name="password"
        type="password"
        value= {password}
        autoComplete="current-password"
        variant="standard"
        required
        className="fields"
        onChange={updateFields}
      />
      <button className="login-btn" onClick={()=>logIn()}>{loading?'Iniciando...':'Inicia Sesion'}</button>
    </div>
  );
};
export default Login;
