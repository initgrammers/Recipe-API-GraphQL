
import { Field, InputType } from 'type-graphql';
import { Recipe } from '../entities';


@InputType()
export class CreateRecipeInput implements Partial<Recipe> {

  @Field()
  name!: string;

  @Field({nullable: true})
  description!: string;

  @Field()
  ingredients!: string;

}

@InputType()
export class UpdateRecipeInput implements Partial<Recipe> {
   @Field()
   name!: string;
  
   @Field({nullable: true})
   description!: string;
   
   @Field()
   ingredients!: string;



}
