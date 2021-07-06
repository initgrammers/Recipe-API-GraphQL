import { Service } from 'typedi';
import { Category } from '../entities';
import { CreateCategoryInput, UpdateCategoryInput } from '../models/';

@Service()
export class CategoryService {
  getAll = async (): Promise<Category[]> => {
    const allCategories = await Category.find();
    return allCategories;
  };

  getOne = async(id: number): Promise<Category | undefined> => {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }
    return category;
  };

  create = async (createCategoryInput: CreateCategoryInput): Promise<Category> => {
    const categoryCreated = await Category.create(createCategoryInput).save();
    return categoryCreated;
  };

  update = async (
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> => {
    const categoryFound = await Category.findOne({ where: { id } });
    if (!categoryFound) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }

    Object.assign(categoryFound, updateCategoryInput);
    const updatedCategory = await categoryFound.save();
    return updatedCategory;
  };

  delete = async (id: number): Promise<boolean> => {
    const categoryFound = await Category.findOne({ where: { id } });

    if (!categoryFound) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }

    await categoryFound.remove();
    return true;
  };
}