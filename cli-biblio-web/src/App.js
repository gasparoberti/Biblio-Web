import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {
  const baseUrl="https://localhost:44368/api/libros";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [libroSeleccionado, setLibroSeleccionado]=useState({
    id:'',
    nombre:'',
    anio:'',
    autor:''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setLibroSeleccionado({
      ...libroSeleccionado,
      [name]: value
    });
    console.log(libroSeleccionado);
  }

  const cambiarEstadoModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const cambiarEstadoModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const cambiarEstadoModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peicionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete libroSeleccionado.id;
    libroSeleccionado.anio=parseInt(libroSeleccionado.anio);
    await axios.post(baseUrl, libroSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      cambiarEstadoModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    libroSeleccionado.anio=parseInt(libroSeleccionado.anio);
    await axios.put(baseUrl + "/" + libroSeleccionado.id, libroSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAux=data;
      dataAux.map(libro=>{
        if(libro.id===libroSeleccionado.id){
          libro.nombre=respuesta.nombre;
          libro.anio=respuesta.anio;
          libro.autor=respuesta.autor;
        }
      })
      cambiarEstadoModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  
  const peticionDelete=async()=>{
    await axios.delete(baseUrl + "/" + libroSeleccionado.id)
    .then(response=>{
      setData(data.filter(libro=>libro.id!==response.data));
      cambiarEstadoModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarLibro=(libro, caso)=>{
    setLibroSeleccionado(libro);

    (caso==="Editar") ?
    cambiarEstadoModalEditar() : cambiarEstadoModalEliminar();
  }

  useEffect(()=>{
    peicionGet();
  },[])

  return (
    <div className="container">
      <div className="App">
        <br/><br/>
        <button className="btn btn-success" onClick={()=>cambiarEstadoModalInsertar()}>Insertar Nuevo Libro</button>
        <br/><br/>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Año</th>
              <th>Autor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(libro=>(
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.nombre}</td>
                <td>{libro.anio}</td>
                <td>{libro.autor}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>seleccionarLibro(libro, "Editar")}>Editar</button> {""}
                  <button className="btn btn-danger" onClick={()=>seleccionarLibro(libro, "Eliminar")}>Eliminar</button> {""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>Nuevo Libro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange}></input>
              
              <label>Año: </label>
              <br />
              <input type="text" className="form-control" name="anio" onChange={handleChange}></input>
              
              <label>Autor: </label>
              <br />
              <input type="text" className="form-control" name="autor" onChange={handleChange}></input>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>cambiarEstadoModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Libro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID: </label>
              <br />
              <input type="text" readOnly className="form-control" onChange={handleChange} value={libroSeleccionado && libroSeleccionado.id}></input>
              
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange} value={libroSeleccionado && libroSeleccionado.nombre}></input>
              
              <label>Año: </label>
              <br />
              <input type="text" className="form-control" name="anio" onChange={handleChange} value={libroSeleccionado && libroSeleccionado.anio}></input>
              
              <label>Autor: </label>
              <br />
              <input type="text" className="form-control" name="autor" onChange={handleChange} value={libroSeleccionado && libroSeleccionado.autor}></input>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>
            <button className="btn btn-danger" onClick={()=>cambiarEstadoModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalHeader>Editar Libro</ModalHeader>
          <ModalBody>
            ¿Estas seguro que deseas eliminar el libro {libroSeleccionado && libroSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-primary" onClick={()=>cambiarEstadoModalEliminar()}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default App;