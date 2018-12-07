

//==============================================================================

//------------------------------------------------
const config = require('./config.js');

//------------------------------------------------
module.exports = {
    resources: [],
    async clear() {
        this.resources = [];
    },
    async get(resourceId) {
        let resource = this.resources[resourceId-1];
        return resource;
    },
    async insert(resourceOptions) {
        if(!resourceOptions.hasOwnProperty(config.FIELD_NAME)) {
            throw new Error('Malformed Resource: '+JSON.stringify(resourceOptions));
        }
        if(!resourceOptions.hasOwnProperty(config.FIELD_DATA)) {
            throw new Error('Malformed Resource');
        }
        this.resources.push({
            [config.FIELD_ID  ]: this.resources.length+1           ,
            [config.FIELD_NAME]: resourceOptions[config.FIELD_NAME],
            [config.FIELD_DATA]: resourceOptions[config.FIELD_DATA],
        });
        return this.resources.length;
    },
};
