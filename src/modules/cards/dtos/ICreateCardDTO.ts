export interface ICreateCardDTO {
  status: string;
  title: string;
  description: string;
  user_id: string;
  category_ids?: string[];
}
