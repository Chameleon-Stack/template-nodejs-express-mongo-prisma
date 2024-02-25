import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICardRepository } from '../repositories/ICardRepository';
import { IUserRepository } from '../../users/repositories/IUserRepository';

@injectable()
export class DeleteCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new LibError('The property id is required!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new LibError('The card does not exist', 404);
    }

    const user = await this.userRepository.findById(card.user_id);

    if (!user) {
      throw new LibError('The user does not exist', 404);
    }

    user.card_ids = user.card_ids?.filter(card_id => card_id !== card.id) || [];

    await this.userRepository.update(user);
    await this.cardRepository.delete(card);
  }
}
