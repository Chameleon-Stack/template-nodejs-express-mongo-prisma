export interface IGetAllCardsDTO {
  user_id: string;
  status?: string;
  title?: string;
  description?: string;
  id?: string;
  category_ids?: string[];
}
