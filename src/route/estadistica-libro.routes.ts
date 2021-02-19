import { Router } from "express"
import EstadisticaLibroController from "../controller/estadistica-libro.controller"

const router = Router()

router.get('/paginas', EstadisticaLibroController.obtenerPaginasTotales)
router.get('/libros', EstadisticaLibroController.obtenerLibrosTotales)
router.get('/temas', EstadisticaLibroController.obtenerLibrosPaginasPorTema)
router.get('/publicado', EstadisticaLibroController.obtenerLibrosPaginasPorAñoPublicado)
router.get('/idioma', EstadisticaLibroController.obtenerLibrosPaginasPorIdioma)
router.get('/editorial', EstadisticaLibroController.obtenerLibrosPaginasPorEditorial)

export default router