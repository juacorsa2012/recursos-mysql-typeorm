import { Router } from "express"
import FabricanteController from "../controller/fabricante.controller"

const router = Router()

router.get('/', FabricanteController.obtenerFabricantes)
router.get('/:id', FabricanteController.obtenerFabricante)
router.post('/', FabricanteController.registrarFabricante)
router.put('/:id', FabricanteController.actualizarFabricante)

export default router