const express = require('express');
const router = express.Router();
const fun = require('../controller/controller.js')


// conexion a la base de datos

const NodeCouchDb = require('node-couchdb');
 
// node-couchdb instance with Memcached

 
// node-couchdb instance talking to external service
const couchExternal = new NodeCouchDb({
    host: 'couchdb.external.service',
    protocol: 'https',
    port: 5984
});
 
// not admin party
const couchAuth = new NodeCouchDb({
    auth: {
        user: 'pablo',
        pass: 'admin'
    }
});

const dbName = "restaurant";

//SEECCION DE LISTAR

router.get('/', (req, res) => {
    const viewUrl = "_design/all_pizzas/_view/all";
    fun.Listar(res, 'index', {}, viewUrl);
})

router.get('/empleado', (req, res) => {
    var viewUrl1 = "_design/all_pizzas/_view/empleados"
    fun.Listar(res, 'empleado', {} ,viewUrl1);
})

//SECCION DE INSERTAR

router.get('/insertar', (req, res) => {

    res.render('insertar', { title: 'Insertar nuevo registro'})
    
});

router.post('/insertar', (req, res) => {
    console.log(req.body)

    let newDocument = {
        pizza: req.body.pizza,
        ingredientes: req.body.ingredientes,
        tamanio: req.body.tamanio,
        precio: req.body.precio
    }

    var { pizza, ingredientes, tamanio, precio } = newDocument;

    fun.Insertar(pizza, ingredientes, tamanio, precio);
    res.redirect('/')
})

router.get('/insertarEmpleado', (req, res) => {

    res.render('./empleado/insertarEmpleado', { title: 'Insertar nuevo empleado'})
    
});

router.post('/insertarEmpleado', (req, res) => {
    console.log(req.body)

    let newDocument = {
        nombre_empleado: req.body.nombre_empleado,
        apellido_empleado: req.body.apellido_empleado,
        edad_empleado: req.body.edad_empleado
    }

    var { nombre_empleado, apellido_empleado, edad_empleado } = newDocument;

    fun.Insertar(nombre_empleado, apellido_empleado, edad_empleado);
    res.redirect('/empleado')
})

//SECCION DE ACTUALIZAR

router.get('/actualizar/:id/:rev', (req, res) => {
    idRes = req.params.id;
    revRes = req.params.rev;

    fun.Listar(res, 'actualizar', { title: 'Actualizar un registro', id: idRes, rev: revRes})
})

router.post('/actualizar/:id/:rev', (req, res) => {

    let updateDocument = {
        id: req.body.id,
        rev: req.body.rev,
        pizza: req.body.pizza,
        ingredientes: req.body.ingredientes,
        tamanio: req.body.tamanio,
        precio: req.body.precio
    }

    var { id, rev ,pizza, ingredientes, tamanio, precio } = updateDocument;

    fun.Actualizar(id, rev ,pizza, ingredientes, tamanio, precio)
    res.redirect('/')
})

router.get('/actualizarEmpleado/:id/:rev', (req, res) => {
    idRes = req.params.id;
    revRes = req.params.rev;

    fun.Listar(res, './empleado/empleado', { title: 'Actualizar un registro', id: idRes, rev: revRes})
})

router.post('/actualizarEmpleado/:id/:rev', (req, res) => {

    let updateDocument = {
        id: req.body.id,
        rev: req.body.rev,
        nombre_empleado: req.body.nombre_empleado,
        apellido_empleado: req.body.apellido_empleado,
        edad_empleado: req.body.edad_empleado
    }

    var { id, rev, nombre_empleado, apellido_empleado, edad_empleado } = updateDocument;

    fun.Actualizar(id, rev, nombre_empleado, apellido_empleado, edad_empleado)
    res.redirect('/empleado')
})

//SECCION BORRAR

router.get('/borrar/:id/:rev', (req, res) => {
    var idRes = req.params.id;
    var revRes = req.params.rev;

    fun.Borrar(idRes, revRes)
    res.render('borrar')
})

router.get('/borrarEmpleado/:id/:rev', (req, res) => {
    var idRes = req.params.id;
    var revRes = req.params.rev;

    fun.Borrar(idRes, revRes)
    res.render('borrar')
})

module.exports = router;