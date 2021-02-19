import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import EditorialRepository from "../respository/editorial.repository"
import Editorial from "../entity/editorial.entity"
import * as Message from "../config/messages"
import * as HttpStatus from "http-status"

export default class EditorialController { 
    static obtenerEditoriales = async (req: Request, res: Response) => {        
        const repo = getCustomRepository(EditorialRepository)
        
        try {
            const editoriales = await repo.obtenerEditoriales(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: editoriales.length,
                data: { editoriales }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerEditorial = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(EditorialRepository)

        try {
            const editorial = await repo.obtenerEditorial(Number(id))
            
            if (!editorial) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: Message.ERROR,
                    message: Message.EDITORIAL_NO_ENCONTRADA,
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: { editorial }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarEditorial = async (req: Request, res:Response) => {       
        const { nombre } = req.body
        const editorial = new Editorial(nombre)                     
        
        const repo = getCustomRepository(EditorialRepository)
        
        if (await repo.existeEditorial(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `La editorial ${nombre} ya existe en la base de datos.`
            })
        }
        
        const errores = await validate(editorial, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            repo.registrarEditorial(editorial)

            return res.status(HttpStatus.CREATED).json({
                status : Message.SUCCESS,
                message: Message.EDITORIAL_REGISTRADA_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        } 
    }

    static actualizarEditorial = async (req: Request, res:Response) => {   
        const { id } = req.params
        const { nombre } = req.body
        const repo = getCustomRepository(EditorialRepository)
        
        if (!await repo.obtenerEditorial(Number(id))) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status : Message.ERROR,
                message: `La editorial ${id} no existe en la base de datos.`
            })
        }                                     

        if (await repo.existeEditorial(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `La editorial ${nombre} ya existe en la base de datos.`
            })
        }
        
        const editorial = new Editorial(nombre)           
        const errores = await validate(editorial, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            await repo.actualizarEditorial(Number(id), editorial)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.EDITORIAL_ACTUALIZADA_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        } 
    }
}
