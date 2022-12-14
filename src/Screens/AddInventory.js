import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import instance from "../api/bookApi";
import Modal from "../Components/Modal";
import "./AddInventory.css";

const AddInventory = () => {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    sin: "",
    precio: "",
    SKU: "",
    img: "",
    disponible: "",
  });
  const [loading, setLoading] = useState(false);
  const { titulo, autor, sin, precio, SKU, img, disponible } = form;
  const inputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const submitForm = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/agregar", form);
      alert(response.data);
    } catch (e) {
      alert(e.message);
    }
    setForm({ titulo: "", autor: "", sin: "", precio: "", SKU: "", img: "" , disponible:""});
    setLoading(false);
  };
 
  return (
    <>
     
      <div className="inventory">
        <h2>Agrega un Libro</h2>
        <TextField
          label="Titulo"
          name="titulo"
          value={titulo}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="Autor"
          name="autor"
          value={autor}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="Sinopsis"
          value={sin}
          name="sin"
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="Precio"
          name="precio"
          value={precio}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="SKU"
          name="SKU"
          value={SKU}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="Stock"
          name="disponible"
          value={disponible}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <TextField
          label="Imagen"
          name="img"
          value={img}
          type="text"
          variant="standard"
          required
          className="fields"
          onChange={inputChange}
        />
        <button className="submit" onClick={() => submitForm()}>
          {loading ? "Agregando" : "Agregar Libro"}
        </button>
        <Modal />
      </div>
    </>
  );
};

export default AddInventory;
