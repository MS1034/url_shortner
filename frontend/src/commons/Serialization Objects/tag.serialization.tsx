import { TableConfig } from "../helpers/SerializationHelper";
import { Tag } from "../types/Tags";
import { RiImageCircleLine } from "react-icons/ri";
import Image from "next/image";

export const tagConfig: TableConfig<Tag> = {
  tag_id: {
    displayName: "Tag ID",
    show: false,
    render: (row: Tag) => row.tag_id || "N/A",
  },

  tag_name: {
    displayName: "Tag Name",
    show: true,
    render: (row: Tag) => row.tag_name || "N/A",
  },

  user_id: {
    displayName: "User ID",
    show: false,
    render: (row: Tag) => row.user_id || "N/A",
  },

  created_at: {
    displayName: "Created At",
    show: false,
    render: (row: Tag) =>
      row.created_at ? row.created_at.toDateString() : "N/A",
  },

  updated_at: {
    displayName: "Updated At",
    show: false,
    render: (row: Tag) =>
      row.updated_at ? row.updated_at.toDateString() : "N/A",
  },

  deleted_at: {
    displayName: "Deleted At",
    show: false,
    render: (row: Tag) =>
      row.deleted_at ? row.deleted_at.toDateString() : "N/A",
  },

  is_deleted: {
    displayName: "Deleted?",
    show: false,
    render: (row: Tag) => (row.is_deleted ? "Yes" : "No"),
  },
};
