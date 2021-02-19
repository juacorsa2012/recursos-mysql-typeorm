import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class createTableEditoriales1605807421777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "editoriales",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: "nombre",
                    type: "varchar(40)",                    
                    isUnique: true,
                    isNullable: false
                }
            ]
        }), true)

        await queryRunner.createIndex("editoriales", new TableIndex({
            name: "idx_editoriales_nombre",
            columnNames: ["nombre"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("editoriales")
    }
}
