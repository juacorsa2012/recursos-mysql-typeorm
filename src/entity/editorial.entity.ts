import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { IsNotEmpty, MaxLength, IsString } from "class-validator"
import * as Message from "../config/messages"
import Libro from "./libro.entity"

@Entity('editoriales')
export default class Editorial {
    constructor(nombre: string) {
        this.nombre = nombre
    }

    @PrimaryColumn()
    id: number

    @Column()
    @IsString({message: Message.NOMBRE_TEXTO})
    @IsNotEmpty({message: Message.NOMBRE_OBLIGATORIO})
    @MaxLength(80, {message: Message.NOMBRE_DEMASIADO_LARGO})        
    nombre: string

    @OneToMany(() => Libro, libro => libro.editorial)
    libros: Libro[]
}
