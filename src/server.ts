import app from './app';
import * as Message from './config/messages'

const PORT = process.env.PORT || 3000

const server =
    app.listen(PORT, () => console.log(`Aplicación corriendo en el puerto ${PORT}`))

process.on('SIGINT', () => {
    server.close()
    console.log(Message.APLICACION_FINALIZADA)
})