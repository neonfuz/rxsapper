export default {
    schema: {
        title: 'counters schema',
        description: 'schema for a named counter',
        version: 0,
        type: 'object',
        properties: {
            order: {
                type: 'string',
                primary: true
            },
            name: {
                type: 'string'
            },
            count: {
                type: 'number'
            }
        }
    },
    migrationStrategies: {
    }
};
