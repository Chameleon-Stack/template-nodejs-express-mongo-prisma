import { ICategory } from '../../categories/dtos/ICategory';
import { IUser } from '../../users/dtos/IUser';

export interface ICard {
  id: string;
  status: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  categories?: ICategory[];
  category_ids?: string[];
  user?: IUser;
}
