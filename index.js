const { createWindos, mainMenu } = require("./main")
const { app } = require('electron')

require('./database')

app.whenReady().then(createWindos)
app.allowRendererProcessReuse = true;