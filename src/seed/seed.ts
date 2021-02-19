import { Connection, createConnection } from 'typeorm'
import * as faker from "faker"

const EDITORIALES: number = 25
const FABRICANTES: number = 25
const TEMAS: number   = 25
const IDIOMAS: number = 25
const LIBROS: number  = 100
const TUTORIALES: number = 100
const AÑO_MINIMO: number = 2000
const AÑO_MAXIMO: number = 2020
const DURACION_MINIMA: number = 1
const DURACION_MAXIMA: number = 25000
const PAGINAS_MINIMO: number  = 1
const PAGINAS_MAXIMO: number  = 2000
const USERNAME: string = "root"
const PASSWORD: string = ""
const DB: string = "recursos_typeorm"

async function run() {      
    const connection: Connection = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: USERNAME,
        password: PASSWORD,
        database: DB
    });       

    console.log(`Conectado a ${connection.options.database}`)
   
    await connection.query("DELETE FROM libros")
    await connection.query("DELETE FROM tutoriales")
    
    console.log("Registrando editoriales...")  
    await connection.query("DELETE FROM editoriales")
    await connection.query("ALTER TABLE editoriales AUTO_INCREMENT=1")

    for (let i = 1; i <= EDITORIALES; i++) {
        const value = "Editorial " + i;
        await connection.query("INSERT INTO editoriales (nombre) VALUES (?)", [value])        
    }   

    console.log("Registrando temas...")  
    await connection.query("DELETE FROM temas")
    await connection.query("ALTER TABLE temas AUTO_INCREMENT=1")

    for (let i = 1; i <= TEMAS; i++) {
        const value = "Tema " + i;
        await connection.query("INSERT INTO temas (nombre) VALUES (?)", [value])        
    }   

    console.log("Registrando idiomas...")  
    await connection.query("DELETE FROM idiomas")
    await connection.query("ALTER TABLE idiomas AUTO_INCREMENT=1")

    for (let i = 1; i <= IDIOMAS; i++) {
        const value = "Idioma " + i;
        await connection.query("INSERT INTO idiomas (nombre) VALUES (?)", [value])        
    }   

    console.log("Registrando fabricantes...")  
    await connection.query("DELETE FROM fabricantes")
    await connection.query("ALTER TABLE fabricantes AUTO_INCREMENT=1")

    for (let i = 1; i <= FABRICANTES; i++) {
        const value = "Fabricante " + i;
        await connection.query("INSERT INTO fabricantes (nombre) VALUES (?)", [value])        
    }   

    console.log("Registrando libros...")  
    for (let i = 1; i <= LIBROS; i++) {
        const titulo    = faker.lorem.sentence()
        const paginas   = faker.random.number({min: PAGINAS_MINIMO, max: PAGINAS_MAXIMO})
        const publicado = faker.random.number({min: AÑO_MINIMO, max: AÑO_MAXIMO})
        const observaciones = faker.lorem.paragraph()
        const temaId      = faker.random.number({min: 1, max: TEMAS})
        const idiomaId    = faker.random.number({min: 1, max: IDIOMAS})
        const editorialId = faker.random.number({min: 1, max: EDITORIALES})

        const sql = `INSERT INTO LIBROS (titulo, paginas, publicado, observaciones, temaId, idiomaId, editorialId) 
                     VALUES (?,?,?,?,?,?,?)`

        await connection.query(sql, [titulo, paginas, publicado, observaciones, temaId, idiomaId, editorialId])
    }   

    console.log("Registrando tutoriales...")  
    for (let i = 1; i <= TUTORIALES; i++) {
        const titulo    = faker.lorem.sentence()
        const duracion  = faker.random.number({min: DURACION_MINIMA, max: DURACION_MAXIMA})
        const publicado = faker.random.number({min: AÑO_MINIMO, max: AÑO_MAXIMO})
        const observaciones = faker.lorem.paragraph()
        const temaId       = faker.random.number({min: 1, max: TEMAS})
        const idiomaId     = faker.random.number({min: 1, max: IDIOMAS})
        const fabricanteId = faker.random.number({min: 1, max: FABRICANTES})        
        
        const sql = `INSERT INTO TUTORIALES (titulo, duracion, publicado, observaciones, temaId, idiomaId, fabricanteId) 
                     VALUES (?,?,?,?,?,?,?)`

        await connection.query(sql, [titulo, duracion, publicado, observaciones, temaId, idiomaId, fabricanteId])
    }   

    connection.close()
    console.log("Proceso finalizado.")
}

run()