import { Url } from "@/commons/types/Url";
import Image from "next/image";
import { RiImageCircleLine } from "react-icons/ri";
import { TableConfig } from "../helpers/SerializationHelper";

// export const renameKeys: Record<keyof Url, string> = {
//   original_url: "Url",
//   url_type: "Type",
//   short_url: "Short Url",
//   expiration_date: "Expiry",
//   is_pre_generated: "Pergenerated?",
//   is_deleted: "",
//   url_id: "",
//   user_id: "",
//   logo_id: "",
//   tag_id: "",
//   created_at: "",
//   deleted_at: "",
//   updated_at: "",
//   status: "Status",
//   associated: "",
//   associated_at: "",
//   logo: "",
//   url_tag: "",
// };

// export const excludeKeys: (keyof Url)[] = [
//   "user_id",
//   "logo_id",
//   "tag_id",
//   "created_at",
//   "is_deleted",
//   "deleted_at",
//   "updated_at",
//   "associated_at",
//   "associated",
// ];

export const urlConfig: TableConfig<Url> = {
  url_id: {
    displayName: "URL ID",
    show: true,
    render: (row: Url) => row.url_id || "N/A",
  },

  original_url: {
    displayName: "Original URL",
    show: true,
    render: (row: Url) => row.original_url || "N/A",
  },

  short_url: {
    displayName: "Short URL",
    show: true,
    render: (row: Url) => row.short_url || "N/A",
  },

  url_type: {
    displayName: "Type",
    show: true,
    render: (row: Url) => row.url_type || "N/A",
  },

  expiration_date: {
    displayName: "Expiry",
    show: true,
    render: (row: Url) => {
      if (row.expiration_date) {
        const expirationDate =
          row.expiration_date instanceof Date
            ? row.expiration_date
            : new Date(row.expiration_date);

        return expirationDate.toDateString();
      }
      return "N/A";
    },
  },

  status: {
    displayName: "Status",
    show: true,
    render: (row: Url) => row.status || "N/A",
  },

  is_pre_generated: {
    displayName: "Pre-Generated",
    show: true,
    render: (row: Url) => (row.is_pre_generated ? "Yes" : "No"),
  },

  logo: {
    displayName: "Logo",
    show: true,
    render: (row: Url) =>
      row.logo ? (
        <Image
          src={row.logo.logo_path || "/default-logo.png"}
          alt="Brand"
          width={48}
          height={48}
        />
      ) : (
        <RiImageCircleLine size={48} />
      ),
  },

  url_tag: {
    displayName: "Tag",
    show: true,
    render: (row: Url) => (row.url_tag ? row.url_tag.tag_name || "N/A" : "N/A"),
  },
};
