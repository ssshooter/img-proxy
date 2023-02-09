import Fastify from 'fastify'
import cors from '@fastify/cors'
import proxy from '@fastify/http-proxy'
const fastify = Fastify()

await fastify.register(cors, {
  // put your options here
  origin: 'https://anime-characters.vercel.app',
  methods: ['GET'],
})

// https://media.kitsu.io/characters/images/3/original.jpg
await fastify.register(proxy, {
  upstream: 'https://media.kitsu.io',
  prefix: '/api', // optional
  http2: false, // optional
})

fastify.register(async function (fastify) {
  fastify.get('/aaa', (req, reply) => {
    reply.send({ hello: 'world' })
  })
})

fastify.listen({ port: 3000 })
