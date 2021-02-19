import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey} from "typeorm";

export class createTableLibros1605807810359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "libros",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: "titulo",
                    type: "varchar(255)",
                    isNullable: false
                },
                {
                    name: "paginas",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "publicado",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "temaId",
                    type: "int"
                },
                {
                    name: "idiomaId",
                    type: "int"
                },
                {
                    name: "editorialId",
                    type: "int"
                },
                {
                    name: "observaciones",
                    type: "text",
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), false)     
        
        await queryRunner.createForeignKey("libros", new TableForeignKey({
            columnNames: ["temaId"],
            referencedColumnNames: ["id"],
            referencedTableName: "temas"            
        }));

        await queryRunner.createForeignKey("libros", new TableForeignKey({
            columnNames: ["idiomaId"],
            referencedColumnNames: ["id"],
            referencedTableName: "idiomas"            
        }));

        await queryRunner.createForeignKey("libros", new TableForeignKey({
            columnNames: ["editorialId"],
            referencedColumnNames: ["id"],
            referencedTableName: "editoriales"            
        }));

        await queryRunner.createIndex("libros", new TableIndex({
            name: "idx_libros_titulo",
            columnNames: ["titulo"]
        }));

        await queryRunner.createIndex("libros", new TableIndex({
            name: "idx_libros_paginas",
            columnNames: ["paginas"]
        }));

        await queryRunner.createIndex("libros", new TableIndex({
            name: "idx_libros_publicado",
            columnNames: ["publicado"]
        }));     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("libros");        
        const fk_tema = table.foreignKeys.find(fk => fk.columnNames.indexOf("temaId") !== -1);
        const fk_idioma = table.foreignKeys.find(fk => fk.columnNames.indexOf("idiomaId") !== -1);
        const fk_editorial = table.foreignKeys.find(fk => fk.columnNames.indexOf("editorialId") !== -1);
        await queryRunner.dropForeignKey("libros", fk_tema);        
        await queryRunner.dropForeignKey("libros", fk_idioma);        
        await queryRunner.dropForeignKey("libros", fk_editorial);        
        await queryRunner.dropIndex("libros", "idx_libros_titulo");
        await queryRunner.dropIndex("libros", "idx_libros_paginas");
        await queryRunner.dropIndex("libros", "idx_libros_publicado");
        await queryRunner.dropTable("libros")
    }
}
