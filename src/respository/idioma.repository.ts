import { EntityRepository, Repository } from "typeorm"
import Idioma from "../entity/idioma.entity"

@EntityRepository(Idioma)
export default class IdiomaRepository extends Repository<Idioma> {
    obtenerIdiomas(params: any): Promise<Idioma[]> {
        const { skip, perPage, sort, dir } = params

        let query = this.createQueryBuilder('idiomas')        
        
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

    obtenerIdioma(id: number): Promise<Idioma> {
        return this.findOne(id)
    }

    registrarIdioma(idioma: Idioma): Promise<Idioma> {
        return this.save(idioma)
    }

    existeIdioma(nombre: string): Promise<Idioma> {
        return this.findOne({ nombre })
    }

    async actualizarIdioma(id: number, idioma: Idioma): Promise<Idioma> {
        let nuevoIdioma = await this.findOne(id)
        this.merge(nuevoIdioma, idioma)       

        return this.save(nuevoIdioma)
    }
}
