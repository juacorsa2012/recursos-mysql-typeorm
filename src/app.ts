import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import * as xss from 'xss-clean'
import * as rateLimit from 'express-rate-limit'

import conectarBD from './config/db'
import temaRoutes  from './route/tema.routes'
import editorialRoutes  from './route/editorial.routes'
import idiomaRoutes  from './route/idioma.routes'
import fabricanteRoutes  from './route/fabricante.routes'
import libroRoutes from './route/libro.routes'
import tutorialRoutes from './route/tutorial.routes'
import estadisticaLibroRoutes from './route/estadistica-libro.routes'
import estadisticaTutorialRoutes from './route/estadistica-tutorial.routes'
import * as Message from './config/messages'

const app = express()

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: Message.DEMASIADAS_CONEXIONES
})

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())  
app.use('/api/v1/', limiter)

conectarBD()

app.use('/api/v1/temas', temaRoutes)
app.use('/api/v1/editoriales', editorialRoutes)
app.use('/api/v1/idiomas', idiomaRoutes)
app.use('/api/v1/fabricantes', fabricanteRoutes)
app.use('/api/v1/libros', libroRoutes)
app.use('/api/v1/tutoriales', tutorialRoutes)
app.use('/api/v1/libros/estadistica/', estadisticaLibroRoutes)
app.use('/api/v1/tutoriales/estadistica/', estadisticaTutorialRoutes)

export default app