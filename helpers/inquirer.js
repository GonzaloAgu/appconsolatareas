const inquirer = require('inquirer');
require('colors');

//  Lista de opciones presentada al usuario.
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea.`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas.`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas.`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea.`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir.`
            },
        ]
    }
];

//  Despliegue del menu
const inquirerMenu = async() => {

    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción.');
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}


//  Se pide input vacío al usuario para seguir con el programa.
const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'pause',
            message: 'Presione ENTER para continuar.'
        }
    ]
    
    console.log('\n\n');

    await inquirer.prompt(question);
}

//  Se pregunta al usuario de si está seguro de realizar una acción.

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

//  Cuando el usuario desee crear una tarea se ejecutará esta función.

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor.'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: tarea.completadoEn ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    confirmar,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist
}