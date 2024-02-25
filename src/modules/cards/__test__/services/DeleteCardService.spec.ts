import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../../users/repositories/inMemory/UserRepositoryInMemory';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { DeleteCardService } from '../../services/DeleteCardService';

describe('Delete card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let userRepositoryInMemory: IUserRepository;
  let deleteCardUseCase: DeleteCardService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteCardUseCase = new DeleteCardService(
      cardRepositoryInMemory,
      userRepositoryInMemory,
    );
  });

  it('should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    await deleteCardUseCase.execute(cardCreated.id);
  });

  it('should not be able to delete card does not exists', async () => {
    await expect(deleteCardUseCase.execute(uuidv4())).rejects.toEqual(
      new LibError('The card does not exist', 404),
    );
  });

  it('should not be able to delete card without property id', async () => {
    await expect(deleteCardUseCase.execute(undefined as any)).rejects.toEqual(
      new LibError('The property id is required!', 400),
    );
  });
});
