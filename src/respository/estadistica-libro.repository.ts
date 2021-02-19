import { EntityRepository, Repository } from "typeorm";
import Libro from "../entity/libro.entity";

@EntityRepository(Libro)
export default class EstadisticaLibroRepository extends Repository<Libro> {
    obtenerPaginas(): Promise<any> {        
        const sql = "SELECT SUM(paginas) as paginas FROM libros";

        return this.manager.query(sql);
    }

    obtenerLibros(): Promise<number> {        
        const sql = "SELECT COUNT(*) as libros FROM libros"

        return this.manager.query(sql)
    }

    obtenerLibrosPaginasPorTema(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS libros, SUM(paginas) AS paginas, t.nombre
            FROM libros l INNER JOIN temas t
            WHERE l.temaId = t.id
            GROUP BY l.temaId
            ORDER BY libros DESC`
        
        return this.manager.query(sql)                            
    }

    obtenerLibrosPaginasPorAñoPublicado(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS libros, SUM(paginas) AS paginas, publicado
            FROM libros 
            GROUP BY publicado`
                
        return this.manager.query(sql)                            
    }    

    obtenerLibrosPaginasPorIdioma(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS libros, SUM(paginas) AS paginas, i.nombre
            FROM libros l INNER JOIN idiomas i
            WHERE l.idiomaId = i.id
            GROUP BY l.temaId
            ORDER BY libros DESC`
                
        return this.manager.query(sql)                            
    }

    obtenerLibrosPaginasPorEditorial(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS libros, SUM(paginas) AS paginas, e.nombre
            FROM libros l INNER JOIN editoriales e
            WHERE l.editorialId = e.id
            GROUP BY l.temaId
            ORDER BY libros DESC`
                
        return this.manager.query(sql)                            
    }
}