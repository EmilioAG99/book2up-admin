import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Papa from "papaparse";
import instance from '../api/bookApi'
import "./Modal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [array, setArray] = useState([]);
  const [file, setFile] = useState();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const reader = new FileReader();

    // Listener para cargar los datos
    reader.onload = (e) => {
      const csv = Papa.parse(e.target.result, { header: true });
      let parsedData = csv?.data;
      parsedData = parsedData.splice(1,parsedData.length);
      setArray(parsedData);
    };
    reader.readAsText(file);
    try{
        const response = await instance.post('/agregar-csv', array)
        alert(response.data)
    }
    catch(e){
        alert(e.message)
    }
    setFile()
    setLoading(false)
  };
  return (
    <div>
      <Button onClick={handleOpen}>Import csv</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecciona tu csv
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <div className="botones">
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />

            <button
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              {loading?"Cargando CSV...":"Cargar CSV"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
