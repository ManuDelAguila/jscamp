// node --watch server.js --> lanza el servidor y cada vez que detecta un cambio se acutaliza solo

import { createServer } from "node:http"
import { json } from "node:stream/consumers"
import { randomUUID } from 'node:crypto'

process.loadEnvFile()
const port = process.env.PORT || 3000

function sendJson (res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}
const users = [
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  },
  {
    "id": "c2c5b26c-0b51-4d0d-a085-987da276c9cb",
    "name": "midu"
  },
  {
    "id": "24d9a10e-6baa-4c60-b291-354ecebc97eb",
    "name": "pheralb"
  },
  {
    "id": "580f4bb9-b311-4f06-8e09-e88605dd9038",
    "name": "madeval"
  },
  {
    "id": "ff3b043e-5b5b-49d5-95a0-2a3c04922220",
    "name": "Lucía"
  }
]

const server = createServer(async (req, res) => {
    const {method, url} = req
    console.log("Request recivida: ", method, url)
    
    const [pathname, querystring] = url.split('?')
    const searchParams = new URLSearchParams(querystring)

    if(method === "GET") {
        if(pathname === "/") {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            return res.end("Hola desde Node 🦖!")
        }
        if(pathname === "/health") {
            return sendJson(res, 200, {status: "ok", uptime: process.uptime()})
        }
        if (pathname === '/cookies') {
          // setear la cookie desde el backend para el cliente
          res.setHeader('Set-Cookie', 'token=abc123; HttpOnly; Path=/; Max-Age=3600')

          return res.end('Cookies set')
        }
        if(pathname === "/users") {
            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0

            const paginatedUsers = users.slice(offset, offset + limit)
            return sendJson(res, 200, paginatedUsers)
        }
        return sendJson(res, 404, {error: "Not Found"})
    }
    else if(method === "POST") {
        if(pathname === "/users") {
            const body = await json(req)

            if (!body || !body.name) {
                return sendJson(res, 400, { error: 'Name is required' })
            }
            const newUser = {
                id: randomUUID(),
                name: body.name
            }
            users.push(newUser)
            return sendJson(res, 201, {message: "Usuario Creado"})
        }
        return sendJson(res, 404, {error: "Not Found"})
    }
    else {
        return sendJson(res, 405, {error: "Method Not Allowed"})
    }    
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})