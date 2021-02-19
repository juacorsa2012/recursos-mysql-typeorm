import { Router } from "express"
import EditorialController from "../controller/editorial.controller"

const router = Router()

router.get('/', EditorialController.obtenerEditoriales)
router.get('/:id', EditorialController.obtenerEditorial)
router.post('/', EditorialController.registrarEditorial)
router.put('/:id', EditorialController.actualizarEditorial)

export default router