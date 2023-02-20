const { ipcRenderer } = require('electron')
const form = document.querySelector('#form')
const libro = document.querySelector('#libro')
const cantidad = document.querySelector('#cantidad')
const precio = document.querySelector('#precio')

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const venta = {
            libro: libro.value,
            cantidad: cantidad.value,
            precio: precio.value
        }
        ipcRenderer.send('new-venta', venta)
        form.reset();


    });
}
ipcRenderer.on('create-new-venta', (e, args) => {
    console.log(args);
});
ipcRenderer.on('get-book', (e, args) => {
    const bookgr = JSON.parse(args);
    bookg = bookgr;
    renderBook(bookg);
});

/*function desconstar(bookg) {

    if (bookg.titulo === libro.value) {
        alert('coinciden');

    }
}

desconstar();*/