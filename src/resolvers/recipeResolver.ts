import { Query, Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { Service } from 'typedi';
import { Recipe } from '../entities';
import { CreateRecipeInput, UpdateRecipeInput } from '../models';
import { RecipeService } from '../services';
import { isAuth } from '../utils/isAuthenticated';

@Service()
@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [Recipe], { nullable: true })
  @UseMiddleware(isAuth)
  async getRecipes(): Promise<Recipe[]> {
    const getAll = await this.recipeService.getAll();
    return getAll;
  }

  @Query(() => Recipe, { nullable: true })
  @UseMiddleware(isAuth)
  async getOneRecipe(@Arg('id') id: number): Promise<Recipe | undefined> {
    const getOne = await this.recipeService.getOne(id);
    return getOne;
  }

  @Query(() => Recipe, { nullable: true })
  @UseMiddleware(isAuth)
  async getOneRecipeByName(@Arg('name') name: string): Promise<Recipe | undefined> {
    const getOne = await this.recipeService.getOneByName(name);
    return getOne;
  }

  @Query(() => Recipe, { nullable: true })
  @UseMiddleware(isAuth)
  async getOneRecipeByIngredient(@Arg('ingredient') ingredient: string): Promise<Recipe | undefined> {
    const getOne = await this.recipeService.getOneByIngredient(ingredient);
    return getOne;
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg('RecipeInput') createRecipeInput: CreateRecipeInput
  ): Promise<Recipe> {
    const createRecipe = await this.recipeService.create(createRecipeInput);
    return createRecipe;
  }

  @Query(() => Recipe, { nullable: true })
  @UseMiddleware(isAuth)
  async getMyRecipes(@Arg('userId') userId: number): Promise<Recipe[]> {
    const getAll = await this.recipeService.getAllByUserId(userId);
    return getAll;
  }


  @Mutation(() => Recipe)
  async updateRecipe(
    @Arg('id') id: number,
    @Arg('RecipeInput') updateRecipeInput: UpdateRecipeInput
  ): Promise<Recipe> {
      const updateRecipe = await this.recipeService.update(id, updateRecipeInput);
      return updateRecipe
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Arg('id') id: number): Promise<boolean> {
    const deleteRecipe = await this.recipeService.delete(id);
    return deleteRecipe;
  }
}