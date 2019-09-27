const users = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
    });
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
    });
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };

    respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) => {
    const responseJSON = {
        message: 'Name and age are both required',
    };

    if (!body.name || !body.age) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
        // if name or age is missing, sends a response indicating that to user
    }

    let responseCode = 201; // initial response code

    // checks if the name already exists
    if (users[body.name]) {
        // if it exists, 204 states it's updating it
        responseCode = 204;
    } else {
        // otherwise it creates an empty subobject of the "users" object
        users[body.name] = {};
    }

    // creates name and age fields
    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON); // returns newly created user
    }

    return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
    const responseJSON = {
        message: 'Error: Not Found',
    };
    return respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
};

const notFound = (request, response) => {
    const responseJSON = {
        id: '404',
        message: 'Error: The page you\'re looking for cannot be found',
    };

    return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
};

module.exports = {
    getUsers,
    getUsersMeta,
    addUser,
    notReal,
    notRealMeta,
    notFound,
    notFoundMeta,
};
