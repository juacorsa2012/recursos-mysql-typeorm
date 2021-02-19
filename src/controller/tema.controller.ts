import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import * as HttpStatus from 'http-status'
import TemaRepository from "../respository/tema.respository"
import Tema from "../entity/tema.entity"
import * as Message from "../config/messages"

export default class TemaController { 
    static obtenerTemas = async (req: Request, res: Response) => {        
        const repo = getCustomRepository(TemaRepository)              
        
        try {
            const temas = await repo.obtenerTemas(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: temas.length,
                data: { temas }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTema = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(TemaRepository)

        try {
            const tema = await repo.obtenerTema(Number(id))
            
            if (!tema) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: Message.ERROR,             
                    message: Message.TEMA_NO_ENCONTRADO
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,        
                data: { tema }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarTema = async (req: Request, res:Response) => {       
        const { nombre } = req.body
        const tema = new Tema(nombre)              
            
        const repo = getCustomRepository(TemaRepository)               
                
        if (await repo.existeTema(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El tema ${nombre} ya existe en la base de datos.`
            })
        }
            
        const errores = await validate(tema, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores: errores
            })
        }

        try {            
            repo.registrarTema(tema)

            return res.status(201).json({
                status: Message.SUCCESS,
                message: Message.TEMA_REGISTRADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: Message.ERROR,
                    message: err.message
            })
        } 
    }

    static actualizarTema = async (req: Request, res:Response) => {   
        const { id } = req.params
        const { nombre } = req.body
        const repo = getCustomRepository(TemaRepository)            
        
        if (!await repo.obtenerTema(Number(id))) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El tema ${id} no existe en la base de datos.`
            })
        }                                     

        if (await repo.existeTema(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El tema ${nombre} ya existe en la base de datos.`
            })
        }
        
        const tema = new Tema(nombre)                
        
        const errores = await validate(tema, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores: errores
            })
        }

        try {            
            await repo.actualizarTema(Number(id), tema)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.TEMA_ACTUALIZADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        } 
    }
}
