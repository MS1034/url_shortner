"use client";

import ParamsChange from "@/commons/interfaces/ParamsChange";
import {
  createUrlSchema,
  pregenerateUrlSchema,
} from "@/commons/Schemas/url.schema";
import { BrandLogo } from "@/commons/types/Logo";
import SelectLogoModal from "@/components/Logo/SelectLogoModal";
import UrlDataTable from "@/components/Url /UrlDataTable";
import UrlForm from "@/components/Url /UrlForm";
import TabNav from "@/components/Url /UrlTable";
import withAuth from "@/components/WithAuth";
import { setPage, setPageSize } from "@/redux/Features/slices/paramsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  useCreateUrlMutation,
  useFetchUrlsQuery,
  usePregenerateUrlMutation,
  useSoftDeleteUrlMutation,
  useUpdateUrlMutation,
} from "@/services/url";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const UrlShortenerPage = () => {
  const [selectedTab, setSelectedTab] = useState("quick");
  const [isModalOpen, setModalOpen] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<BrandLogo | null>(null);
  const params = useSelector((state: RootState) => state.params);
  const dispatch: AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingUrl, setEditingUrl] = useState<z.infer<
    typeof createUrlSchema
  > | null>(null);
  const { data, error, isLoading } = useFetchUrlsQuery(params);
  const [softDeleteUrl] = useSoftDeleteUrlMutation();
  const [createUrl] = useCreateUrlMutation();
  const [updateUrl] = useUpdateUrlMutation();
  const [preGenerateUrl] = usePregenerateUrlMutation();
  const [formKey, setFormKey] = useState<number>(0);

  const resetCreate = () => {
    setFormKey((prevKey) => prevKey + 1);
  };
  const handleParamsChange = ({ page, pageSize }: ParamsChange) => {
    const total = data?.result?.meta.total;
    if (total) {
      page = Math.min(pageSize || 0, Math.ceil(total / (pageSize || 1)));
      if (page !== undefined) dispatch(setPage(page));
      if (pageSize !== undefined) dispatch(setPageSize(pageSize));
    }
  };

  const handleCreateUrlSubmit = async (
    formData: z.infer<typeof createUrlSchema>
  ) => {
    alert("submitted");

    try {
      if (previewLogo) formData.logo_id = previewLogo.logo_id;

      if (isEditing) {
        await updateUrl({ ...editingUrl, ...formData }).unwrap();

        toast.success("URL updated successfully");
      } else {
        await createUrl(formData).unwrap();
        toast.success("URL created successfully");
      }

      setPreviewLogo(null);
      setIsEditing(false);
      setEditingUrl(null);
      return true;
    } catch (error) {
      toast.error(isEditing ? "Failed to update URL" : "Failed to create URL");
      console.error("Form submission error:", error);
      return false;
    }
  };

  const handleEdit = async (url: any) => {
    try {
      if (confirm("Are you sure you want to edit?")) {
        // alert(url);
        setIsEditing(true);
        setEditingUrl(url);
        setSelectedTab("advance");
        setPreviewLogo(url.logo);
      }
    } catch (err) {
      console.error("Failed to edit URL:", err);
      toast.error("Failed to edit URL");
    }
  };

  const handlePregenerateUrlSubmit = async (
    formData: z.infer<typeof pregenerateUrlSchema>
  ) => {
    try {
      if (previewLogo) formData.logo_id = previewLogo.logo_id;
      await preGenerateUrl(formData).unwrap();
      toast.success("URLs pre-generated successfully");
      setPreviewLogo(null);
      return true;
    } catch (error) {
      toast.error("Failed to pre-generate URLs");
      console.error("Form submission error:", error);
    }
    return false;
  };

  const handleDelete = async (url_id: string) => {
    try {
      if (confirm("Are you sure you want to delete?")) {
        await softDeleteUrl(url_id).unwrap();
        toast.success("Url deleted successfully");
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
  };

  return (
    <>
      <div className="flex flex-col gap-9 mb-5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <TabNav
            selectedTab={selectedTab}
            isEditing={isEditing}
            setSelectedTab={setSelectedTab}
          />
          <UrlForm
            selectedTab={selectedTab}
            onCreateUrl={handleCreateUrlSubmit}
            onPregenerateUrl={handlePregenerateUrlSubmit}
            preview={previewLogo}
            setPreview={setPreviewLogo}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            isEditing={isEditing}
            editingUrl={editingUrl}
            key={formKey}
            resetCreateForm={resetCreate}
            onCancelEdit={() => {
              setIsEditing(false);
              setEditingUrl(null);
              resetCreate();
              setPreviewLogo(null);
            }}
          />
        </div>
        <UrlDataTable
          isLoading={isLoading}
          isError={!!error}
          data={data?.result?.data}
          meta={data?.result?.meta}
          handleParamsChange={handleParamsChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <SelectLogoModal
          isOpen={isModalOpen}
          onRequestClose={(logo) => {
            setModalOpen(false);
            if (logo && logo.logo_path) {
              setPreviewLogo(logo);
            }
          }}
        />
      </div>
    </>
  );
};

export default withAuth(UrlShortenerPage, true, ["admin", "user"]);
