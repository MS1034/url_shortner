import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UrlStatusEnum, UrlTypeEnum } from "@/commons/types/Url";
import DropdownSelect from "@/components/Dropdown/DropDownSelect";
import DatePicker from "@/components/DatePicker/DatePicker";
import {
  createUrlSchema,
  pregenerateUrlSchema,
} from "@/commons/Schemas/url.schema";
import { Tag } from "@/commons/types/Tags";
import { useFetchTagsQuery } from "@/services/url-tags";
import enumToArray from "@/commons/helpers/EnumHelper";
import { RiImageCircleLine } from "react-icons/ri";
import { BrandLogo } from "@/commons/types/Logo";

type UrlFormProps = {
  selectedTab: string;
  onCreateUrl: (data: z.infer<typeof createUrlSchema>) => Promise<boolean>;
  onPregenerateUrl: (
    data: z.infer<typeof pregenerateUrlSchema>
  ) => Promise<boolean>;
  preview: {
    logo_id: number;
    logo_path: string;
  } | null;
  setPreview: (preview: BrandLogo | null) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isEditing: boolean;
  editingUrl: z.infer<typeof createUrlSchema> | null;
  onCancelEdit: () => void;
};

const UrlForm = ({
  selectedTab,
  onCreateUrl,
  onPregenerateUrl,
  preview,
  setPreview,
  isModalOpen,
  isEditing,
  editingUrl,
  setModalOpen,
}: UrlFormProps) => {
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    setValue: setValueCreate,
    formState: { errors: errorsCreate },
    control: controlCreate,
    reset: resetCreate,
  } = useForm<z.infer<typeof createUrlSchema>>({
    resolver: zodResolver(createUrlSchema),
  });

  const {
    register: registerPregenerate,
    handleSubmit: handleSubmitPregenerate,
    formState: { errors: errorsPregenerate },
    control: controlPregenerate,
    reset: resetPregenerate,
  } = useForm<z.infer<typeof pregenerateUrlSchema>>({
    resolver: zodResolver(pregenerateUrlSchema),
  });
  useEffect(() => {
    if (isEditing && editingUrl) {
      console.log("Editing URL data:", editingUrl); // Debug the data
      resetCreate(editingUrl);
    }
  }, [isEditing, editingUrl, resetCreate]);

  useEffect(() => {
    if (selectedTab === "pregenerate") {
      resetCreate(); // Reset create form
    } else {
      resetPregenerate(); // Reset pregenerate form
    }
  }, [selectedTab]);

  const tagsRes = useFetchTagsQuery({});

  const handleCreateUrlSubmit = async (
    formData: z.infer<typeof createUrlSchema>
  ) => {
    const isSubmitted = await onCreateUrl(formData);
    // alert(isSubmitted);
    if (isSubmitted) resetCreate();
  };

  const handlePregenerateUrlSubmit = async (
    formData: z.infer<typeof pregenerateUrlSchema>
  ) => {
    const isSubmitted = await onPregenerateUrl(formData);
    if (isSubmitted) resetPregenerate();
  };

  const renderFormFieldsCreate = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
          Original URL <span className="text-meta-1">*</span>
        </label>
        <input
          {...registerCreate("original_url")}
          type="text"
          placeholder="URL"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-slate-500 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {errorsCreate.original_url && (
          <p className="text-meta-1 text-sm mt-1">
            {errorsCreate.original_url.message}
          </p>
        )}
      </div>

      {selectedTab === "advance" && (
        <>
          <div>
            <Controller
              name="tag_id"
              control={controlCreate}
              render={({ field }) => (
                <DropdownSelect
                  label="Select Tag"
                  options={tagsRes.data?.result.map((tag: Tag) => ({
                    id: tag.tag_id,
                    value: tag.tag_name,
                  }))}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errorsCreate.tag_id && (
              <p className="text-meta-1 text-sm mt-1">
                {errorsCreate.tag_id.message}
              </p>
            )}
          </div>

          <div className="flex items-end space-x-4">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
                Brand Logo
              </label>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex max-w-64 items-center justify-center rounded-md gap-2.5 border-primary px-4 py-2 text-center font-medium text-primary border hover:bg-opacity-90 lg:px-8 xl:px-10 w-full"
              >
                <span>
                  <RiImageCircleLine size={20} />
                </span>
                Select logo
              </button>
            </div>
            {preview && (
              <img
                src={preview.logo_path}
                alt="Preview"
                className="w-16 h-16 object-cover border border-gray-300 rounded"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="status"
              control={controlCreate}
              render={({ field }) => (
                <DropdownSelect
                  label="Select Status"
                  options={enumToArray(UrlStatusEnum)}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errorsCreate.status && (
              <p className="text-meta-1 text-sm mt-1">
                {errorsCreate.status.message}
              </p>
            )}
            <Controller
              name="url_type"
              control={controlCreate}
              render={({ field }) => (
                <DropdownSelect
                  label="Select Type"
                  options={enumToArray(UrlTypeEnum)}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errorsCreate.url_type && (
              <p className="text-meta-1 text-sm mt-1">
                {errorsCreate.url_type.message}
              </p>
            )}
          </div>

          <Controller
            name="expiration_date"
            control={controlCreate}
            render={({ field }) => (
              <DatePicker
                label="Select Expiry"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errorsCreate.expiration_date && (
            <p className="text-meta-1 text-sm mt-1">
              {errorsCreate.expiration_date.message}
            </p>
          )}
        </>
      )}
    </div>
  );

  const renderFormFieldsPregenerate = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4.5">
      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
          Number of URLs <span className="text-meta-1">*</span>
        </label>
        <input
          {...registerPregenerate("quantity")}
          min={1}
          max={10}
          type="number"
          placeholder="Number of URLs"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-slate-500 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {errorsPregenerate.quantity && (
          <p className="text-meta-1 text-sm mt-1">
            {errorsPregenerate.quantity.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="tag_id"
          control={controlPregenerate}
          render={({ field }) => (
            <DropdownSelect
              label="Select Tag"
              options={tagsRes.data?.result.map((tag: Tag) => ({
                id: tag.tag_id,
                value: tag.tag_name,
              }))}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errorsPregenerate.tag_id && (
          <p className="text-meta-1 text-sm mt-1">
            {errorsPregenerate.tag_id.message}
          </p>
        )}
      </div>

      <div className="flex items-end space-x-4">
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
            Brand Logo
          </label>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex max-w-64 items-center justify-center rounded-md gap-2.5 border-primary px-4 py-2 text-center font-medium text-primary border hover:bg-opacity-90 lg:px-8 xl:px-10 w-full"
          >
            <span>
              <RiImageCircleLine size={20} />
            </span>
            Select logo
          </button>
        </div>
        {preview && (
          <img
            src={preview.logo_path}
            alt="Preview"
            className="w-16 h-16 object-cover border border-gray-300 rounded"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="status"
          control={controlPregenerate}
          render={({ field }) => (
            <DropdownSelect
              label="Select Status"
              options={enumToArray(UrlStatusEnum)}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errorsPregenerate.status && (
          <p className="text-meta-1 text-sm mt-1">
            {errorsPregenerate.status.message}
          </p>
        )}
        <Controller
          name="url_type"
          control={controlPregenerate}
          render={({ field }) => (
            <DropdownSelect
              label="Select Type"
              options={enumToArray(UrlTypeEnum)}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errorsPregenerate.url_type && (
          <p className="text-meta-1 text-sm mt-1">
            {errorsPregenerate.url_type.message}
          </p>
        )}
      </div>

      <Controller
        name="expiration_date"
        control={controlPregenerate}
        render={({ field }) => (
          <DatePicker
            label="Select Expiry"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {errorsPregenerate.expiration_date && (
        <p className="text-meta-1 text-sm mt-1">
          {errorsPregenerate.expiration_date.message}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={
        selectedTab === "pregenerate"
          ? handleSubmitPregenerate(handlePregenerateUrlSubmit)
          : handleSubmitCreate(handleCreateUrlSubmit)
      }
    >
      <div className="p-6.5">
        {selectedTab === "pregenerate"
          ? renderFormFieldsPregenerate()
          : renderFormFieldsCreate()}
        <button
          type="submit"
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 max-w-xs"
        >
          {selectedTab === "pregenerate" ? "Pre-generate" : "Shorten"}
        </button>
      </div>
    </form>
  );
};

export default UrlForm;
