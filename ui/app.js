const formr = document.getElementById('formr')
const titulo = document.getElementById('titulo')
const autor = document.getElementById('autor')
const cantidad = document.getElementById('cantidad')
const categoria = document.getElementById('categoria')
const edicion = document.getElementById('edicion')
const precio = document.getElementById('precio')
const trlist = document.querySelector('#trlist')

const { ipcRenderer } = require('electron')

let bookg = [];


if (formr) {
    formr.addEventListener('submit', e => {
        e.preventDefault();

        const book = {
            titulo: titulo.value,
            autor: autor.value,
            cantidad: cantidad.value,
            categoria: categoria.value,
            edicion: edicion.value,
            precio: precio.value
        }


        ipcRenderer.send('new-book', book);
        formr.reset();
        //window.close();

    });

}

ipcRenderer.on('new-book-create', (e, args) => {
    const newBook = JSON.parse(args);
    bookg.push(newBook);
    renderBook(bookg)
    window.close();

});
ipcRenderer.send('get-book');
ipcRenderer.on('get-book', (e, args) => {
    const bookgr = JSON.parse(args);
    bookg = bookgr;
    renderBook(bookg);
});