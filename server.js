const fastify = require('fastify')({
    logger: true,
    bodyLimit: 10000 * 1048576
})
fastify.register(require('fastify-formbody'))

fastify.register(require('fastify-cors'), {
    origin: "*",
    methods: ["GET", "POST"]
})

const models = require('./models/models')

fastify.get('/requests', async (request, reply) => {
    const dbRequests = await models.Requests.find().sort([['createdAt', -1]])

    return dbRequests
})

fastify.post('/requests/create', {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                }
            },
            required: ['name', 'email']
        }
    }
}, async (request, reply) => {
    const dbRequest = new models.Requests({
        name: request.body.name,
        email: request.body.email
    })

    await dbRequest.save()

    return {
        status: 'success'
    }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({
            port: 3030,
            host: '0.0.0.0'
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()