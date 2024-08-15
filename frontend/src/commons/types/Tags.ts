export interface TagsListProp {
  urls: Tag[];
}

export type Tag = {
  tag_name: string;
  user_id: string | undefined;
  tag_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  is_deleted: Boolean;
};
