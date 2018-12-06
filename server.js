

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const config = require('./config.js');
const resourceManager = require('./resource_manager.js');

//-- Server Configuration & Exports --------------
const server = module.exports = express();
server.use(express.json());
server.get(`${config.URL_API_RESOURCE}/:id`, handleGet)


//== Route Handlers ============================================================

//-- Get One Resource by ID ----------------------
async function handleGet(request, response, next) {
    const resourceId = request.params.id;
    const resource = await resourceManager.get(resourceId);
    //
    if(resource === undefined){
        response.status(404).json({
            message: 'Could not find specified resource',
        });
        next();
        return;
    }
    //
    response.status(200).json(resource);
}
