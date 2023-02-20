const { ipcRenderer } = require('electron')

let bookg = [];

function renderBook(bookg) {

    if (trlist) {
        // trlist.innerHTML = '';
        if (bookg != '') {
            bookg.map(t => {

                trlist.innerHTML += ` 
          <tr>
            
            <td>${t.titulo}</td>
            <td>${t.autor}</td>
            <td>${t.cantidad}</td>
            <td>${t.categoria}</td>
            <td>${t.edicion}</td>
            <td>$:${t.precio}</td>
            
          </tr>
            `;
            })
        } else {
            trlist.innerHTML += `
            <tr>
           
            <td>El quijote</td>
            <td>Miguel de cervantes</td>
            <td>20</td>
            <td>novela</td>
            <td>1er</td>
            <td>$:500.99</td>
            </tr>
            `;

        }
    }

}

ipcRenderer.on('new-book-create', (e, args) => {
    const newBook = JSON.parse(args);
    bookg.push(newBook);
    renderBook(bookg)


});

ipcRenderer.send('get-book');
ipcRenderer.on('get-book', (e, args) => {
    const bookgr = JSON.parse(args);
    bookg = bookgr;
    renderBook(bookg);
});