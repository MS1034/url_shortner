"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  useFetchLogosQuery,
  useSoftDeleteLogoMutation,
  useCreateLogoMutation,
  useUpdateLogoMutation,
} from "@/services/logo";
import LogoCard from "@/components/Logo/LogoCard";
import withAuth from "@/components/WithAuth";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setHasMore,
  setLogos,
  addLogo,
  updateLogo,
  deleteLogo,
  setEditMode,
} from "@/redux/Features/slices/logoSlice";
import { BsCloudUpload } from "react-icons/bs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BrandLogo } from "@/commons/types/Logo";

// Updated validation schema
const logoSchema = z.object({
  logo: z
    .instanceof(File)
    .refine((file) => file !== null, {
      message: "Logo file is required",
    })
    .refine(
      (file) =>
        ["image/svg+xml", "image/png", "image/jpeg"].includes(file.type),
      {
        message: "Invalid file type. Only SVG, PNG, and JPEG are allowed.",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5 MB limit
      message: "File size should not exceed 5MB.",
    }),
});

type LogoFormData = z.infer<typeof logoSchema> & { id?: string };

const BrandLogoPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const page = useSelector((state: RootState) => state.logo.page);
  const hasMore = useSelector((state: RootState) => state.logo.hasMore);
  const logos = useSelector((state: RootState) => state.logo.logos);
  const editMode = useSelector((state: RootState) => state.logo.editMode);

  const [preview, setPreview] = useState<string | null>(null); // State to hold image preview
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref to file input

  const { data, error, isLoading, isFetching } = useFetchLogosQuery({
    page: page,
    pageSize: 3,
  });

  const [softDeleteLogo] = useSoftDeleteLogoMutation();
  const [createLogo] = useCreateLogoMutation();
  const [updateLogo] = useUpdateLogoMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LogoFormData>({
    resolver: zodResolver(logoSchema),
  });

  const onSubmit = async (data: LogoFormData) => {
    try {
      const file = data.logo;
      const formData = new FormData();
      formData.append("file", file);

      if (editMode?.id) {
        formData.append("logo_id", editMode.id);
        const res = await updateLogo(formData).unwrap();

        dispatch(
          setLogos(
            logos.map((logo) =>
              logo.logo_id === editMode.id ? res.result : logo
            )
          )
        );
        toast.success("Logo updated successfully");
      } else {
        const res = await createLogo(formData).unwrap();
        dispatch(setLogos([...logos, res.result])); // Ensure res.result.data is an array of logos
        toast.success("Logo created successfully");
      }

      reset();
      setPreview(null);
      dispatch(setEditMode(null));
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error("Failed to save logo:", err);
      toast.error("Failed to save logo");
    }
  };

  useEffect(() => {
    if (data?.result?.meta?.next === null) {
      dispatch(setHasMore(false)); // Make sure this only runs when necessary
    }
    if (data?.result?.data) {
      const newLogos = data.result.data;
      const currentLogoIds = logos.map((logo) => logo.logo_id);

      // Only update state if new logos are found
      const uniqueLogos = newLogos.filter(
        (logo) => !currentLogoIds.includes(logo.logo_id)
      );

      if (uniqueLogos.length > 0) {
        dispatch(setLogos([...logos, ...uniqueLogos]));
      }
    }
  }, [data, dispatch, logos]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [dispatch, isFetching, hasMore, page]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore, hasMore, isFetching]);

  const handleEdit = (logo: BrandLogo) => {
    dispatch(setEditMode({ id: logo.logo_id, preview: logo.logo_path }));
    setValue("logo", null); // Clear existing file input value
    setPreview(logo.logo_path);
  };

  const handleDelete = async (id: string) => {
    try {
      await softDeleteLogo(id).unwrap();
      dispatch(deleteLogo(id));
      toast.success("Logo deleted successfully");
    } catch (err) {
      console.error("Failed to delete logo:", err);
      toast.error("Failed to delete logo");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue("logo", file);
      setPreview(URL.createObjectURL(file)); // Set the preview URL

      // Reset the preview URL when clearing the input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const renderFormFields = () => {
    return (
      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
          Logo Image <span className="text-meta-1">*</span>
        </label>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:border-white hover:bg-primary/5"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <BsCloudUpload size={32} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("logo")}
              ref={inputRef}
              onChange={handleFileChange}
              accept=".svg,.png,.jpg,.jpeg"
            />
            {errors.logo && (
              <p className="text-red-500">{errors.logo.message}</p>
            )}
          </label>
        </div>
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover border border-gray-300 rounded"
            />
          </div>
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
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
          <h3 className="font-medium text-black dark:text-white">Logo Grid</h3>
        </div>
        {isLoading && !isFetching ? (
          <p className="text-center text">Loading...</p>
        ) : error ? (
          <p className="text-center text-meta-1">
            Failed to load Brand Logos. Please try again.
          </p>
        ) : (
          <div className="p-4 sm:p-6 xl:p-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 p-4">
              {logos.length === 0 && !isLoading ? (
                <p>No logos available</p>
              ) : (
                logos.map((logo) => (
                  <LogoCard
                    key={logo.logo_id}
                    logo={logo}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
            <div ref={loadMoreRef} className="text-center">
              {isFetching && "Loading..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(BrandLogoPage, true, ["admin", "user"]);
