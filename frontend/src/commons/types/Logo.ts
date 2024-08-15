export interface LogoListProp {
  urls: BrandLogo[];
}

export type BrandLogo = {
  logo_id: number;
  user_id: string | undefined;
  logo_path: string;
  expiration_date: Date | undefined;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  is_deleted: Boolean;
  file?: File;
  blurHash: string;
};
