
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

//  tareasDB almacenará la información de data.json en caso de existir.
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    //await pausa();

    do {
        opt = await inquirerMenu();
        
        switch(opt) {

            case '1':
                //Crear tarea
                const desc = await leerInput('Descripción: ');
                console.log(desc);
                tareas.crearTarea(desc);
            break;

            case '2':
                //Listar tareas
                tareas.listadoCompleto(tareas.listadoArr);
            break;

            case '3':
                //Listar tareas completadas
                tareas.listadoCompletadasOPendientes(tareas.listadoArr, true);
            break;

            case '4':
                //Listar tareas pendientes
                tareas.listadoCompletadasOPendientes(tareas.listadoArr, false);
            break;
            
            case '5':
                //Completar tareas
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if( id === '0' ) break;
                 
                const ok = await confirmar('¿Estás seguro que desea eliminar esta tarea?');
                if(ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea eliminada con éxito.'.green)
                }
            break;

        }

        guardarDB(tareas.listadoArr);

        if( opt !== '0' ) await pausa();
    } while( opt !== '0' );

}

main();