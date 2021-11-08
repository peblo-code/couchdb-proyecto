const NodeCouchDb = require('node-couchdb');
const couchAuth = new NodeCouchDb({
    auth: {
        user: 'pablo',
        pass: 'admin'
    }
});

const dbName = "restaurant";

module.exports.Insertar = function (pizzaInsert, precioInsert) {
    couchAuth.insert(dbName, {
        pizza: pizzaInsert,
        precio: precioInsert
    }).then(({data, headers, status}) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EDOCCONFLICT if document with the same id already exists
    });    
}

module.exports.Actualizar = function(idUpdate, revUpdate, pizzaUpdate, precioUpdate) {
    console.log("HOLA");
    couchAuth.update(dbName, {
        _id: idUpdate,
        _rev: revUpdate,
        pizza: pizzaUpdate,
        precio: precioUpdate
    }).then(({data, headers, status}) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EFIELDMISSING if either _id or _rev fields are missing
    });
    
}

module.exports.Borrar = function(idDelete, revDelete) {
    couchAuth.del(dbName, idDelete, revDelete).then(({data, headers, status}) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EDOCMISSING if document does not exist
        // ...or err.code=EUNKNOWN if response status code is unexpected
    });
}