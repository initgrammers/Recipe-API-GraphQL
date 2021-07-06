import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinTable
  } from "typeorm";
import { Category } from './Category';
import { User } from "./User";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({nullable: true})
  @Column()
  description!: string;

  @Field()
  @Column()
  ingredients!: string;

  @ManyToMany(() => Category)
  @JoinTable()
  @Field(() => [Category])
  categories!: Category[];

  @ManyToOne(() => User, (user: User) => user.recipes)
  @Field(() => User)
  user!: User;

}
