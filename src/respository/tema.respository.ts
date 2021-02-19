import { EntityRepository, Repository } from "typeorm"
import Tema from "../entity/tema.entity"

@EntityRepository(Tema)
export default class TemaRepository extends Repository<Tema> {
    obtenerTema(id: number): Promise<Tema> {
        return this.findOne(id)
    }

    registrarTema(tema: Tema): Promise<Tema> {
        return this.save(tema)
    }

    existeTema(nombre: string): Promise<Tema> {
        return this.findOne({ nombre })
    }

    async actualizarTema(id: number, tema: Tema): Promise<Tema> {
        let nuevoTema = await this.findOne(id)
        this.merge(nuevoTema, tema)       

        return this.save(nuevoTema)
    }

    obtenerTemas(params: any): Promise<Tema[]> {                
        const { skip, perPage, sort, dir } = params

        let query = this.createQueryBuilder('temas')        
        
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
}