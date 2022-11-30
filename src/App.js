import React, {useEffect} from "react";
import "./App.css";
import Login from "./Screens/Login";
import AddInventory from "./Screens/AddInventory";
import Inventory from "./Screens/Inventory";
import NotFound from "./Screens/NotFound";
import Navigation from "./Components/Navigation";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import instance from './api/bookApi'
import {setBooks} from './store/Slices/booksSlice'
import store from './store/store'
function App() {
  const { token } = useSelector((state) => state.auth);
  useEffect(()=>{
        const fetchData= async()=>{
          const books = await instance.get("/bookdata");
          store.dispatch(setBooks(books.data));
        }
      if(token){
        fetchData();
      }
  },[token])
  if (!token) {
    return (
      <div className="app">
        <div className="safe-area">
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="safe-area">
          <Navigation />
          <Routes>
            <Route path="/" element={<AddInventory />} />
            <Route exact path="/inventory" element={<Inventory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
