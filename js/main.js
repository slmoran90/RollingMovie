const movieList = JSON.parse(localStorage.getItem('listaPeliculakey'));
console.log(movieList);

const showMovieFeatured = () =>{
    const sectMovieFeatured = document.getElementById('section-featured');
    let movieFeatured = movieList.find(e => e.destacado === true);

    console.log(movieFeatured.imagen);

    if(movieFeatured.imagen === null){
        sectMovieFeatured.innerHTML = `
        <div class="col-12">
            <img src="" alt="Película destacada" class="img-fluid">
        </div>
    `
    }
    
    sectMovieFeatured.innerHTML = `
        <div class="col-12">
            <img src="../img/main-page/banners/${movieFeatured.imagen}" alt="Película destacada" class="img-fluid">
        </div>
        <div class="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center text-light text-center p-3" id="banner-info">
            <h1>${movieFeatured.nombre}</h1>
            <p class="fw-light">${movieFeatured.descripcion}</p>
            <button type="button" class="btn bg-link p-2 mt-2">
                <a href="#" class="text-decoration-none text-light">Reproducir</a>
            </button>
        </div>
    `
}

const drawMovies = () =>{
    const divImg = document.getElementById('divImg');
    let movies = movieList.find(e => e.publicado === true);

    for(let i in movies){
        divImg.innerHTML += `<img src="../img/main-page/movies/${movies[i].imagen}" alt="Rolling Movie" class="d-block m-2 img-fluid w-50">`
    }    
}

const showSlider = () =>{
    let sliderInner = document.getElementById('sliderInner');
    
    sliderInner.innerHTML = '';
    for(let i in movieList){
        let column = '';
        column = `
            <div class="carousel-item ${i==0 ? 'active' : ''}">
                <div class="card mb-3">
                    <div class="row gx-0">
                        <div class="col-md-8>
                            <img src="..img/main-page/movies/${movieList[i].imagen}" class="container-fluid" alt="Rolling Movie">
                        </div>
                        <div class="col-md-4 align-self-center">
                            <div class="card-body">
                                <h5 class="card-title text-light text-center"> ${movieList[i].nombre}</h5>
                                <p class="card-text text-light fw-light">${movieList[i].descripcion}</p>
                                <div class="d-flex"
                                    <a href="details.html" class="text-light" id="${movieList[i].codigo}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

showMovieFeatured();
showSlider();