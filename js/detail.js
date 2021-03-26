function cargarLocalStorage() {
    let peliculas = [{
            codigo: 4009,
            nombre: 'Un principe en Nueva York 2',
            descripcion: 'regreso del principe',
            categoria: 'comedia',
            publicado: true,
            duracion: '110 minutos',
            reparto: 'Eddie Murphy, Arsenio Hall,Jermaine Fowler',
            anio: '2021',
            imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg'
        },
        {
            codigo: 5000,
            nombre: 'Un principe en Nueva York 3',
            descripcion: 'regreso del principe',
            categoria: 'comedia',
            publicado: true,
            duracion: '110 minutos',
            reparto: 'Eddie Murphy, Arsenio Hall,Jermaine Fowler',
            anio: '2021',
            imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg'
        }
    ];

    localStorage.setItem('peliculas', JSON.stringify(peliculas));
}

function cargarPelicula() {

    const codigo = 5000; //viene del index.html
    let peliculas = JSON.parse(localStorage.getItem('peliculas'));
    console.log(peliculas);
    let peliculaAMostrar = null;

    //buscar la pelicula usando el codigo
    peliculas.forEach(pelicula => {
        if (pelicula.codigo === codigo) {
            peliculaAMostrar = pelicula;
        }
    });

    //obtener los datos del local storage
    /* let pelicula1 = {
        codigo: 4009,
        nombre: 'Un principe en Nueva York 2',
        descripcion: 'regreso del principe',
        categoria: 'comedia',
        publicado: true,
        duracion: '110 minutos',
        reparto: 'Eddie Murphy, Arsenio Hall,Jermaine Fowler',
        anio: '2021',
        imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg'
    }

    let pelicula2 = {
        codigo: 4009,
        nombre: 'Un principe en Nueva York 3',
        descripcion: 'regreso del principe',
        categoria: 'comedia',
        publicado: true,
        duracion: '110 minutos',
        reparto: 'Eddie Murphy, Arsenio Hall,Jermaine Fowler',
        anio: '2021',
        imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg'
    } */

    //llamar al metodo para mostrar la pelicula
    mostrarPelicula(peliculaAMostrar);
}

function mostrarPelicula(objPelicula) {
    //mostrar los datos
    let tituloPelicula = document.getElementById('tituloPelicula');
    tituloPelicula.innerHTML = objPelicula.nombre;

    let descripcionPelicula = document.getElementById('descripcionPelicula');
    descripcionPelicula.innerHTML = objPelicula.descripcion;

    let duracionPelicula = document.getElementById('duracionPelicula');
    duracionPelicula.innerHTML = objPelicula.duracion;

    let anioPelicula = document.getElementById('anioPelicula');
    anioPelicula.innerHTML = objPelicula.anio;
    let imagenPelicula = document.getElementById('imagenPelicula');
    imagenPelicula.style.backgroundImage = 'url(' + objPelicula.imagen + ')'
}

function reproducirPelicula() {

}
cargarLocalStorage();
cargarPelicula();