import { Router } from "express"
import TutorialController from "../controller/tutorial.controller"

const router = Router()

router.get('/estadistica', TutorialController.obtenerTotales)
router.get('/', TutorialController.obtenerTutoriales)
router.get('/:id', TutorialController.obtenerTutorial)
router.post('/', TutorialController.registrarTutorial)
router.put('/:id', TutorialController.actualizarTutorial)
router.delete('/:id', TutorialController.borrarTutorial)

export default router