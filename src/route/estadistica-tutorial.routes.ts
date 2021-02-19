import { Router } from "express"
import EstadisticaTutorialController from "../controller/estadistica-tutorial.controller"

const router = Router()

router.get('/duracion', EstadisticaTutorialController.obtenerDuracionTotal)
router.get('/tutoriales', EstadisticaTutorialController.obtenerTutoriales)
router.get('/temas', EstadisticaTutorialController.obtenerTutorialesPorTema)
router.get('/idioma', EstadisticaTutorialController.obtenerTutorialesPorIdioma)
router.get('/fabricante', EstadisticaTutorialController.obtenerTutorialesPorFabricante)
router.get('/publicado', EstadisticaTutorialController.obtenerTutorialesDuracionPorAñoPublicado)

export default router