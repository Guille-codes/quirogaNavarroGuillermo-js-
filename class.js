class Prenda{
    constructor(id, prenda, precio, talle, imagen){
        this.id = id,
        this.prenda = prenda,
        this.precio = precio,
        this.talle = talle,
        this.imagen = imagen
    }
    mostrarData(){
        console.log(`[${this.id}] Productos \nPrenda: ${this.prenda} \nPrecio: ${this.precio} \nTalle: ${this.talle}\n ${this.imagen}`)
    }
}

let tienda = []
const cargarTienda = async () => {
    const response = await fetch ("tienda.json")
    const data = await response.json()
    console.log(data)
    for (let prenda of data){
        let prendaNueva = new  Prenda(prenda.id, prenda.prenda, prenda.precio, prenda.talle, prenda.imagen)
        tienda.push(prendaNueva)
    }
    localStorage.setItem("tienda", JSON.stringify(tienda))
}

let productosEnCarrito = JSON.parse(localStorage.getItem("shop")) || []

if(localStorage.getItem("tienda")){
    tienda = JSON.parse(localStorage.getItem("tienda"))
}
else{
    console.log("Seteado Array")
    cargarTienda()
}