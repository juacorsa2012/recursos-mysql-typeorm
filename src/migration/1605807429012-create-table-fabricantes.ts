import {MigrationInterface, QueryRunner, TableIndex, Table} from "typeorm";

export class createTableFabricantes1605807429012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "fabricantes",
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
                    type: "varchar(80)",                    
                    isUnique: true,
                    isNullable: false
                }
            ]
        }), true)

        await queryRunner.createIndex("temas", new TableIndex({
            name: "idx_fabricantes_nombre",
            columnNames: ["nombre"]
        }));   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("fabricantes")
    }
}