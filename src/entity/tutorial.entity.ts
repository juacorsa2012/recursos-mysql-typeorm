import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { MaxLength, IsNotEmpty, IsInt, Min } from "class-validator"
import Tema from "./tema.entity"
import Idioma from "./idioma.entity"
import Fabricante from "./fabricante.entity"
import * as Message from "../config/messages"

@Entity('tutoriales')
export default class Tutorial {
    @PrimaryColumn()
    id: number

    @Column()    
    @IsNotEmpty({message: Message.TITULO_REQUERIDO})  
    @MaxLength(255, {message: Message.TUTORIAL_TITULO_DEMASIADO_LARGO})
    titulo: string    

    @Column()
    @IsNotEmpty({message: Message.TUTORIAL_DURACION_REQUERIDA})    
    @IsInt({message: Message.DURACION_FORMATO_INCORRECTO})    
    @Min(1, {message: Message.DURACION_MINIMA})   
    duracion: number

    @Column()
    @IsNotEmpty({message: Message.PUBLICADO_REQUERIDO})       
    @IsInt({message: Message.PUBLICADO_FORMATO_INCORRECTO})    
    publicado: number    

    @Column()
    observaciones: string

    @ManyToOne(() => Tema, tema => tema.tutoriales)
    @IsNotEmpty({message: Message.TEMA_REQUERIDO})   
    tema: Tema

    @ManyToOne(() => Idioma, idioma => idioma.tutoriales)
    @IsNotEmpty({message: Message.IDIOMA_REQUERIDO})      
    idioma: Idioma

    @ManyToOne(() => Fabricante, fabricante => fabricante.tutoriales)
    @IsNotEmpty({message: Message.FABRICANTE_REQUERIDO})   
    fabricante: Fabricante
}
