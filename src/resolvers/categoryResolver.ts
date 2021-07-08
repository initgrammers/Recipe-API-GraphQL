import { Query, Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { Service } from 'typedi';
import { Category } from '../entities';
import { CreateCategoryInput, UpdateCategoryInput } from '../models';
import { CategoryService } from '../services';
import { authContext } from '../utils/auth_context';
import { isAuth } from '../utils/isAuthenticated';

@Service()
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService,
) {}

  @Query(() => [Category], { nullable: true })
  @UseMiddleware(isAuth)
  async getCategories(): Promise<Category[]> {
    const getAll = await this.categoryService.getAll();
    return getAll;
  }

  @Query(() => Category, { nullable: true })
  @UseMiddleware(isAuth)
  async getOneCategory(@Arg('id') id: number): Promise<Category | undefined> {
    const getOne = await this.categoryService.getOne(id);
    return getOne;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg('CategoryInput') createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
      const createCategory = await this.categoryService.create(createCategoryInput);
      return createCategory;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: number,
    @Arg('CategoryInput') updateCategoryInput: UpdateCategoryInput
  ): Promise<Category> {
      const updateCategory = await this.categoryService.update(id, updateCategoryInput);
      return updateCategory
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id') id: number): Promise<boolean> {
    const deleteCategory = await this.categoryService.delete(id);
    return deleteCategory;
  }
}
