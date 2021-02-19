import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as HttpStatus from "http-status"
import * as Message from "../config/messages"
import EstadisticaLibroRepository from '../respository/estadistica-libro.repository'

export default class EstadisticaLibroController { 
    static obtenerPaginasTotales = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const paginas = await repo.obtenerPaginas()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: paginas
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerLibrosTotales = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const libros = await repo.obtenerLibros()
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,                
                data: libros
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerLibrosPaginasPorTema = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const result = await repo.obtenerLibrosPaginasPorTema()
            
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

    static obtenerLibrosPaginasPorAñoPublicado = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const result = await repo.obtenerLibrosPaginasPorAñoPublicado()
            
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

    static obtenerLibrosPaginasPorIdioma = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const result = await repo.obtenerLibrosPaginasPorIdioma()
            
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

    static obtenerLibrosPaginasPorEditorial = async (req: Request, res: Response) => {
        const repo = getCustomRepository(EstadisticaLibroRepository)

        try {
            const result = await repo.obtenerLibrosPaginasPorEditorial()
            
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