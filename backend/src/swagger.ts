import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
      version: '',            // by default: '1.0.0'
      title: '',              // by default: 'REST API'
      description: ''         // by default: ''
    },
    servers: [
      {
        url: '',              // by default: 'http://localhost:3000'
        description: ''       // by default: ''
      },
      // { ... }
    ],
    tags: [                   // by default: empty Array
      {
        name: '',             // Tag name
        description: ''       // Tag description
      },
      // { ... }
    ],
    components: {}            // by default: empty object
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/api.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc)