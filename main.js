const { BrowserWindow, Menu, app, ipcMain } = require('electron');
const url = require('url');
const path = require('path');


const book = require('./models/addbook')
const venta = require('./models/salebook')

require('electron-handlebars')({
    // Template bindings go here!
    title: 'Hello, World!',
    body: 'The quick brown fox jumps over the lazy dog.',
});

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', 'bin', 'electron')
    })
}


function createWindos() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        icon: __dirname + '/public/logo.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    const mainManu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainManu);

    win.on('close', () => {
        app.quit();
    });
}


function createNewWindows() {
    newWindows = new BrowserWindow({
        width: 550,
        height: 430,
        title: 'Agregar',
        icon: __dirname + '/public/logo.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    newWindows.setMenu(null);
    newWindows.loadURL(url.format({
        pathname: path.join(__dirname, 'views/addbook.html'),
        protocol: 'file',
        slashes: true
    }))

}

function saleWindow() {
    sale = new BrowserWindow({
        width: 550,
        height: 430,
        title: 'Ventas',
        icon: __dirname + '/public/logo.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    sale.setMenu(null);
    sale.loadURL(url.format({
        pathname: path.join(__dirname, 'views/sales.html'),
        protocol: 'file',
        slashes: true
    }))
}

function rswindow() {
    rsale = new BrowserWindow({
        width: 550,
        height: 430,
        title: 'Registro de ventas',
        icon: __dirname + '/public/logo.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true

        }

    });
    rsale.setMenu(null);
    rsale.loadURL(url.format({
        pathname: path.join(__dirname, 'views/registroventas.html'),
        protocol: 'file',
        slashes: true
    }))
}

ipcMain.on('new-book', async(e, args) => {
    const newBook = new book(args);
    const bookSave = await newBook.save();
    e.reply('new-book-create', JSON.stringify(bookSave));
});
ipcMain.on('get-book', async(e, args) => {
    const books = await book.find().lean();
    e.reply('get-book', JSON.stringify(books));
});
ipcMain.on('new-venta', async(e, args) => {
    const newVenta = new venta(args);
    const ventaSave = await newVenta.save();
    e.reply('create-new-venta', JSON.stringify(ventaSave));

});
ipcMain.on('get-venta', async(e, args) => {
    const ventas = await venta.find().lean();
    e.reply('get-venta', JSON.stringify(ventas));
})
const templateMenu = [{
    label: 'File',
    submenu: [{
            label: 'Agregar Libro',
            accelerator: 'Ctrl+N',
            click() {
                createNewWindows();

            }
        },
        {
            label: 'Ventas',
            accelerator: 'Ctrl+B',
            click() {
                saleWindow();
            }
        },
        {
            label: 'Registro de ventas',
            accelerator: 'Ctrl+V',
            click() {
                rswindow();
            }
        },

        {
            label: 'Exit',
            accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]
}];

// if you are in Mac, just add the Name of the App
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName(),
    });
};
templateMenu.push({
    label: 'Actualizar',
    submenu: [{
        role: 'reload'
    }]
})

// Developer Tools in Development Environment
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [{
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

module.exports = { createWindos, createNewWindows }