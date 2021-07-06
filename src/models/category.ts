
import { Field, InputType } from 'type-graphql';
import { Category } from '../entities';

@InputType()
export class CreateCategoryInput implements Partial<Category> {
    @Field()
    name!: string;
}

@InputType()
export class UpdateCategoryInput implements Partial<Category> {
    @Field()
    name!: string;
  
}