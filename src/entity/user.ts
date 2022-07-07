import { IsNotEmpty, Length } from "class-validator";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from "typeorm";
import { Post } from "./post";
import bcrypt from "bcryptjs";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false, unique: true})
    @Length(5, 100)
    email: string;

    @Column({type: "varchar", nullable: false})
    @Length(5, 100)
    password: string;

    @Column({type: "varchar", length: "30"})
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Post, (post) => post.user) 
    posts: Post[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
    
}