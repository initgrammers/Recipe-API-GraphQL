
import { Field, InputType } from 'type-graphql';
import { User } from '../entities';

@InputType()
export class CreateUserInput implements Partial<User> {
    @Field({ nullable: true })
    name!: string;
  
    @Field()
    email!: string;
  
    @Field()
    password!: string;

}

@InputType()
export class UpdateUserInput implements Partial<User> {
    @Field({ nullable: true })
    name!: string;
  
    @Field()
    email!: string;
  
    @Field()
    password!: string;
}

@InputType()
export class LoginUserInput implements Partial<User> {
  
    @Field()
    email!: string;
  
    @Field()
    password!: string;

}