import { Router } from "express"
import LibroController from "../controller/libro.controller"

const router = Router()

router.get('/estadistica', LibroController.obtenerTotales)
router.get('/', LibroController.obtenerLibros)
router.get('/:id', LibroController.obtenerLibro)
router.post('/', LibroController.registrarLibro)
router.put('/:id', LibroController.actualizarLibro)
router.delete('/:id', LibroController.borrarLibro)

export default router