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

router.get('/listar', (req, res) => {
    const viewUrl = "_design/all_pizzas/_view/all";
    
    couchAuth.get(dbName, viewUrl).then(({data, headers, status}) => {
        // data is json response
        res.render('listar', { title: 'Listado de Pizzas', pizzas: (data.rows) })
        console.log(data)
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EDOCMISSING if document is missing
        // ...or err.code=EUNKNOWN if statusCode is unexpected
    });
    
});

router.get('/', (req, res) => {
    res.render('index');
})


router.get('/insertar', (req, res) => {

    res.render('insertar', { title: 'Insertar nuevo registro'})
    
});

router.post('/insertar', (req, res) => {
    console.log(req.body)
    res.send('Insertado')

    let newDocument = {
        pizza: req.body.pizza,
        precio: req.body.precio
    }

    fun.Insertar(newDocument.pizza, newDocument.precio);
})

router.get('/actualizar', (req, res) => {
    res.render('actualizar', { title: 'Actualizar un registro'})
})

router.post('/actualizar', (req, res) => {
    res.send('Actualizado')

    let updateDocument = {
        id: req.body.id,
        rev: req.body.rev,
        pizza: req.body.pizza,
        precio: req.body.precio
    }

    fun.Actualizar(updateDocument.id, updateDocument.rev, updateDocument.pizza, updateDocument.precio)
})

router.get('/borrar', (req, res) => {
    res.render('borrar', {title: 'Borrar un registro'})
})

router.post('/borrar', (req, res) => {
    res.send('Borrado')

    let deleteDocument = {
        id: req.body.id,
        rev: req.body.rev,
    }

    fun.Borrar(deleteDocument.id, deleteDocument.rev)
})

module.exports = router;