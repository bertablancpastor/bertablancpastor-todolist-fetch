import React, { useState, useEffect } from "react";

//create your first component
const Form = () => {

    const [tarea, setTarea] = useState("")
    const [tareas, setTareas] = useState([])

    const handleTarea = (e) => {
        e.preventDefault()
        setTarea(e.target.value)
    }

    //Función añadir tarea con el evento onClick
    const pushTarea = () => {
        //Spread operator
        if (tarea != "") {
            setTareas([...tareas, { label: tarea, done: false }])
            setTarea("")
        } else {
            alert("Debe rellenar la tarea")
        }
    }

    //Funcion añadir tarea con el evento onKeyPress
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            pushTarea();            
        }
    };

    const borrarTarea = (tarea) => {
        const newArr = tareas.filter((item) => item.label != tarea)
        setTareas(newArr)
    }

    //Tarea completada
    const completarTarea = (tarea) => {
        const newArr = tareas.map((item) => {
            if (item.label === tarea) {
                return { ...item, done: !item.done }
            } else {
                return item
            }
        })

        setTareas(newArr)
    }


    //Crear usuario en API
    function createdUser() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/bertablancpastor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([]), // body data type must match "Content-Type" header
        })//busca informacion a la url dada con el metodo especificado
            .then((response) => response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
            .then((data) => console.log(data))// => guardo el json en un espacio de memoria
            .catch((error) => console.log(error))// => te aviso si algo sale mal
    }

    //Update the entire list of todo's of a particular user
    function actualizarTarea() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/bertablancpastor', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tareas), // body data type must match "Content-Type" header
        })//busca informacion a la url dada con el metodo especificado
            .then((response) => response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
            .then((data) => console.log(data))// => guardo el json en un espacio de memoria
            .catch((error) => console.log(error))// => te aviso si algo sale mal
    }

    //List de tareas
    function traerListTarea() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/bertablancpastor', {
            method: 'GET',
        })//busca informacion a la url dada con el metodo especificado
            .then((response) => { 
                if (response.status === 404) {
                    createdUser()                 
                }; // el código de estado = 200 o código = 400 etc. 
                return response.json()})
            .then((data) => setTareas(data))// => guardo el json en un espacio de memoria
            .catch((error) => console.log(error))// => te aviso si algo sale mal
    }


    //Delete a user and all of their todo's
    function deleteUser() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/bertablancpastor', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })//busca informacion a la url dada con el metodo especificado
            .then((response) => response.json())
            .then((data) => console.log(data))// => guardo el json en un espacio de memoria
            .catch((error) => console.log(error))// => te aviso si algo sale mal
    }

    useEffect(()=>{
        traerListTarea()
        
    },[])

    useEffect(()=>{//2. Cuando quiero ejecutar una funcion si cambia un estado, es decir utlizamos el array como un observador
        //bloque de codigo que quiero que se ejecute cuando cambia lo que estoy vigilando
        if (tareas.length != 0) {
            actualizarTarea()                      
        }
        
        
    },[tareas])

    
    return (
        <div className="container mt-5 ">
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 text-center">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">TO DO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* <a className="nav-link active" aria-current="page" href="#"  onClick={createdUser}>Crear usuario</a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <div className="d-flex  text-center">
                <p className="fs-2 text-center display-2">TO DO</p>
                <button className="btn btn-success" onClick={createdData}>Crear usuario</button>
            </div> */}
            <form>
            
                <div className="mb-3">
                    <input type="text" onChange={handleTarea} onKeyPress={handleKeyPress}  className="form-control" id="form2" placeholder="Write a todo" value={tarea} />
                </div>
            </form>
            <button type="button" onClick={pushTarea} className="btn btn-info ms-2t">Add</button>

            <ul className="list-group mt-4">{tareas.map((item, index) =>
                 <li key={index} className={`d-flex justify-content-between align-items-center list-group-item ${item.done ? "text-decoration-line-through" : ""}`}>{item.label}                    
                    <span onClick={() => completarTarea(item.label)}>
                        <i className="fa-solid fa-square-check"></i>
                    </span>
                    <span className="delete-icon" onClick={() => borrarTarea(item.label)}
                    ><i className="fa-solid fa-trash"></i>
                    </span>
                </li>)}
            </ul>
            <div className="mt-3">
                <footer className=" badge rounded-pill text-bg-warning">{tareas.length > 0 ? tareas.length + " items left" : ""}</footer>
            </div>
            <div>
                <button className="btn btn-danger mt-3" onClick={deleteUser}>Eliminar Cuenta</button>
            </div>
        </div>
    );
};

export default Form