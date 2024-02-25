import { genSaltSync, hashSync } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../dtos/IUser';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    photo,
  }: ICreateUserDTO): Promise<IUser | undefined> {
    if (!name || !email || !password) {
      throw new LibError('Missins params!');
    }

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new LibError('User already exists!');
    }

    if (photo) {
      fs.rmdirSync(path.join(__dirname, `../../../../uploads/${photo}`));
    }

    const salt = genSaltSync(8);
    const hash = hashSync(password, salt);

    const user = (await this.userRepository.create({
      name,
      email,
      password: hash,
      photo,
    })) as IUser;

    return { ...user, password: '' };
  }
}
