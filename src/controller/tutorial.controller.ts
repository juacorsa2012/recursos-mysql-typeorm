import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"
import { validate } from "class-validator"
import * as HttpStatus from "http-status"
import Tutorial from "../entity/tutorial.entity"
import * as Message from "../config/messages"
import TemaRepository from "../respository/tema.respository"
import IdiomaRepository from "../respository/idioma.repository"
import FabricanteRepository from "../respository/fabricante.repository"
import TutorialRepository from "../respository/tutorial.repository"

export default class TutorialController { 
    static obtenerTutoriales = async (req: Request, res: Response) => {
        const repo = getCustomRepository(TutorialRepository)

        try {
            const tutoriales = await repo.obtenerTutoriales(req.query)
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                result: tutoriales.length,
                data: { tutoriales }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTutorial = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(TutorialRepository)
        
        try {
            const tutorial = await repo.obtenerTutorial(Number(id))
            
            if (!tutorial) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status : Message.ERROR,
                    message: Message.TUTORIAL_NO_ENCONTRADO
                })    
            }            
            
            return res.status(HttpStatus.OK).json({
                status: Message.SUCCESS,
                data: { tutorial }
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static registrarTutorial = async (req: Request, res: Response) => {
        const { titulo, publicado, duracion, observaciones, tema, idioma, fabricante } = req.body
        const tutorial = new Tutorial()

        tutorial.titulo    = titulo
        tutorial.duracion  = duracion
        tutorial.publicado = publicado
        tutorial.observaciones = observaciones
        tutorial.fabricante = fabricante
        tutorial.tema   = tema        
        tutorial.idioma = idioma              
            
        const errores = await validate(tutorial)

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
        
        if (!await getCustomRepository(FabricanteRepository).obtenerFabricante(fabricante)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.FABRICANTE_NO_ENCONTRADO
            })
        }
        
        try {            
            getCustomRepository(TutorialRepository).save(tutorial)            

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

    static actualizarTutorial = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(TutorialRepository)
        
        let tutorial = await repo.obtenerTutorial(Number(id))
        
        if (!tutorial) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status : Message.ERROR,
                message: `El tutorial ${id} no existe en la base de datos.`
            })
        }                                     

        const { titulo, publicado, duracion, observaciones, tema, idioma, fabricante } = req.body
        
        tutorial.titulo    = titulo
        tutorial.duracion  = duracion
        tutorial.publicado = publicado
        tutorial.observaciones = observaciones
        tutorial.fabricante = fabricante
        tutorial.tema   = tema        
        tutorial.idioma = idioma    

        const errores = await validate(tutorial)

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
        
        if (!await getCustomRepository(FabricanteRepository).obtenerFabricante(fabricante)) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: Message.ERROR,
                message: Message.FABRICANTE_NO_ENCONTRADO
            })
        }
        
        try {                                    
            repo.actualizarTutorial(Number(id), tutorial)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.FABRICANTE_ACTUALIZADO_CON_EXITO
            })               
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }     
    }          

    static borrarTutorial = async (req: Request, res: Response) => {
        const { id } = req.params
        const repo = getCustomRepository(TutorialRepository)

        try {
            const tutorial = await repo.obtenerTutorial(Number(id))
            
            if (!tutorial) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status : Message.ERROR,
                    message: Message.TUTORIAL_NO_ENCONTRADO
                })    
            } 

            repo.borrarTutorial(tutorial)

            return res.status(HttpStatus.OK).json({
                status : Message.SUCCESS,
                message: Message.TUTORIAL_BORRADO_CON_EXITO
            })

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status : Message.ERROR,
                message: err.message
            })
        }                    
    }

    static obtenerTotales = async (req:Request, res: Response) => {
        const repo = getCustomRepository(TutorialRepository)

        const totalTutoriales = await repo.count()
        const totalDuracion = await repo.manager.query("SELECT SUM(duracion) as duracion FROM tutoriales")
                
        return res.status(HttpStatus.OK).json({
            status: Message.SUCCESS,
            data: {
                totalTutoriales,
                totalDuracion: totalDuracion[0].duracion
            }            
        })
    }    
}
