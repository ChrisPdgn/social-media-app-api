import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    UpdateDateColumn } from "typeorm"
import { Post } from "./post"
import { User } from "./user";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    content: string;

    @Column()
    @UpdateDateColumn()
    date: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

}