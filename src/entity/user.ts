import { IsNotEmpty, Length } from "class-validator";
import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { Post } from "./post"

@Entity()
export class User {
    @PrimaryColumn()
    email: string;

    @Column({type: "varchar", nullable: false})
    @Length(4, 100)
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
    
}