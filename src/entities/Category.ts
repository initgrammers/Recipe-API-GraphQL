import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from "typeorm";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;


}