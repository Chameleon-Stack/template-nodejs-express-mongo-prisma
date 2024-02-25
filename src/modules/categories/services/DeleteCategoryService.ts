import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new LibError('The property id is required!');
    }

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new LibError('The category does not exist', 404);
    }

    const user = await this.userRepository.findById(category.user_id);

    if (user) {
      user.category_ids =
        user?.category_ids?.filter(categoryId => categoryId !== category.id) ||
        [];

      await this.userRepository.update(user);
    }

    await this.categoryRepository.delete(category);
  }
}
