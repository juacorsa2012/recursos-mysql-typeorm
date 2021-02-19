import { Entity, PrimaryColumn, Column, Index, ManyToOne } from "typeorm"
import { MaxLength, IsNotEmpty, IsInt, Min } from "class-validator"
import Tema from "./tema.entity"
import Idioma from "./idioma.entity"
import Editorial from "./editorial.entity"
import * as Message from "../config/messages"

@Entity('libros')
export default class Libro {
    @PrimaryColumn()
    id: number

    @Column()
    @Index()
    @IsNotEmpty({message: Message.TITULO_REQUERIDO})  
    @MaxLength(255, {message: Message.LIBRO_TITULO_DEMASIADO_LARGO})
    titulo: string    

    @Column()
    @IsNotEmpty({message: Message.PAGINAS_REQUERIDO})   
    @IsInt({message: Message.PAGINAS_FORMATO_INCORRECTO})    
    @Min(1, {message: Message.PAGINAS_MINIMO})
    paginas: number    

    @Column()
    @IsNotEmpty({message: Message.PUBLICADO_REQUERIDO})       
    @IsInt({message: Message.PUBLICADO_FORMATO_INCORRECTO})    
    publicado: number    

    @Column()
    observaciones: string

    @ManyToOne(() => Tema, tema => tema.libros)
    @IsNotEmpty({message: Message.TEMA_REQUERIDO})   
    tema: Tema

    @ManyToOne(() => Idioma, idioma => idioma.libros)
    @IsNotEmpty({message: Message.IDIOMA_REQUERIDO})      
    idioma: Idioma

    @ManyToOne(() => Editorial, editorial => editorial.libros)
    @IsNotEmpty({message: Message.EDITORIAL_REQUERIDA})   
    editorial: Editorial
}
