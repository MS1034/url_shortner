import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { BsCopy, BsQrCode, BsTrash } from "react-icons/bs";
import QrCodeModal from "../QR Code/QRCodeModal";
import toast from "react-hot-toast";
import ModalWrapper from "../Modal/ModalWraper";
import { TableRowData } from "@/commons/types/TableRowData";
import { IoStatsChartOutline } from "react-icons/io5";
import Entity from "@/commons/Enums/Entity";
import { TableConfig } from "@/commons/helpers/SerializationHelper";
import { Url } from "@/commons/types/Url";

interface TableBodyProps<T extends TableRowData> {
  data: T[];
  headers: (keyof T)[];
  entity: Entity;
  onDelete: (id: string) => void;
  onEdit: (row: T) => void;
  primarykey: keyof T;
  config: TableConfig<T>;
}

const TableBody = <T extends TableRowData>({
  data,
  entity,
  headers,
  onDelete,
  onEdit,
  primarykey,
  config,
}: TableBodyProps<T>) => {
  const [isQrModalOpen, setQrModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedShortUrl, setSelectedShortUrl] = useState<Url | null>(null);
  const [selectedRowDetails, setSelectedRowDetails] =
    useState<TableRowData | null>(null);

  const openQrModal = (row: Url) => {
    setSelectedShortUrl(row);
    setQrModalOpen(true);
  };

  const closeQrModal = () => {
    setSelectedShortUrl(null);
    setQrModalOpen(false);
  };

  const openViewDetailsModal = (rowDetails: T) => {
    setSelectedRowDetails(rowDetails);
    setViewModalOpen(true);
  };

  const closeViewDetailsModal = () => {
    setSelectedRowDetails(null);
    setViewModalOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied to clipboard!"),
      (err) => console.error("Failed to copy: ", err)
    );
  };

  const baseUrl = "http://localhost:5000/api/v1/";

  return (
    <>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-t border-stroke dark:border-strokedark"
          >
            {headers.map((key) => {
              if (key === primarykey) return null;

              const cellValue = row[key];
              const render = config[key]?.render;

              return (
                <td
                  key={String(key)}
                  className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                >
                  <p className="text-slate-500 dark:text-white">
                    {render ? render(row) : String(cellValue)}
                  </p>
                </td>
              );
            })}
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                {entity === Entity.url && (
                  <>
                    <button
                      className="hover:text-primary"
                      onClick={() =>
                        copyToClipboard(baseUrl + row["short_url"])
                      }
                    >
                      <BsCopy size={18} />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => openQrModal(row as unknown as Url)}
                    >
                      <BsQrCode size={18} />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => openViewDetailsModal(row)}
                    >
                      <IoStatsChartOutline size={18} />
                    </button>
                  </>
                )}

                <button
                  className="hover:text-primary"
                  onClick={() => onEdit(row)}
                >
                  <CiEdit size={18} />
                </button>
                <button
                  className="hover:text-primary"
                  onClick={() => onDelete(String(row[primarykey]))}
                >
                  <BsTrash size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {selectedShortUrl && (
        <QrCodeModal
          isOpen={isQrModalOpen}
          onRequestClose={closeQrModal}
          shortLink={selectedShortUrl.short_url}
          image={selectedShortUrl.logo?.logo_path}
        />
      )}

      {selectedRowDetails && (
        <ModalWrapper
          isOpen={isViewModalOpen}
          onRequestClose={closeViewDetailsModal}
        >
          {/* Replace this div with the actual component to display row details */}
          <div className="p-4">
            <h3 className="text-xl font-bold">Details</h3>
            <p>{JSON.stringify(selectedRowDetails, null, 2)}</p>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default TableBody;
