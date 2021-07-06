import { Field, ID, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
  } from "typeorm";
import { Recipe } from './Recipe';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: true })
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @OneToMany( () => Recipe, (recipe: Recipe) => recipe.user) 
  @Field(()=>[Recipe])
  recipes!: Recipe[];
}
