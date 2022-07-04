import { Entity, 
        Column, 
        PrimaryGeneratedColumn, 
        ManyToOne,
        UpdateDateColumn,
        OneToMany } from "typeorm"
import { Comment } from "./comment";
import { User } from "./user"

@Entity()
export class Post {
    
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    content: string;

    @Column()
    @UpdateDateColumn()
    date: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post) 
    comments: Comment[];
}