const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {

    if(!fs.existsSync(archivo)) {
        return null;
    }

    // Sabiendo que el archivo data.json existe, lo leemos hacia una constante info.
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    // Con el metodo JSON.parse, convertimos a info (string -> objeto) y la retornamos con la constante data.
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}