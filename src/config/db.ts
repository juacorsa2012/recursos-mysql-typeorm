import { createConnection } from 'typeorm'

const conectarBD = async () => {
    const conn = await createConnection()
    console.log(`Aplicación conectada a la base de datos ${conn.options.database}`)

    process.on('SIGINT', () => {
        conn.close().then(() => console.log('Conexión a la base de datos cerrada con éxito'))
    })
}

export default conectarBD