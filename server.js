

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const config = require('./config.js');
const resourceManager = require('./resource_manager.js');

//-- Server Configuration & Exports --------------
const server = module.exports = express();
server.use(express.json());
server.get (`${config.URL_API_RESOURCE}/:id`, handleGet   );
server.post(   config.URL_API_RESOURCE      , handleCreate);


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

//-- Create Resource -----------------------------
async function handleCreate(request, response, next) {
    try {
        let result = await resourceManager.insert(request.body);
        response.status(201).json({
            [config.FIELD_ID]: result,
        });
    } catch(error){
        response.status(400).json({
            message: `Must submit ${config.FIELD_NAME} and ${config.FIELD_DATA}`,
            error: error.message,
        });
    } finally {
        next();
    }
}
