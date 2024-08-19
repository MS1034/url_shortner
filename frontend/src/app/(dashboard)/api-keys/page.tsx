"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateApiKeyMutation,
  useDeleteApiKeyMutation,
  useUpdateApiKeyMutation,
  useGetApiKeyQuery,
} from "@/services/api-keys";
import { IoCopy, IoLockClosed } from "react-icons/io5";
import { GoUnlock } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import DateRangePicker from "@/components/DatePicker/DateRangePicker";
import toast from "react-hot-toast";

const ApiKeysPage = () => {
  const [createApiKey] = useCreateApiKeyMutation();
  const [updateApiKey] = useUpdateApiKeyMutation();
  const [deleteApiKey] = useDeleteApiKeyMutation();
  const { data: apiKey, refetch } = useGetApiKeyQuery();
  const [isBlocked, setIsBlocked] = useState<boolean>(
    apiKey?.result?.is_deleted || false
  );
  const [isEditing, setIsEditing] = useState<boolean>(!!apiKey?.result);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{
    expires_at?: Date;
  }>({
    defaultValues: {
      expires_at: apiKey?.result?.expires_at
        ? new Date(apiKey?.result?.expires_at)
        : undefined,
    },
  });

  const onCreate = async (values: { expires_at?: Date }) => {
    try {
      if (!isEditing) {
        await createApiKey(values).unwrap();
        toast.success("API key created successfully");
      } else {
        await updateApiKey(values).unwrap();
        toast.success("API key updated successfully");
      }
      reset();
      refetch(); // Refresh the API key data
    } catch (error) {
      console.error("Error creating API key:", error);
      toast.error(
        error?.data?.message || "Failed to create API key. Please try again."
      );
    }
  };

  const onDelete = async () => {
    try {
      await deleteApiKey().unwrap();
      toast.success("API key deleted successfully");
      reset();
      refetch(); // Refresh the API key data
    } catch (error) {
      console.error("Error deleting API key:", error);
      toast.error("Failed to delete API key. Please try again.");
    }
  };

  const toggleBlock = async () => {
    try {
      await updateApiKey({ is_deleted: !isBlocked }).unwrap();
      setIsBlocked(!isBlocked);
      toast.success(isBlocked ? "API key unblocked" : "API key blocked");
    } catch (error) {
      console.error("Error updating API key status:", error);
      toast.error("Failed to update API key status. Please try again.");
    }
  };

  const copyApiKey = () => {
    if (apiKey?.result.api_key) {
      navigator.clipboard.writeText(apiKey?.result?.api_key);
      toast.success("API key copied to clipboard");
    }
  };

  const renderFormFields = () => {
    return (
      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
          Expiry Date
        </label>
        <Controller
          name="expires_at"
          control={control}
          render={({ field }) => (
            <DateRangePicker
              minDate={new Date()}
              value={field.value}
              onDateChange={(date: Date | null) => field.onChange(date)}
              placeholderText="Expiry Date"
            />
          )}
        />

        {errors.expires_at && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expires_at.message}
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    setIsEditing(!!apiKey?.result);
  }, [apiKey]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Key Management</h1>

      <div className="flex flex-col gap-9 mb-5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit(onCreate)}>
            <div className="p-6.5">
              {renderFormFields()}
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full max-w-125 justify-center rounded bg-primary p-3 font-medium text-white hover:bg-primary-dark"
              >
                {isSubmitting
                  ? "Processing..."
                  : isEditing
                  ? "Update"
                  : "Generate"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-9 mb-5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current API Key</h2>
              <button
                onClick={copyApiKey}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Copy API Key"
              >
                <IoCopy size={20} />
              </button>
            </div>
            {apiKey ? (
              <div className="flex flex-col items-start">
                <p className="mb-2 text-gray-700">
                  Key:{" "}
                  <span className="font-mono">{apiKey?.result?.api_key}</span>
                </p>
                <p className="mb-2 text-gray-700">
                  Expires At:{" "}
                  {apiKey?.result?.expires_at
                    ? new Date(apiKey.result.expires_at).toDateString()
                    : "Never"}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={toggleBlock}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md ${
                      isBlocked
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-yellow-600 text-white hover:bg-yellow-700"
                    }`}
                  >
                    {isBlocked ? (
                      <GoUnlock size={20} />
                    ) : (
                      <IoLockClosed size={20} />
                    )}
                    {isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={onDelete}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-meta-1 text-white hover:bg-red-700"
                  >
                    <HiOutlineTrash size={20} />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p>No API key available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;
