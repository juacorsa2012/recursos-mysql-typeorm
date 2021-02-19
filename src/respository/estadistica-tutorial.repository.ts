import { EntityRepository, Repository } from "typeorm";
import Tutorial from "../entity/tutorial.entity";

@EntityRepository(Tutorial)
export default class EstadisticaTutorialRepository extends Repository<Tutorial> {
    obtenerDuracion(): Promise<any> {        
        const sql = "SELECT SUM(duracion) as duracion FROM tutoriales";

        return this.manager.query(sql);
    }

    obtenerTutoriales(): Promise<number> {        
        const sql = "SELECT COUNT(*) as tutoriales FROM tutoriales"

        return this.manager.query(sql)
    }

    obtenerTutorialesPorTema(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS tutoriales, SUM(duracion) AS duracion, t.nombre
            FROM tutoriales tut INNER JOIN temas t
            WHERE tut.temaId = t.id
            GROUP BY tut.temaId
            ORDER BY tutoriales DESC`
        
        return this.manager.query(sql)                            
    }

    obtenerTutorialesPorIdioma(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS tutoriales, SUM(duracion) AS duracion, i.nombre
            FROM tutoriales t INNER JOIN idiomas i
            WHERE t.temaId = i.id
            GROUP BY t.temaId
            ORDER BY tutoriales DESC`
        
        return this.manager.query(sql)                            
    }

    obtenerTutorialesPorFabricante(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS tutoriales, SUM(duracion) AS duracion, f.nombre
            FROM tutoriales t INNER JOIN fabricantes f
            WHERE t.temaId = f.id
            GROUP BY t.temaId
            ORDER BY tutoriales DESC`
        
        return this.manager.query(sql)                            
    }

    obtenerTutorialesDuracionPorAñoPublicado(): Promise<any> {
        const sql = `
            SELECT COUNT(*) AS tutoriales, SUM(duracion) AS duracion, publicado
            FROM tutoriales
            GROUP BY publicado`
                
        return this.manager.query(sql)                            
    }    
}