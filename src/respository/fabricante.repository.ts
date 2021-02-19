import { EntityRepository, Repository } from "typeorm"
import Fabricante from "../entity/fabricante.entity"

@EntityRepository(Fabricante)
export default class FabricanteRepository extends Repository<Fabricante> {
    obtenerFabricantes(params: any): Promise<Fabricante[]> {
        const { skip, perPage, sort, dir } = params

        let query = this.createQueryBuilder('fabricantes')        
        
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

    obtenerFabricante(id: number): Promise<Fabricante> {
        return this.findOne(id)
    }

    registrarFabricante(fabricante: Fabricante): Promise<Fabricante> {
        return this.save(fabricante)
    }

    existeFabricante(nombre: string): Promise<Fabricante> {
        return this.findOne({ nombre })
    }

    async actualizarFabricante(id: number, fabricante: Fabricante): Promise<Fabricante> {
        let nuevoFabricante = await this.findOne(id)
        this.merge(nuevoFabricante, fabricante)       

        return this.save(nuevoFabricante)
    }
}
