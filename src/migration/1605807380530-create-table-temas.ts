import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class createTableTemas1605807380530 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "temas",
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
            name: "idx_temas_nombre",
            columnNames: ["nombre"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("temas")
    }
}
