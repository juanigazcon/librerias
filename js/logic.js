
//ARRAY DE PRODUCTOS
const CATALOGO = [{
    id: 1,
    nombre: "Cheesecake tipo NY",
    precio: 4000,
    cantidad: 0
}, {
    id: 2,
    nombre: "Rogel",
    precio: 3500,
    cantidad: 0
},
{
    id: 3,
    nombre: "Marquisse",
    precio: 3800,
    cantidad: 0
},
{
    id: 4,
    nombre: "Torta de Nuez",
    precio: 3800,
    cantidad: 0
}, {
    id: 5,
    nombre: "Pavlova Clásica",
    precio: 3500,
    cantidad: 0
}, {
    id: 6,
    nombre: "Pavlova Silvestre",
    precio: 4200,
    cantidad: 0
}, {
    id: 7,
    nombre: "Pavlova de Nuez/Almendras",
    precio: 4000,
    cantidad: 0
}, {
    id: 8,
    nombre: "Key Lemon Pie",
    precio: 3800,
    cantidad: 0
}, {
    id: 9,
    nombre: "Tarta de Frutillas",
    precio: 3500,
    cantidad: 0
}, {
    id: 10,
    nombre: "Key Lime Pie",
    precio: 3900,
    cantidad: 0
}, {
    id: 11,
    nombre: "Sablée con Frutos Rojos",
    precio: 4000,
    cantidad: 0
},
{
    id: 12,
    nombre: "Lemon Pie",
    precio: 3500,
    cantidad: 0
}, {
    id: 13,
    nombre: "Sablée de Nuez/Almendras",
    precio: 4000,
    cantidad: 0
}, {
    id: 14,
    nombre: "Chocotorta",
    precio: 4000,
    cantidad: 0
}, {
    id: 15,
    nombre: "Torta Oreo",
    precio: 2800,
    cantidad: 0
}, {
    id: 16,
    nombre: "Havanet Negro",
    precio: 3200,
    cantidad: 0
},
{
    id: 17,
    nombre: "Havanet Blanco",
    precio: 3200,
    cantidad: 0
}, {
    id: 18,
    nombre: "Layer Cake",
    precio: 5500,
    cantidad: 0
},
{
    id: 19,
    nombre: "Cookie Cake",
    precio: 4500,
    cantidad: 0
}, {
    id: 20,
    nombre: "Macarons",
    precio: 1100,
    cantidad: 0
}, {
    id: 21,
    nombre: "Brownies",
    precio: 1200,
    cantidad: 0
}, {
    id: 22,
    nombre: "Alfajorcitos Clásicos",
    precio: 1200,
    cantidad: 0
}, {
    id: 23,
    nombre: "Alfajorcitos de Nuez/Almendras",
    precio: 1400,
    cantidad: 0
}, {
    id: 24,
    nombre: "Alfajores Blockazo",
    precio: 1000,
    cantidad: 0
}, {
    id: 25,
    nombre: "Coquitos",
    precio: 1000,
    cantidad: 0
}, {
    id: 26,
    nombre: "Alfajores de Maicena",
    precio: 1200,
    cantidad: 0
}
]

//CARRITO
let CARRITO = [];
let cantidadCarrito = 0;
let precioCarrito = 0;


const PRODUCTO = document.querySelectorAll("#hola button")
const contenedorCarrito = document.getElementById("carrito-contenedor");
const accionesCarrito = document.getElementById("acciones")
const opcionesDePago = document.getElementById("opciones-pago");
const newDiv = document.createElement("div");
//const side= document.getElementById("displayCarrito");

//side.addEventListener("click", actualizarCarrito());

let botonesDisponibles = false;
let compraConfirmada = false;

document.addEventListener("DOMContentLoaded", ()=> {
    
       let checkout = localStorage.getItem("compra");
        CARRITO = JSON.parse(localStorage.getItem("CARRITO")) || [];
        actualizarCarrito();
       CARRITO!=null && agregarBotones();
       CARRITO==null && vaciarCarrito();
        
        
    }
    )



//AGREGAR PRODUCTOS AL CARRITO
console.log(PRODUCTO)
PRODUCTO.forEach(btn => {
btn.addEventListener("click", () => {
    console.log(btn.dataset.id)
    let productoElegido = CATALOGO.find(item => item?.id === parseInt(btn.dataset.id));
    console.log(productoElegido);
    
    if (CARRITO.length == 0 && (!botonesDisponibles)) {
        agregarBotones();
    }
    
    agregarAlCarrito(parseInt(btn.dataset.id));
    
    CARRITO.length == 0 && removerBotones();
    
    console.log(CARRITO);

    Toastify({
                 text: 'Agregaste ' + productoElegido.nombre + ' al carrito',
                 duration: 2500,
                 gravity: "bottom",
                 position: "right",
                 style: {
                     
                     color: "#e1ceb2",
                     background: "#794245"
                 },
                 stopOnFocus: true,
                 //close: true,
            }).showToast();
});

});

//FUNCIONES

//AGREGAR BOTONES DE CONFIRMAR Y ANULAR COMPRA
function agregarBotones() {
botonesDisponibles = true;
const buttons = document.createElement("div", "lala");
buttons.innerHTML = `
<button onclick="vaciarCarrito()" class="boton" id="botonC">Anular compra</button>
<button onclick="confirmarCarrito()" class="boton" style:"none">Confirmar compra</button>
`
const botonC = document.getElementById("botonC")
accionesCarrito.appendChild(buttons);
}

//REMOVER BOTONES DE CONFIRMAR Y ANULAR COMPRA
function removerBotones() {
const eliminar = document.getElementsByClassName("lala");
eliminar.className = "d-none";
}

//CALCULAR CANTIDAD DE ITEMS EN CARRITO
function calcularCantidad() {

cantidadCarrito = CARRITO.reduce((acc, elemento) => acc + elemento.cantidad, 0);
console.log(cantidadCarrito)
let display = document.getElementById("display");
let quantity = document.getElementById("quantity");
console.log(display.innerText);
display.innerHTML = cantidadCarrito;
quantity.innerHTML = cantidadCarrito;
}

//CALCULAR PRECIO TOTAL DEL CARRITO
function calcularPrecio() {
precioCarrito = CARRITO.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);
console.log(precioCarrito)
let precioTotal = document.getElementById("total");
console.log(precioTotal.innerText);
precioTotal.innerHTML = precioCarrito;
}

//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(id) {

let productoElegido = CATALOGO.find(productoElegido => productoElegido.id === id);
let productoExistenteEnCarrito = CARRITO.some(producto => producto.id === id);

if (productoExistenteEnCarrito) {
    
    productoElegido.cantidad++;
    actualizarCarrito();
    console.log(CARRITO);
} else {
    productoElegido.cantidad = 1;
    
    CARRITO.push(productoElegido);
    actualizarCarrito();
    console.log(CARRITO);
}

}

//ACTUALIZAR INFORMACIÓN EXISTENTE EN EL CARRITO
function actualizarCarrito() {
contenedorCarrito.innerHTML = " ";
//side.innerHTML=" ";
CARRITO.forEach(item => {
    const div = document.createElement("div");
    div.className = "tabla"
    div.innerHTML = `
<tr>
<td>${item.nombre} </td>
<td>Cantidad: <span id=cantidad>${item.cantidad}</span></td>
<td>Precio: $${item.precio * item.cantidad}</td>
<td><button onclick = "disminuirCantidad(${item.id})" class="boton">-</button></td>
<td><button onclick = "aumentarCantidad(${item.id})" class="boton">+</button></td>
<td><button onclick = "eliminarProducto(${item.id})" class="boton">Eliminar</button></td>
</tr>
`
    contenedorCarrito.appendChild(div);
   // side.appendChild(div);

    localStorage.setItem("CARRITO", JSON.stringify(CARRITO));
})
calcularCantidad();
calcularPrecio();
}



//ELIMINAR PRODUCTO DEL CARRITO
function eliminarProducto(id) {
    //let productoAEliminar = CATALOGO.find(item => item.id === id);
    let productoEliminado = CARRITO.find(productoEliminado => productoEliminado.id === id)
    if(productoEliminado.cantidad > 0){
    swal.fire(
        {
        title: 'Estás a punto de eliminar del carrito todas las unidades de ' + productoEliminado.nombre + '.',
        text: 'No te lo recomiendo...',
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonColor: '#794245',
        confirmButtonText:'Eliminar',
        cancelButtonColor: '#794245',
        cancelButtonText:'Me arrepentí',
        background: "#E1CEB2",
        color: "#b49a7f",
    }).then( result => {
        if (result.isConfirmed) {
            Toastify({
                        text: 'El producto fue eliminado, vos te lo perdés!',
                        duration: 3000,
                        gravity: 'bottom',
                        position: 'right',
                        style:{background: "#794245"}
                     }).showToast();
//            let productoEliminado = CARRITO.find(productoEliminado => productoEliminado.id === id)
CARRITO.splice(CARRITO.indexOf(productoEliminado), 1);
                    
actualizarCarrito();
calcularCantidad();
calcularPrecio();
console.log(CARRITO);
                    
        }
    } )} 
    else{
    Toastify({
        text: 'No hay unidades para eliminar',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style:{background: "grey"}
     }).showToast();

} 
    
}

//AGREGAR UNA UNIDAD AL CARRITO
function aumentarCantidad(id) {
    let productoElegido = CATALOGO.find(productoElegido => productoElegido.id === id);

    Toastify({
        text: 'Buenísimo, una unidad más de ' + productoElegido.nombre,
        duration: 2500,
        gravity: "bottom",
        position: "right",
        style: {
            
            color: "#e1ceb2",
            background: "#794245"
        },
        stopOnFocus: true,
        //close: true,
   }).showToast();
let productoModificado = CARRITO.find(productoModificado => productoModificado.id === id);
productoModificado.cantidad++;
actualizarCarrito();
calcularPrecio();
console.log(CARRITO);

}

//DISMINUIR UNA UNIDAD DEL CARRITO
function disminuirCantidad(id) {
let productoModificado = CARRITO.find(productoModificado => productoModificado.id === id);
if (productoModificado.cantidad > 0) {
    productoModificado.cantidad--;
    Toastify({
        text: 'Oh, una unidad menos de ' + productoModificado.nombre,
        duration: 2500,
        gravity: "bottom",
        position: "right",
        style: {
            
            color: "#e1ceb2",
            background: "#794245"
        },
        stopOnFocus: true,
        //close: true,
   }).showToast();
    actualizarCarrito();
    calcularPrecio();
    console.log(CARRITO);
}

}

//CONFIRMAR COMPRA
function confirmarCarrito() {
newDiv.innerHTML = "";

if (CARRITO.length != 0) {
    compraConfirmada=true;
    localStorage.setItem("compra",true)
    newDiv.innerHTML =
        `
<table>
<tr>
<td><h3 class="fw-bold">Seleccione la forma de pago</h3></td>
</tr>
<tr>
<td><button onclick = "pagoEfectivo()" id="efectivo" class="boton my-3">Efectivo</button></td><td><h4 class="fw-bold px-2">10% de descuento</h4></td>
</tr>
<tr>
<td><button onclick = "pagoTransferencia()" id="transferencia" class="boton my-3">Transferencia</button></td><td><h4 class="fw-bold px-2">5% de descuento</h4></td>
</tr>
<tr>
<td><button onclick = "pagoMP()" id="mercado-pago" class="boton my-3">Mercado Pago</button></td>
</tr>
</table>
`
    opcionesDePago.appendChild(newDiv);
} else {
    newDiv.innerHTML = `<h3>El carrito está vacío</h3>`
    opcionesDePago.appendChild(newDiv);
    
    
}
}

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
function vaciarCarrito() {
    if(cantidadCarrito!=0){
    swal.fire({
        title: '¿Seguro querés vaciar el carrito?',
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonColor: '#794245',
        confirmButtonText:'Sí, vaciar carrito',
        cancelButtonColor: '#794245',
        cancelButtonText:'No, me arrepentí',
        background: "#E1CEB2",
        color: "#b49a7f"
    }).then( result => {
        if (result.isConfirmed) {
            Toastify({
                        text: 'Eliminaste todos los productos del carrito.',
                        duration: 3000,
                        gravity: 'center',
                        position: 'center',
                        style:{background: "#794245"}
                     }).showToast();
            CARRITO.splice(0, CARRITO.length);
console.log(CARRITO);
actualizarCarrito();
calcularPrecio();
actualizarCarrito();
removerBotones();
newDiv.innerHTML = "";
localStorage.setItem("CARRITO", JSON.stringify(CARRITO));
        } else {
            Toastify({
                text: 'Buena decisión',
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style:{background: "#794245"}
             }).showToast();

        }
    } ) 
    } else {
        newDiv.innerHTML = `<h3>El carrito está vacío</h3>`
        opcionesDePago.appendChild(newDiv);

}}

//CALCULAR PRECIO EFECTIVO
function pagoEfectivo() {

    swal.fire(
        {
        title: 'El precio total abonando en efectivo es $' + precioCarrito * 0.90 + '\n\n Por favor enviar mail con detalle de compra a totuspasteleria@gmail.com',
        showConfirmButton:true,
        confirmButtonColor: '#794245',
        confirmButtonText:'Ok',
        background: "#E1CEB2",
        color: "#b49a7f",
    })
//const ultimoPrecio = document.getElementById("precioFinal");
//ultimoPrecio.innerHTML = "El precio total abondando en efectivo es $" + precioCarrito * 0.90;
}

//CALCULAR PRECIO TRANSFERENCIA
function pagoTransferencia() {
    swal.fire(
        {
        title: 'El precio total abonando con transferencia es $' + precioCarrito * 0.90 + '\n\n Alias: TOTUSPASTELERIA \n\n Por favor enviar mail con comprobante de transferencia a totuspasteleria@gmail.com',
        showConfirmButton:true,
        confirmButtonColor: '#794245',
        confirmButtonText:'Ok',
        background: "#E1CEB2",
        color: "#b49a7f",
    })
//const ultimoPrecio = document.getElementById("precioFinal");
//ultimoPrecio.innerHTML = "El precio total abondando con transferencia es $" + precioCarrito * 0.95;
}

//CALCULAR PRECIO MERCADOPAGO
function pagoMP() {
   
    Toastify({
        text: 'El precio total abonando con MercadoPago es $' + precioCarrito + '. \n Hacé click para avanzar al pago.',
        destination: 'https://link.mercadopago.com.ar/totuspasteleria',
        duration: 10000,
        gravity: 'center',
        position: 'center',
        style: {
            
            color: "#e1ceb2",
            background: "#794245"
        },
        stopOnFocus: true,
        //close: true,
   }).showToast();
/* const ultimoPrecio = document.getElementById("precioFinal");
ultimoPrecio.innerHTML = "El precio total abondando con MercadoPago es $" + precioCarrito; */
}