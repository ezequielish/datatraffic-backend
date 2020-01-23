const statusData = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}

//Estructura de respuesta para cualquier cliente.
exports.success = function (req, res, data, status) {
    let statusCode = status;
    if (!status) {
        status = 200;
    }

    if (!data) {
        statusData = statusData[status];
    }

    res.status(statusCode).send({ 
        error: '',
        body: data
    });
}

exports.error = function (req, res, data, status, details) {
    console.error("[response error] " + details)
    res.status(status || 500).send({
        error: data,
        body: ""
    })
}