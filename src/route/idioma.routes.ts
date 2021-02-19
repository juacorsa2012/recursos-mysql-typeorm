import { Router } from "express"
import IdiomaController from "../controller/idioma.controller"

const router = Router()

router.get('/', IdiomaController.obtenerIdiomas)
router.get('/:id', IdiomaController.obtenerIdioma)
router.post('/', IdiomaController.registrarIdioma)
router.put('/:id', IdiomaController.actualizarIdioma)

export default router