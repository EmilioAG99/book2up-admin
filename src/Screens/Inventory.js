import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Pagination from "../Components/Pagination";
import instance from '../api/bookApi'
import {setBooks} from '../store/Slices/booksSlice'
import store from '../store/store'
import "./Inventory.css";
const Inventory = () => {
  const books = useSelector((state) => state.books);
  const [updatedArray, setUpdatedArray] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexofFirstBook = indexOfLastBook - booksPerPage;
  const currentBook = books.slice(indexofFirstBook, indexOfLastBook);
  const handleInputChange=(e)=>{
    const { name, value} =e.target
    setUpdatedArray({...updatedArray, [name]:value!==""?value:" "})
  }
  const updateItem= async(SKU)=>{
    if(!updatedArray[SKU]){
        alert("No se ha realizado ningun cambio")
    }
    else{
        if(updatedArray[SKU]===" "){
            const addStatus = await instance.post('/update-book', {SKU,cantidad:1})
            const updateStock = await instance.get("/bookdata");
            store.dispatch(setBooks(updateStock.data));
            alert(addStatus.data)
        }
        else{
            const addStatus = await instance.post('/update-book', {SKU,cantidad:updatedArray[SKU]})
            const updateStock = await instance.get("/bookdata");
            store.dispatch(setBooks(updateStock.data));
            alert(addStatus.data)
        }
    }
  }
  const deleteElement=async(SKU)=>{
        try{
            const deleteResponse = await instance.post('/delete-book', {SKU})
            const updateStock = await instance.get("/bookdata");
            store.dispatch(setBooks(updateStock.data));
            alert(deleteResponse.data)
        }catch(e){
            alert(e)
        }
  }
  const paginate = (number) => {
    setCurrentPage(number);
  };
  return books.length > 0 ?(
    <div className="safe-area">
      <div className="table-area">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell align="right">Autor</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBook.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.titulo}
                  </TableCell>
                  <TableCell align="right">{row.autor}</TableCell>
                  <TableCell align="right"><input type="number" name={row.SKU} 
                  value={updatedArray[row.SKU]?updatedArray[row.SKU]:row.disponibles} 
                  min="0"
                  onChange ={handleInputChange} /></TableCell>
                  <TableCell align="right">
                    <div className="area-botones">
                      <button className="botones"
                      onClick={()=>updateItem(row.SKU)}
                      >
                        <ModeEditIcon />
                      </button>
                      <button className="botones"
                      onClick={()=>deleteElement(row.SKU)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        postPerPage={booksPerPage}
        totalPosts={books.length}
        paginate={paginate}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Inventory;
