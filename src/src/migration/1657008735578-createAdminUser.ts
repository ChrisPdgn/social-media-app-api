import { MigrationInterface, QueryRunner } from "typeorm"


export class createAdminUser1657008735578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // let user = new User();
        // user.id = 1;
        // user.email = "chris@test.gr"
        // user.password = "admin";
        // user.hashPassword();
        // user.role = "ADMIN";
        // const userRepository = AppDataSource.getRepository(User);
        // await userRepository.save(user);
        await queryRunner.query(`INSERT INTO TABLE user (id, email, password, role) VALUES (1, "chris@test.gr", "12345", "ADMIN")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
