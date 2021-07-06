import { Service } from 'typedi';
import { Recipe } from '../entities';
import { CreateRecipeInput, UpdateRecipeInput } from '../models';

@Service()
export class RecipeService {
  getAll = async (): Promise<Recipe[]> => {
    const allRecipes = await Recipe.find();
    return allRecipes;
  };

  getOne = async(id: number): Promise<Recipe | undefined> => {
    const recipe = await Recipe.findOne({ where: { id } });
    if (!recipe) {
      throw new Error(`The recipe with id: ${id} does not exist!`);
    }
    return recipe;
  };

  getOneByName = async(name: string): Promise<Recipe | undefined> => {
    const recipe = await Recipe.findOne({ where: { name } });
    if (!recipe) {
      throw new Error(`The recipe with name: ${name} does not exist!`);
    }
    return recipe;
  };

  getOneByIngredient = async(ingredient: string): Promise<Recipe | undefined> => {
    const recipe = await Recipe.findOne({ where: { ingredient } });
    if (!recipe) {
      throw new Error(`The recipe with ingredient: ${ingredient} does not exist!`);
    }
    return recipe;
  };

  getAllByUserId = async(userId: number): Promise<Recipe[]> => {
    const recipes = await Recipe.find({  where: { userId },
      order: {
        id: "DESC",
      }});
    
    return recipes;
  };


  create = async (createRecipeInput: CreateRecipeInput): Promise<Recipe> => {
    const recipeCreated = await Recipe.create(createRecipeInput).save();
    return recipeCreated;
  };

  update = async (
    id: number,
    updateRecipeInput: UpdateRecipeInput,
  ): Promise<Recipe> => {
    const recipeFound = await Recipe.findOne({ where: { id } });
    if (!recipeFound) {
      throw new Error(`The recipe with id: ${id} does not exist!`);
    }

    Object.assign(recipeFound, updateRecipeInput);
    const updatedRecipe = await recipeFound.save();
    return updatedRecipe;
  };

  delete = async (id: number): Promise<boolean> => {
    const recipeFound = await Recipe.findOne({ where: { id } });

    if (!recipeFound) {
      throw new Error(`The recipe with id: ${id} does not exist!`);
    }

    await recipeFound.remove();
    return true;
  };
}