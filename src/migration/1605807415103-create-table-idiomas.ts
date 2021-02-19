import {MigrationInterface, QueryRunner, TableIndex, Table} from "typeorm";

export class createTableIdiomas1605807415103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "idiomas",
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

        await queryRunner.createIndex("idiomas", new TableIndex({
            name: "idx_idiomas_nombre",
            columnNames: ["nombre"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("idiomas")
    }
}
