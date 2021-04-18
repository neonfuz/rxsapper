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
                type: 'string',
                default: ''
            },
            count: {
                type: 'number',
                default: 0
            }
        }
    },
    migrationStrategies: {
    }
};
