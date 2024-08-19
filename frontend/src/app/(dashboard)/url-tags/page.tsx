"use client";

import Entity from "@/commons/Enums/Entity";
import transformData from "@/commons/helpers/SerializationHelper";
import ParamsChange from "@/commons/interfaces/ParamsChange";
import { tagConfig } from "@/commons/Serialization Objects/tag.serialization";
import { Tag } from "@/commons/types/Tags";
import DataTable from "@/components/Tables/DataTable";
import SkeletonLoader from "@/components/Tables/SekeltonLoader";
import withAuth from "@/components/WithAuth";
import { setPage, setPageSize } from "@/redux/Features/slices/paramsSlice";
import { setEditMode } from "@/redux/Features/slices/tagSlice";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import {
  useCreateTagMutation,
  useFetchTagsQuery,
  useSoftDeleteTagMutation,
  useUpdateTagMutation,
} from "@/services/url-tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const tagSchema = z.object({
  tag_name: z
    .string()
    .min(5, { message: "Tag must be at least 5 characters long" })
    .max(50, { message: "Tag must be at most 50 characters long" }), // Optional: Add length constraints
});

const UrlTagsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useSelector((state: RootState) => state.params);

  type TagFormData = z.infer<typeof tagSchema> & {
    tag_name?: string;
    tag_id?: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
  });

  const editMode = useSelector((state: RootState) => state.tag.editMode);

  const [softDeleteTag] = useSoftDeleteTagMutation();
  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTagMutation();

  const onSubmit = async (data: TagFormData) => {
    try {
      if (editMode?.id) {
        data = { ...data, tag_id: editMode.id };
        const res = await updateTag(data).unwrap();

        // dispatch(
        //   settags(
        //     logos.map((logo) =>
        //       logo.logo_id === editMode.id ? res.result : logo
        //     )
        //   )
        // );
        toast.success("Tag updated successfully");
      } else {
        const res = await createTag(data).unwrap();
        toast.success("Tag created successfully");
      }
      reset();
      dispatch(setEditMode(null));
    } catch (err) {
      console.error("Failed to save tag:", err);
      toast.error("Failed to save tag");
    }
  };

  const { data, error, isLoading } = useFetchTagsQuery(params);

  const renameKeys: Record<keyof Tag, string> = {
    is_deleted: "Deleted?",
    tag_name: "",
    user_id: "",
    tag_id: "",
    created_at: "",
    deleted_at: "",
    updated_at: "",
  };

  const excludeKeys: (keyof Tag)[] = [
    "user_id",
    "created_at",
    "deleted_at",
    "updated_at",
    "is_deleted",
  ];

  const handleParamsChange = ({ page, pageSize }: ParamsChange) => {
    const total = data?.result?.meta.total;
    if (total) {
      page = Math.min(pageSize || 0, Math.ceil(total / (pageSize || 1)));
      if (page !== undefined) dispatch(setPage(page));
      if (pageSize !== undefined) dispatch(setPageSize(pageSize));
    }
  };

  const transformedData = data?.result?.data
    ? transformData(data.result.data, renameKeys, excludeKeys)
    : [];

  const renderFormFields = () => {
    return (
      <div className="mb-4.5">
        <div className="mb-4.5">
          <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
            Tag Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            {...register("tag_name", { required: "tag name is required." })}
            placeholder="Enter name"
            min={5}
            max={50}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-slate-500 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        {errors.tag_name && (
          <span className="flex items-center font-medium tracking-wide text-meta-1 text-xs mt-1 ml-1">
            {errors.tag_name.message}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-9 mb-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            {renderFormFields()}
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {isSubmitting ? "Saving..." : editMode?.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="text-red-500">Failed to load URLs. Please try again.</p>
      ) : (
        <DataTable
          isError={error ? true : false}
          isLoading={isLoading}
          data={transformedData}
          meta={data.result.meta}
          config={tagConfig}
          handleParamsChange={handleParamsChange}
          primaryKey="tag_id"
          onEdit={async (tag: Tag) => {
            dispatch(setEditMode({ id: tag.tag_id.toString() }));
            setValue("tag_name", tag.tag_name);
          }}
          onDelete={async (id: string) => {
            try {
              if (confirm("Are you sure you want to delete?")) {
                const res = await softDeleteTag(id).unwrap();

                toast.success("Tag deleted successfully");
              }
            } catch (err) {
              if (err && typeof err === "object" && "status" in err) {
                const error = err as {
                  status: number;
                  data?: { message?: string };
                };
                const status = error.status;
                const message = error.data?.message || "An error occurred";
                if (status === 404) {
                  toast.error("Tag not found");
                } else if (status === 403) {
                  toast.error("You are not authorized to delete this tag");
                } else {
                  toast.error(message);
                }
              } else {
                toast.error("Failed to delete tag");
              }
              console.error("Failed to delete tag:", err);
            }
          }}
          entity={Entity.tag}
        />
      )}
    </div>
  );
};

export default withAuth(UrlTagsPage, true, ["admin", "user"]);
