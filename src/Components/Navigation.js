import React from "react";
import store from "../store/store";
import { removeToken } from "../store/Slices/authSlice";
import "./Navigation.css";
import { Link, useLocation} from 'react-router-dom';
const Navigation = () => {
    const { pathname } = useLocation();
  const logOut = () => {
    store.dispatch(removeToken());
  };
  return (
    <header className="navigation-area">
       
      <div className="links">  <Link to="/" className={pathname === '/' ? 'active' : ''}>Agregar Libro</Link></div>
      <div className="links"> <Link to="/inventory" className={pathname === '/' ? 'active' : ''}>Inventario</Link></div>
      <button onClick={() => logOut()} className="log-out">
        Cerrar sesion
      </button>
    </header>
  );
};
export default Navigation;
