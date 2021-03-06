import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { IsNotEmpty, MaxLength, IsString } from "class-validator"
import * as Message from "../config/messages"
import Tutorial from "./tutorial.entity"

@Entity('fabricantes')
export default class Fabricante {     
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
    
    @OneToMany(() => Tutorial, tutorial => tutorial.fabricante)
    tutoriales: Tutorial[]    
}
