import { EntityRepository, Repository } from "typeorm"
import Editorial from "../entity/editorial.entity"

@EntityRepository(Editorial)
export default class EditorialRepository extends Repository<Editorial> {
    obtenerEditoriales(params: any): Promise<Editorial[]> {                
        const { skip, perPage, sort, dir } = params

        let query = this.createQueryBuilder('editoriales')        
        
        if (skip) {
            query = query.skip(skip)   
        } 

        if (perPage) {
            query = query.take(perPage)   
        }        

        if (sort) {
            const dir = sort[0]
            let campo = sort + ''

            campo = campo.replace('+', '').replace('-','')

            if (dir == '+') {
                query = query.orderBy(campo, "ASC")
            } else {
                query = query.orderBy(campo, "DESC")
            }
        }        
        
        return query.getMany()
    }

    obtenerEditorial(id: number): Promise<Editorial> {
        return this.findOne(id)
    }

    registrarEditorial(editorial: Editorial): Promise<Editorial> {
        return this.save(editorial)
    }

    existeEditorial(nombre: string): Promise<Editorial> {
        return this.findOne({ nombre })
    }

    async actualizarEditorial(id: number, editorial: Editorial): Promise<Editorial> {
        let nuevoEditorial = await this.findOne(id)
        this.merge(nuevoEditorial, editorial)       

        return this.save(nuevoEditorial)
    }
}
