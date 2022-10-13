const DateTime = luxon.DateTime
const fechaAhora = DateTime.now()
console.log(fechaAhora)
console.log(fechaAhora.year)
console.log(fechaAhora.day)

let divFechaHoy = document.getElementById("fechaHoy")
let fecha = fechaAhora.toLocaleString(DateTime.DATE_FULL)
divFechaHoy.innerHTML = `${fecha}`

        let divProducto = document.getElementById("productos")
        function mostrarCatalogo(array){
            divProducto.innerHTML = ""
            array.forEach((prenda)=>{
                let nuevoProducto = document.createElement("div")
                nuevoProducto.innerHTML = `<div id="${prenda.id}" class="card " style="width: 18rem;">
                                                <img class="card-img-top" style="height: auto;" src="./assets/img/${prenda.imagen}" alt="${prenda.prenda}">
                                                <div class="card-body">
                                                    <h4 class="card-title">${prenda.prenda}</h4>
                                                    <p class="">Precio: $${prenda.precio}</p>
                                                    <p class="">Talle: ${prenda.talle}</p>
                                                    <button id="agregarBtn${prenda.id}" class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                                </div>
                                            </div>`

                divProducto.append(nuevoProducto)

                let btnAgregar = document.getElementById(`agregarBtn${prenda.id}`)
                console.log(btnAgregar)
                btnAgregar.addEventListener("click", ()=>{
                    console.log(prenda)
                    agregarAlCarrito(prenda)
                })
            })
        }
        function agregarAlCarrito(prenda){
            productosEnCarrito.push(prenda)
            console.log(productosEnCarrito)
            localStorage.setItem("shop", JSON.stringify(productosEnCarrito))
            Swal.fire({
                title: "Has agregado un producto",
                icon: "success",
                confirmButtonText : "Acepto",
                confirmButtonColor : "green",
                timer: 3000,
                text: `El artículo ${prenda.prenda} ha sido agregado.`,
                imageUrl: `assets/img/${prenda.imagen}`,
                imageHeight: 400,
                imageAlt: `${prenda.prenda} ${prenda.precio}` 
                
            })
        }

        function ocultarCatalogo(){
            divProducto.innerHTML = ""
            Toastify({
                text: "Catálogo Oculto",
                duration: 2000,
                gravity: "top",
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(90deg, rgba(145,177,20,1) 0%, rgba(145,167,1,1) 100%)",
                  color: "white"
                },
              }).showToast();
        }

        function nuevoProducto(array){
            let prendaIngresado = prompt("Ingrese la prenda")
            let precioIngresado = prompt("Ingrese el precio")
            let talleIngresado = parseInt(prompt("Ingrese el talle"))
            let prendaCreado = new Prenda(tienda.length+1, prendaIngresado , precioIngresado, talleIngresado)
            array.push(prendaCreado)
            
        }
        
        function guardarProducto(array){
            let prendaInput = document.getElementById("prendaInput")
            let precioInput = document.getElementById("precioInput")
            let talleInput = document.getElementById("talleInput")
            let prendaCreado = new Prenda(array.length+1, prendaInput.value, parseInt(precioInput.value), talleInput.value, "nuevoProducto.png")
            console.log(prendaCreado)
            array.push(prendaCreado)
            localStorage.setItem("tienda", JSON.stringify(array))
            console.log(array)
            prendaInput.value = ""
            precioInput.value = ""
            talleInput.value = ""
            Toastify({
                text: "El artículo ha sido agregado al stock.",
                duration: 3000,
                gravity: "bottom",
                position: "center", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(90deg, rgba(145,177,20,1) 0%, rgba(145,167,1,1) 100%)",
                  color: "white"
                },
              }).showToast();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Artículo guardado satisfactoriamente.',
                showConfirmButton: false,
                timer: 1500
              })
            mostrarCatalogo(array)
        }
    
        let btnGuardar = document.getElementById("guardarProductoBtn")
        btnGuardar.addEventListener("click", ()=>{
            guardarProducto(tienda)
        })
        let btnMostrarCatalogo = document.getElementById("verCatalogo")
        btnMostrarCatalogo.addEventListener("click", ()=>{
            let divLoader = document.getElementById("loader")
            divLoader.innerHTML =  `<div class=" mb-3">
                                        <button type="button" class="btn btn-success">Se estan cargando los productos.</button>
                                    </div>`
            setTimeout(()=>{
                divLoader.remove()
                mostrarCatalogo(tienda)
        
            },3000)
            
        })
        let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
        btnOcultarCatalogo.onclick = ocultarCatalogo


        let botonCarrito = document.getElementById("botonCarrito")
        let modalBody = document.getElementById("modal-body")
        let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
        let parrafoCompra = document.getElementById('precioTotal')

        botonCarrito.addEventListener("click", ()=>{
            cargarProductosCarrito(productosEnCarrito)
        })

        function cargarProductosCarrito(array){
            modalBody.innerHTML = ""
            array.forEach((productoCarrito)=>{
                modalBody.innerHTML += `              
                                        <div class="card text-bg mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="./assets/img/${productoCarrito.imagen}" class="img-fluid rounded-start" alt="${productoCarrito.prenda}">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${productoCarrito.prenda}</h5>
                                                        <p class="card-text">Precio: $${productoCarrito.precio}</p>
                                                        <p class="card-text">Talle: ${productoCarrito.talle}</p>
                                                        <button class= "btn btn-danger" id="botonEliminar"><i class="fa-sharp fa-solid fa-trash"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
            })
            compraTotal(array)
        }

        function compraTotal(array){
            let acumulador = 0

            acumulador = array.reduce((acumulador, productoCarrito)=>{
                return acumulador + productoCarrito.precio
            },0)
            acumulador == 0 ? parrafoCompra.innerHTML =    `<div class="card" style="width: 18rem;">
                                                                <ul class="list-group list-group-flush">
                                                                    <li class="list-group-item"><i class="fa-sharp fa-solid fa-shop-slash"></i> No hay productos en el carrito.</li>
                                                                </ul>
                                                            </div>` 
          : parrafoCompra.innerHTML =  `<div class="container d-flex justify-content-center">
                                                    <button type="button" class="btn btn-success">El total de su compra es: <strong>$${acumulador}</strong></button>
                                        </div>`
        }


        botonFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
            })
            productosEnCarrito =[]
            localStorage.removeItem("shop")

        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}

let prenda1JSON = JSON.stringify(prenda1)

localStorage.setItem("objetoPrenda", prenda1)
localStorage.setItem("objetoPrendaJSON", prenda1JSON )

let prendaStorage = localStorage.getItem("objetoPrenda")
console.log(prendaStorage)

let prendaStorageJSON = JSON.parse(localStorage.getItem("objetoPrendaJSON"))
console.log(prendaStorageJSON)