window.addEventListener('load', ()=>{
    const userList = JSON.parse(localStorage.getItem('listaPeliculakey'));

    if(userList[i]._admin === true){
        document.getElementById('adminNav').className="nav-link text-nav-link pt-3 py-lg-0 pe-3"
    }
    else document.getElementById('adminNav').className="d-none"  
})
