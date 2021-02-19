import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import * as HttpStatus from "http-status"
import FabricanteRepository from "../respository/fabricante.repository"
import Fabricante from "../entity/fabricante.entity"
import * as Message from "../config/messages"

export default class FabricanteController { 
    static obtenerFabricantes = async (req: Request, res: Response) => {        
        const repo = getCustomRepository(FabricanteRepository)
        
        try {
            const fabricantes = await repo.obtenerFabricantes(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: fabricantes.length,
                data: { fabricantes }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerFabricante = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(FabricanteRepository)

        try {
            const fabricante = await repo.obtenerFabricante(Number(id))
            
            if (!fabricante) {
                return res.status(404).json({
                    status: Message.ERROR,                
                    message: `El fabricante ${id} no existe en la base de datos.`
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                data: { fabricante }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarFabricante = async (req: Request, res:Response) => {       
        const { nombre } = req.body
        const fabricante = new Fabricante(nombre)              
            
        const repo = getCustomRepository(FabricanteRepository)
                
        if (await repo.existeFabricante(nombre)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El fabricante ${nombre} ya existe en la base de datos.`
            })
        }
            
        const errores = await validate(fabricante, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            repo.registrarFabricante(fabricante)

            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                message: Message.FABRICANTE_REGISTRADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: Message.ERROR,
                message: err.message
            })
        } 
    }

    static actualizarFabricante = async (req: Request, res:Response) => {   
        const { id } = req.params
        const { nombre } = req.body
        const repo = getCustomRepository(FabricanteRepository)
        
        if (!await repo.obtenerFabricante(Number(id))) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status : Message.ERROR,
                message: `El fabricante ${id} no existe en la base de datos.`
            })
        }                                     

        if (await repo.existeFabricante(nombre)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status : Message.ERROR,
                message: `El fabricante ${nombre} ya existe en la base de datos.`
            })
        }
        
        const fabricante = new Fabricante(nombre)                
        
        const errores = await validate(fabricante, { validationError: { target: false } })        

        if (errores.length > 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: Message.ERROR,
                message: Message.IMPOSIBLE_COMPLETAR_ACCION,
                errores
            })
        }

        try {            
            await repo.actualizarFabricante(Number(id), fabricante)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.FABRICANTE_REGISTRADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        } 
    }
}
