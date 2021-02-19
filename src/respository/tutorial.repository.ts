import { EntityRepository, Repository } from "typeorm";
import Tutorial from "../entity/tutorial.entity";

@EntityRepository(Tutorial)
export default class TutorialRepository extends Repository<Tutorial> {
    obtenerTutoriales(params: any): Promise<Tutorial[]> {
        const { tema, idioma, fabricante, duracion_eq, duracion_lt, duracion_lte, duracion_gt, duracion_gte, 
                publicado_eq, publicado_lt, publicado_lte, publicado_gt, publicado_gte, sort, 
                titulo_like, limit, offset } = params

        let query = this.createQueryBuilder('libros').where("1 = 1")       
        
        if (tema) {                       
           query = query.andWhere("temaId = :tema").setParameter("tema", tema)
        } 

        if (idioma) {                        
            query = query.andWhere("idiomaId = :idioma").setParameter("idioma", idioma)
        } 

        if (fabricante) {                        
            query = query.andWhere("fabricanteId = :fabricante").setParameter("fabricante", fabricante)
        }      

        if (duracion_eq) {            
            query = query.andWhere("duracion = :duracion").setParameter("duracion", duracion_eq)            
        }

        if (duracion_lt) {            
            query = query.andWhere("duracion < :duracion").setParameter("duracion", duracion_lt)            
        }

        if (duracion_lte) {            
            query = query.andWhere("duracion <= :duracion").setParameter("duracion", duracion_lte)
        }

        if (duracion_gt) {            
            query = query.andWhere("duracion > :duracion").setParameter("duracion", duracion_gt)
        }

        if (duracion_gte) {
            query = query.andWhere("duracion >= :duracion").setParameter("duracion", duracion_gte)
        }

        if (publicado_eq) {            
            query = query.andWhere("publicado = :publicado").setParameter("publicado", publicado_eq)
        }

        if (publicado_lt) {            
            query = query.andWhere("publicado < :publicado").setParameter("publicado", publicado_lt)
        }

        if (publicado_lte) {            
            query = query.andWhere("publicado <= :publicado").setParameter("publicado", publicado_lte)
        }

        if (publicado_gt) {            
            query = query.andWhere("publicado > :publicado").setParameter("publicado", publicado_gt)
        }

        if (publicado_gte) {            
            query = query.andWhere("publicado >= :publicado").setParameter("publicado", publicado_gte)
        }

        if (titulo_like) {
            query = query.andWhere("titulo LIKE :titulo").setParameter("titulo", `%${titulo_like}%`);            
        }

        if (limit) {
            query = query.limit(limit)           
        }

        if (offset) {
            query = query.offset(offset)
        }

        if (sort) {
            const dir = sort[0];
            let campo = sort + ''; // Se convierte a string 
            campo = campo.replace('+', '').replace('-','')

            if (dir == '+') {
                query = query.orderBy(campo, "ASC")
            } else {
                query = query.orderBy(campo, "DESC")
            }
        }        
        
        return query
            .leftJoinAndSelect("libros.tema", "tema")
            .leftJoinAndSelect("libros.idioma", "idioma")
            .leftJoinAndSelect("libros.fabricante", "fabricante")
            .select(["libros","tema.nombre", "tema.id"])
            .addSelect(["idioma.id", "idioma.nombre"])
            .addSelect(["fabricante.id", "fabricante.nombre"])
            .getMany()          
    }            

    obtenerTutorial(id: number): Promise<Tutorial> {
        return this.findOne(id, { relations: ["tema", "idioma", "fabricante"] })
    }

    registrarTutorial(tutorial: Tutorial): Promise<Tutorial> {
        return this.save(tutorial)
    }

    async actualizarTutorial(id: number, tutorial: Tutorial): Promise<Tutorial> {        
        let _tutorial = await this.findOne(id)
        this.merge(_tutorial, tutorial)       

        return this.save(_tutorial)
    }

    borrarTutorial(tutorial: Tutorial): Promise<Tutorial> {
        return this.remove(tutorial)
    }
}