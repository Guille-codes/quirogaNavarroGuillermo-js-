let divPersonaje = document.getElementById("naruto")
//Petición con fetch
fetch("https://naruto-api.herokuapp.com/api/v1/characters")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    for(let personaje of data ){
        let nuevoPersonaje = document.createElement("div")
                nuevoPersonaje.innerHTML = `<div id="" class="card" style="width: 18rem;">
                <img class="card-img-top alturaCardFotos" src="${personaje.images}">
                <div class="card-body">
                    <h5 class="card-title">${personaje.name}</h5>
                    <p class="">${personaje.page}</p>
                </div>
            </div>`
                divPersonaje.appendChild(nuevoPersonaje)
}
})