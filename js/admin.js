import { Pelicula } from "./peliClass.js";

var listaPelicula = [];
//modal Agregar
const modalPeli = new bootstrap.Modal(document.getElementById('modalProducto'));
let btnagregar = document.getElementById('btnAgregar');
btnagregar.addEventListener('click', function() {
    modalPeli.show();
})
//modal Edit
const modalPeliEdit = new bootstrap.Modal(document.getElementById('modaleditar'));

leerDatos();

window.agregarPelicula = function(event) {
    //agregar pelicula nueva al localstorage
    event.preventDefault();
    //traer los valores del formulario que ya estan validados

    let codigo = document.getElementById('codigo').value;
    let nombre = document.getElementById('nombre').value;
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let publicado = document.getElementById('flexCheckDefaultAgregar').checked;
    let imagen = document.getElementById('imagen').value;
    
    if( validarCodigo(document.getElementById('codigo')) && 
    validarNombre(document.getElementById('nombre')) &&
    validarNombre(document.getElementById('categoria'))&&
    validarNombre(document.getElementById('descripcion'))&&
    validarNombre(document.getElementById('imagen'))){
        let nuevaPelicula = new Pelicula(codigo, nombre, categoria, descripcion, publicado, imagen);    
        listaPelicula.push(nuevaPelicula);        
        localStorage.setItem("listaPeliculakey", JSON.stringify(listaPelicula));
        limpiarFormulario();
    }
};

function limpiarFormulario() {
    let formulario = document.getElementById('formModal');
    formulario.reset();
    Swal.fire(
            'nueva pelicula', 'La pelicula se agrego correctamente', "success"
        )
        //llamar a leerDatos
    leerDatos();
    modalPeli.hide();
}

function limpiarFormularioedit() {
    let formulario = document.getElementById('formModalEdit');
    formulario.reset();
    Swal.fire(
            'Editar pelicula', 'La pelicula se edito correctamente', "success"
        )
        //llamar a leerDatos
    leerDatos();
    modalPeliEdit.hide();
}

function leerDatos() {
    //leer Datos del localstorage
    if (localStorage.length > 0) {
        let _listaPelicula = JSON.parse(localStorage.getItem('listaPeliculakey'));
        if (Array.isArray(_listaPelicula)) {
            listaPelicula = _listaPelicula;
        }
        //dibujar los datos en la tabla
        dibujarTabla(listaPelicula);
    }
}

function dibujarTabla(_listaPelicula) {
    //traer el elemento padre de las filas
    let tablaPelis = document.getElementById('tablaPelis');
    //variable para trabajar codigo html
    let filaPelis = '';
    //limpiar los datos del tbody
    tablaPelis.innerHTML = '';
    //for (let i = 0; i < _listaPelicula.lenght; i++){}
    for (let i in _listaPelicula) {
        // crear la fila 
        filaPelis = `<tr class="text-white">
        <th scope="row">${_listaPelicula[i].codigo}</th>
        <td>${_listaPelicula[i].nombre}</td>
        <td>${_listaPelicula[i].categoria}</td>
        <td>${_listaPelicula[i].descripcion}</td>
        <td>${_listaPelicula[i].publicado?"Está publicado":"En espera"}</td>
        <td>${_listaPelicula[i].imagen.length<20 ?_listaPelicula[i].imagen: _listaPelicula[i].imagen.slice(0, 20) + "..." }</td>
        <td>
            <button class="btn btn-warning" onclick="abrirEditar(this)"  id='${i}'>Editar</button>
            <button class="btn btn-danger" onclick="eliminarPelicula(this)" id='${_listaPelicula[i].codigo}'>Borrar</button>
            <button class="btn btn-success" onclick="destacarPelicula(this)" id='${_listaPelicula[i].codigo}'>Destacar</button>
        </td>
    </tr>`;
        //agregar fila a su elemento padre
        tablaPelis.innerHTML += filaPelis;
    }
}

window.eliminarPelicula = function(boton){
    Swal.fire({
        title: '¿Esta seguro de eliminar la Pelicula?',
        text: "No puedes volver atras despues de este paso",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          let peliculasFiltradas = listaPelicula.filter(function(producto){
            return producto.codigo != boton.id
          })
          localStorage.setItem("listaPeliculakey", JSON.stringify(peliculasFiltradas));
          leerDatos();
            Swal.fire(
            'Eliminado!',
            'La pelicula fue eliminada!',
            'success'
          )
        }
      })
}
var tempposicion=0;
window.abrirEditar = function(boton){
    modalPeliEdit.show();
    tempposicion=boton.id;

    document.getElementById('codigo-edit').value = listaPelicula[tempposicion].codigo;
    document.getElementById('nombre-edit').value  = listaPelicula[tempposicion].nombre;
    document.getElementById('categoria-edit').value  = listaPelicula[tempposicion].categoria;
    document.getElementById('descripcion-edit').value = listaPelicula[tempposicion].descripcion;
    document.getElementById('flexCheckDefault').checked = listaPelicula[tempposicion].publicado;
    document.getElementById('imagen-edit').value = listaPelicula[tempposicion].imagen;
}

window.GuardarEdicion = function(event) {
//funcion para editar la pelicula
    event.preventDefault();
    //traer los valores del formulario que ya estan validados

    let codigo = document.getElementById('codigo-edit').value;
    let nombre = document.getElementById('nombre-edit').value;
    let categoria = document.getElementById('categoria-edit').value;
    let descripcion = document.getElementById('descripcion-edit').value;
    let publicado = document.getElementById('flexCheckDefault').checked;
    let imagen = document.getElementById('imagen-edit').value;


    if( validarCodigo(document.getElementById('codigo-edit')) && 
        validarNombre(document.getElementById('nombre-edit')) &&
        validarNombre(document.getElementById('categoria-edit'))&&
        validarNombre(document.getElementById('descripcion-edit'))&&
        validarNombre(document.getElementById('imagen-edit'))){
        let nuevaPelicula = new Pelicula(codigo, nombre, categoria, descripcion, publicado, imagen);
        listaPelicula[tempposicion]= nuevaPelicula;
        localStorage.setItem("listaPeliculakey", JSON.stringify(listaPelicula));
        limpiarFormularioedit();
    }
};

//funcion para destacar la pelicula
window.destacarPelicula = function (btn){
    let listMovie = JSON.parse(localStorage.getItem('listaPeliculakey'));
    if (listMovie === null) listMovie = listaPelicula;
    let movieFeatured = listMovie.find(e => e.codigo === btn.id);
    movieFeatured.destacado = true;
    for(let i in listMovie){
        if(movieFeatured != listMovie[i]) listMovie[i].destacado = false;
    }
    console.log(movieFeatured);
} 

//Validaciones formulario admin
window.validarCodigo = function(codigo){
    if(codigo.value.trim() != '' && !isNaN(codigo.value) ){
        codigo.className = 'form-control is-valid';
        return true
    }else{
        codigo.className = 'form-control is-invalid';
        return false
    }
}

window.validarNombre= function(nombre){
    if(nombre.value.trim() === ""){
        nombre.className = 'form-control is-invalid';
        return false
    }else{
        nombre.className = 'form-control is-valid';
        return true
    }
}