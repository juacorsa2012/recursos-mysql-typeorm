import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap"
import { Router } from "express"
import TemaController from "../controller/tema.controller"

const router = Router()

router.get('/', TemaController.obtenerTemas)
router.get('/:id', TemaController.obtenerTema)
router.post('/', TemaController.registrarTema)
router.put('/:id', TemaController.actualizarTema)

export default router