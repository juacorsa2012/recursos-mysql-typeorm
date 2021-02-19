import { EntityRepository, Repository } from "typeorm";
import  Libro from "../entity/libro.entity";

@EntityRepository(Libro)
export default class LibroRepository extends Repository<Libro> {
    obtenerLibros(params: any): Promise<Libro[]> {
        const { tema, idioma, editorial, paginas_eq, paginas_lt, paginas_lte, paginas_gt, paginas_gte, 
                publicado_eq, publicado_lt, publicado_lte, publicado_gt, publicado_gte, sort, 
                titulo_like, limit, offset } = params

        let query = this.createQueryBuilder('libros').where("1 = 1")       
        
        if (tema) {                       
           query = query.andWhere("temaId = :tema").setParameter("tema", tema)
        } 

        if (idioma) {                        
            query = query.andWhere("idiomaId = :idioma").setParameter("idioma", idioma)
        } 

        if (editorial) {                        
            query = query.andWhere("editorialId = :editorial").setParameter("editorial", editorial)
        }      

        if (paginas_eq) {            
            query = query.andWhere("paginas = :paginas").setParameter("paginas", paginas_eq)
        }

        if (paginas_lt) {            
            query = query.andWhere("paginas < :paginas").setParameter("paginas", paginas_lt)            
        }

        if (paginas_lte) {            
            query = query.andWhere("paginas <= :paginas").setParameter("paginas", paginas_lte)
        }

        if (paginas_gt) {            
            query = query.andWhere("paginas > :paginas").setParameter("paginas", paginas_gt)
        }

        if (paginas_gte) {
            query = query.andWhere("paginas >= :paginas").setParameter("paginas", paginas_gte)
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
            let campo = sort + ''; // Se convierte a string el tipo any
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
            .leftJoinAndSelect("libros.editorial", "editorial")
            .select(["libros","tema.nombre", "tema.id"])
            .addSelect(["idioma.id", "idioma.nombre"])
            .addSelect(["editorial.id", "editorial.nombre"])
            .getMany()          
    }            

    obtenerLibro(id: number): Promise<Libro> {
        return this.findOne(id, { relations: ["tema", "idioma", "editorial"] })
    }

    registrarLibro(libro: Libro): Promise<Libro> {
        return this.save(libro)
    }

    async actualizarLibro(id: number, libro: Libro): Promise<Libro> {        
        let _libro = await this.findOne(id)
        this.merge(_libro, libro)       

        return this.save(_libro)
    }

    borrarLibro(libro: Libro): Promise<Libro> {
        return this.remove(libro)
    }
}