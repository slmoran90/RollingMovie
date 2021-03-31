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
            imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg',
            video: 'https://www.youtube.com/embed/AKpPeLAMY9I'
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
            imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg',
            video: 'https://www.youtube.com/embed/RIKOJP9PHP0'
        },
        {
            codigo: 6000,
            nombre: 'Nombre de la pelicula',
            descripcion: 'descripcion',
            categoria: 'comedia',
            publicado: true,
            duracion: '110 minutos',
            reparto: 'Eddie Murphy, Arsenio Hall,Jermaine Fowler',
            anio: '2021',
            imagen: 'https://cinergiaonline.com/wp-content/uploads/2018/09/universo-warren.jpeg',
            video: 'https://www.youtube.com/embed/5TqfpCsA5mk'
        }
    ];

    localStorage.setItem('peliculas', JSON.stringify(peliculas));
}

function cargarPelicula() {
    // control de validacion del codigo de la pelicula seleccionada
    const codigo = localStorage.getItem('peliculaSeleccionada');
    if (!codigo) {
        alert('Codigo de pelicula no encontrada');
        // se redirecciona a la pagina principal en caso que no exista el codigo
        window.location.href = '/pages/main.html';
        return;
    }
    let peliculas = JSON.parse(localStorage.getItem('listaPeliculakey'));
    console.log(peliculas);
    let peliculaAMostrar = null;

    //buscar la pelicula usando el codigo
    peliculas.forEach(pelicula => {
        if (pelicula.codigo === codigo) {
            peliculaAMostrar = pelicula;
        }
    });

    if (peliculaAMostrar === null) {
        alert('Pelicula no encontrada');
        window.location.href = '/pages/main.html';
        return;
    }

    //llamar al metodo para mostrar la pelicula
    mostrarPelicula(peliculaAMostrar);
}

function mostrarPelicula(objPelicula) {
    //mostrar los datos
    if (objPelicula.nombre) {
        let tituloPelicula = document.getElementById('tituloPelicula');
        tituloPelicula.innerHTML = objPelicula.nombre;
    }

    if (objPelicula.descripcion) {
        let descripcionPelicula = document.getElementById('descripcionPelicula');
        descripcionPelicula.innerHTML = objPelicula.descripcion;
    }

    if (objPelicula.duracion) {
        let duracionPelicula = document.getElementById('duracionPelicula');
        duracionPelicula.innerHTML = objPelicula.duracion;
    }
    if (objPelicula.anio) {
        let anioPelicula = document.getElementById('anioPelicula');
        anioPelicula.innerHTML = objPelicula.anio;
    }

    if (objPelicula.imagen) {
        let imagenPelicula = document.getElementById('imagenPelicula');
        //imagenPelicula.style.backgroundImage = 'url(' + objPelicula.imagen + ')';
        imagenPelicula.style.backgroundImage = 'url(img/main-page/categorias/' + objPelicula.categoria + '/' + objPelicula.imagen + ')'
    }

    let btnPlayVideo = document.getElementById('btnPlayVideo');
    if (objPelicula.video) {
        let videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = objPelicula.video;
        btnPlayVideo.classList.add('d-block');
    } else {
        btnPlayVideo.classList.add('d-none');
    }

}

function reproducirPelicula() {}

function detenerVideo() {
    console.log('cerrar video');
    let videoPlayer = document.getElementById('videoPlayer');
    console.log(videoPlayer.src);
    videoPlayer.src = videoPlayer.src
}

//cargarLocalStorage();

cargarPelicula();