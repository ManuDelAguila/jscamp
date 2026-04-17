// node --watch server.js --> lanza el servidor y cada vez que detecta un cambio se acutaliza solo

import { createServer } from "node:http"

process.loadEnvFile()
const port = process.env.PORT || 3000

function sendJson (res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}

const server = createServer((req, res) => {
    console.log("Request recivida: ", req.method, req.url)
        
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if(req.url === "/") {
        return res.end("Hola desde Node 🦖!")
    }

    if(req.url === "/users") {
        return sendJson(res, 200, [{id: 1, name: "manu"}])
    }

    return sendJson(res, 404, {error: "Not Found"})
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})