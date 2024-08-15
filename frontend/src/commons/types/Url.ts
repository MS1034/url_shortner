import { BrandLogo } from "./Logo";
import { Tag } from "./Tags";

export interface UrlsListProp {
  urls: Url[];
}

export type Url = {
  url_id: string;
  user_id: string | undefined;
  original_url: string;
  short_url: string;
  logo_id: number;
  tag_id: number;
  url_type: UrlTypeEnum;
  associated: Boolean;
  expiration_date: Date | undefined;
  status: UrlStatusEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  is_deleted: Boolean;
  is_pre_generated: Boolean;
  associated_at: Date | undefined;
  logo?: BrandLogo | null;
  url_tag?: Tag | null;
};

export enum UrlStatusEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum UrlTypeEnum {
  STORE = "Store",
  PRODUCT = "Product",
  MISC = "Misc",
}
