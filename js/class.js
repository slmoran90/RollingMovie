export class Users{
    constructor(name, email, password){
        this._name = name;
        this._email = email;
        this._password = password;
        this._admin = false;
    }
}

export class Pelicula {
    constructor(codigo, nombre, categoria, descripcion, publicado, imagen) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.imagen = imagen;
    }
}