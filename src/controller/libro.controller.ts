import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import * as HttpStatus from "http-status"
import LibroRepository from "../respository/libro.repository"
import Libro  from "../entity/libro.entity"
import * as Message from "../config/messages"
import TemaRepository from "../respository/tema.respository"
import IdiomaRepository from "../respository/idioma.repository"
import EditorialRepository from "../respository/editorial.repository"

export default class LibroController { 
    static obtenerLibros = async (req: Request, res: Response) => {
        const repo = getCustomRepository(LibroRepository)        

        try {
            const libros = await repo.obtenerLibros(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: libros.length,
                data: { libros }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }
    
    static obtenerLibro = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(LibroRepository)        
        
        try {
            const libro = await repo.obtenerLibro(Number(id))
            
            if (!libro) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status : Message.ERROR,
                    message: Message.LIBRO_NO_ENCONTRADO
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                data: { libro }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarLibro = async (req: Request, res: Response) => {
        const { titulo, publicado, paginas, observaciones, tema, idioma, editorial } = req.body
        const libro = new Libro()

        libro.titulo    = titulo
        libro.paginas   = paginas
        libro.publicado = publicado
        libro.observaciones = observaciones
        libro.editorial = editorial
        libro.tema   = tema        
        libro.idioma = idioma              
            
        const errores = await validate(libro)

        if (errores.length > 0) {
            const errors = []
            errores.forEach(item => errors.push(item.constraints))            

            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,                
                errores: errors
            })
        }                  

        if (!await getCustomRepository(TemaRepository).obtenerTema(tema)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.TEMA_NO_ENCONTRADO                
            })
        }
        
        if (!await getCustomRepository(IdiomaRepository).obtenerIdioma(idioma)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.IDIOMA_NO_ENCONTRADO
            })
        }
        
        if (!await getCustomRepository(EditorialRepository).obtenerEditorial(editorial)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.EDITORIAL_NO_ENCONTRADA
            })
        }
        
        try {            
            getCustomRepository(LibroRepository).save(libro)            

            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                message: Message.LIBRO_REGISTRADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        } 
    }

    static actualizarLibro = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(LibroRepository)
        
        let libro = await repo.obtenerLibro(Number(id))
        
        if (!libro) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status : Message.ERROR,
                message: `El libro ${id} no existe en la base de datos.`
            })
        }                                     

        const { titulo, publicado, paginas, observaciones, tema, idioma, editorial } = req.body
        
        libro.titulo    = titulo
        libro.paginas   = paginas
        libro.publicado = publicado
        libro.observaciones = observaciones
        libro.editorial = editorial
        libro.tema   = tema        
        libro.idioma = idioma    

        const errores = await validate(libro)

        if (errores.length > 0) {
            const errors = []
            errores.forEach(item => errors.push(item.constraints))            

            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,                
                errores: errors
            })
        }                  

        if (!await getCustomRepository(TemaRepository).obtenerTema(tema)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.TEMA_NO_ENCONTRADO                
            })
        }
        
        if (!await getCustomRepository(IdiomaRepository).obtenerIdioma(idioma)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.IDIOMA_NO_ENCONTRADO
            })
        }
        
        if (!await getCustomRepository(EditorialRepository).obtenerEditorial(editorial)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.EDITORIAL_NO_ENCONTRADA
            })
        }
        
        try {                        
            repo.actualizarLibro(Number(id), libro)         

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.LIBRO_ACTUALIZADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }     
    }          

    static borrarLibro = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(LibroRepository)        

        try {
            const libro = await repo.obtenerLibro(Number(id))
            
            if (!libro) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status : Message.ERROR,
                    message: Message.LIBRO_NO_ENCONTRADO
                })    
            } 

            repo.borrarLibro(libro)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.LIBRO_BORRADO_CON_EXITO
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTotales = async (req:Request, res: Response) => {
        const repo = getCustomRepository(LibroRepository)        

        const totalLibros  = await repo.count()
        const totalPaginas = await repo.manager.query("SELECT SUM(paginas) as paginas FROM libros")
                
        return res.status(HttpStatus.OK).json({
            status: Message.SUCCESS,
            data: {
                totalLibros,
                totalPaginas: totalPaginas[0].paginas                
            }            
        })
    }
}
