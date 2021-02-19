import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import IdiomaRepository from "../respository/idioma.repository"
import Idioma from "../entity/idioma.entity"
import * as Message from "../config/messages"
import * as HttpStatus from "http-status"

export default class IdiomaController { 
    static obtenerIdiomas = async (req: Request, res: Response) => {        
        const repo = getCustomRepository(IdiomaRepository)
        
        try {
            const idiomas = await repo.obtenerIdiomas(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: idiomas.length,
                data: { idiomas }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerIdioma = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(IdiomaRepository)

        try {
            const idioma = await repo.obtenerIdioma(Number(id))
            
            if (!idioma) {
                return res.status(404).json({
                    status: Message.ERROR,                
                    message: "Idioma no encontrado"
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                data: { idioma }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarIdioma = async (req: Request, res:Response) => {       
        const { nombre } = req.body
        const idioma = new Idioma(nombre)              
            
        const repo = getCustomRepository(IdiomaRepository)
                
        if (await repo.existeIdioma(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El idioma ${nombre} ya existe en la base de datos.`
            })
        }
            
        const errores = await validate(idioma, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            repo.registrarIdioma(idioma)

            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                message: Message.IDIOMA_REGISTRADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        } 
    }

    static actualizarIdioma = async (req: Request, res:Response) => {   
        const { id } = req.params
        const { nombre } = req.body
        const repo = getCustomRepository(IdiomaRepository)
        
        if (!await repo.obtenerIdioma(Number(id))) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El idioma ${id} no existe en la base de datos.`
            })
        }                                     

        if (await repo.existeIdioma(nombre)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status : Message.ERROR,
                message: `El idioma ${nombre} ya existe en la base de datos.`
            })
        }
        
        const idioma = new Idioma(nombre)                
        
        const errores = await validate(idioma, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            await repo.actualizarIdioma(Number(id), idioma)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.IDIOMA_ACTUALIZADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        } 
    }
}
