const Tarea = require("./tarea");
const colors = require('colors');


class Tareas {

    _listado = {

    };

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

//  Crear una nueva tarea
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


//  Borrar tarea
    borrarTarea(id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }
    }

//  Desplegar tareas
    listadoCompleto(listaArray){

        let i = 0;
        console.log();
        listaArray.forEach(objeto => {
            
            i += 1;
            const { desc, completadoEn } = objeto;
            if(completadoEn === null){
                console.log(`${colors.green(i)}. ${desc} || ${'Pendiente'.red}`);
            }
            else{
                console.log(`${colors.green(i)}. ${desc} || ${'Completada'.green}`);
            }
            
        })
    }

//  Desplegar tareas completadas o pendientes
    listadoCompletadasOPendientes(listaArray, completadas = true){

        let i = 0;
        console.log();

        if(completadas){

            listaArray.forEach(objeto => {
            
                i += 1;
                const { desc, completadoEn } = objeto;
                if(objeto.completadoEn !== null) console.log(`${colors.green(i)}. ${desc} || ${completadoEn.green}`);
                
            })
        }
        else{

            listaArray.forEach(objeto => {
            
                i += 1;
                const { desc, completadoEn } = objeto;
                if(objeto.completadoEn === null) console.log(`${colors.green(i)}. ${desc} || ${'Pendiente'.red}`);
                
            })
        }

        
    }

//  Método para cargar tareas de data.json hacia this._listado.
    cargarTareasFromArray( tareasDB = [] ){
        tareasDB.forEach( elemento => {
            this._listado[elemento.id] = elemento;
        })
    }

    toggleCompletadas (ids = []) {
        ids.forEach( id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}

module.exports = Tareas;