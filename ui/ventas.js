const { ipcRenderer } = require('electron')
const venta = document.querySelector('#venta')
let ventas = [];
let bookg = [];

function renderventa(ventas) {
    if (venta) {

        ventas.map(t => {

            venta.innerHTML += ` 
            <div class="card-header"> </div>
            <h5 class="card-title m-2">venta</h5>
            <p class="card-text">Libro: ${t.libro}</p>
            <p class="card-text">Cantidad: ${t.cantidad}</p>
            <p class="card-text">Precio: ${t.precio}</p>
            <p class="card-text">fecha de venta: ${t.date}</p>
            <div class="card-footer"></div>
        `;
        })

    }
}



ipcRenderer.on('create-new-venta', (e, args) => {
    const newVenta = JSON.parse(args);
    ventas.push(newVenta);
    renderventa(ventas);

});

ipcRenderer.send('get-venta');
ipcRenderer.on('get-venta', (e, args) => {
    const bookgr = JSON.parse(args);
    ventas = bookgr;
    renderventa(ventas);
});