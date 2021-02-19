import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as HttpStatus from "http-status"
import * as Message from "../config/messages"
import EstadisticaTutorialRepository from '../respository/estadistica-tutorial.repository'

export default class EstadisticaTutorialController { 
    static obtenerDuracionTotal = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const duracion = await repo.obtenerDuracion()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: duracion
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutoriales = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const tutoriales = await repo.obtenerTutoriales()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: tutoriales
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutorialesPorTema = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const tutoriales = await repo.obtenerTutorialesPorTema()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: tutoriales
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutorialesPorIdioma = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const tutoriales = await repo.obtenerTutorialesPorIdioma()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: tutoriales
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutorialesPorFabricante = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const tutoriales = await repo.obtenerTutorialesPorFabricante()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: tutoriales
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutorialesDuracionPorAñoPublicado = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaTutorialRepository)

        try {
            const result = await repo.obtenerTutorialesDuracionPorAñoPublicado()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: {result}
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }    
}