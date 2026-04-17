import express from "express"

const PORT = process.env.PORT ?? 1234
const app = express()

 const jobs = [
    {id: 1, title: "Frontend"},
    {id: 2, title: "Backend"},
    {id: 3, title: "Fullstack"}
]

//esto es un middelware que se ejecuta primero siempre, se puede usar para controlar acceso... si quieres q continue con el proceso se llama a next()
app.use((req, res, next) =>{
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

//Tambien se pueden crear tantos middelware como se quiera y pasrlo a un metodo concreto, se ejecutaran en el orden de que aparecen en el metodo. Ver el get de "/"
const previousHomeMiddleware = (req, res, next) => {
    console.log("Ejecutando el middleware previo a la ruta / ")
    next()
}

app.get("/", previousHomeMiddleware, (req, res) => {
    return res.send("Hello World")
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})


app.get("/get-jobs", (req, res) => {   
    res.json(jobs)
})

app.get("/get-single-job/:id", (req, res) =>{
    const { id } = req.params
    const idNumber = Number(id)
    const jobFilter = jobs.filter((job) => {
        return job.id === idNumber
    })
    
    return res.json(jobFilter)
})

// Opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd o acd')
})

// Comodín
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb')
})

// Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
  return res.send('file/*')
})

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send('Terminando en fly')
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})