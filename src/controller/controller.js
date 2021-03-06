const NodeCouchDb = require('node-couchdb');
const couchAuth = new NodeCouchDb({
    auth: {
        user: 'pablo',
        pass: 'admin'
    }
});

const dbName = "restaurant";

module.exports.Listar = function(res, pageRender, parameters={}, viewUrl) {
    couchAuth.get(dbName, viewUrl).then(({data, headers, status}) => {
        // data is json response
        if(pageRender) {
            res.render(pageRender, {pizzas: (data.rows), params: parameters })
        } 
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EDOCMISSING if document is missing
        // ...or err.code=EUNKNOWN if statusCode is unexpected
    });
}

module.exports.Insertar = function (pizzaInsert, ingredientesInsert, tamanioInsert, precioInsert) {
    couchAuth.insert(dbName, {
        pizza: pizzaInsert,
        caracteristicas: {
            ingredientes: ingredientesInsert,
            tamanio: tamanioInsert,
        },
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

module.exports.InsertarEmpleado = function (nombre_empleadoInsert, apellido_empleadoInsert, edad_empleadoInsert) {
    couchAuth.insert(dbName, {
        nombre_empleado: nombre_empleadoInsert,
        apellido_empleado: apellido_empleadoInsert,
        edad_empleado: edad_empleadoInsert
    }).then(({data, headers, status}) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
    }, err => {
        // either request error occured
        // ...or err.code=EDOCCONFLICT if document with the same id already exists
    });    
}

module.exports.Actualizar = function(idUpdate, revUpdate, pizzaUpdate, ingredientesUpdate, tamanioUpdate, precioUpdate) {
    console.log(idUpdate);
    couchAuth.update(dbName, {
        _id: idUpdate,
        _rev: revUpdate,
        pizza: pizzaUpdate,
        caracteristicas: {
            ingredientes: ingredientesUpdate,
            tamanio: tamanioUpdate,
        },
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

module.exports.ActualizarEmpleado = function(idUpdate, revUpdate, nombre_empleadoUpdate, apellido_empleadoUpdate, edad_empleadoUpdate) {
    console.log(idUpdate);
    couchAuth.update(dbName, {
        _id: idUpdate,
        _rev: revUpdate,
        nombre_empleado: nombre_empleadoUpdate,
        apellido_empleado: apellido_empleadoUpdate,
        edad_empleado: edad_empleadoUpdate
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