import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey} from "typeorm";

export class createTableTutoriales1605809250766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tutoriales",
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
                    name: "duracion",
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
                    name: "fabricanteId",
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
        
        await queryRunner.createForeignKey("tutoriales", new TableForeignKey({
            columnNames: ["temaId"],
            referencedColumnNames: ["id"],
            referencedTableName: "temas"            
        }));

        await queryRunner.createForeignKey("tutoriales", new TableForeignKey({
            columnNames: ["idiomaId"],
            referencedColumnNames: ["id"],
            referencedTableName: "idiomas"            
        }));

        await queryRunner.createForeignKey("tutoriales", new TableForeignKey({
            columnNames: ["fabricanteId"],
            referencedColumnNames: ["id"],
            referencedTableName: "fabricantes"            
        }));
        
        await queryRunner.createIndex("tutoriales", new TableIndex({
            name: "idx_tutoriales_titulo",
            columnNames: ["titulo"]
        }));

        await queryRunner.createIndex("tutoriales", new TableIndex({
            name: "idx_tutoriales_duracion",
            columnNames: ["duracion"]
        }));

        await queryRunner.createIndex("tutoriales", new TableIndex({
            name: "idx_tutoriales_publicado",
            columnNames: ["publicado"]
        }));   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tutoriales");        
        const fk_tema = table.foreignKeys.find(fk => fk.columnNames.indexOf("temaId") !== -1);
        const fk_idioma = table.foreignKeys.find(fk => fk.columnNames.indexOf("idiomaId") !== -1);
        const fk_fabricante = table.foreignKeys.find(fk => fk.columnNames.indexOf("fabricanteId") !== -1);
        await queryRunner.dropForeignKey("tutoriales", fk_tema);        
        await queryRunner.dropForeignKey("tutoriales", fk_idioma);        
        await queryRunner.dropForeignKey("tutoriales", fk_fabricante);
        await queryRunner.dropIndex("tutoriales", "idx_tutoriales_titulo");
        await queryRunner.dropIndex("tutoriales", "idx_tutoriales_duracion");
        await queryRunner.dropIndex("tutoriales", "idx_tutoriales_publicado");
        await queryRunner.dropTable("tutoriales");
    }
}
