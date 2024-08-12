import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { BsCopy, BsEye, BsQrCode, BsTrash } from "react-icons/bs";
import QrCodeModal from "../QR Code/QRCodeModal";
import toast from "react-hot-toast";
import ModalWrapper from "../Modal/ModalWraper";
import { TableRowData } from "@/commons/types/TableRowData";
import { IoStatsChartOutline } from "react-icons/io5";

interface TableBodyProps {
  data: TableRowData[];
  headers: string[];
}

const TableBody: React.FC<TableBodyProps> = ({ data, headers }) => {
  const [isQrModalOpen, setQrModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedShortUrl, setSelectedShortUrl] = useState<string | null>(null);
  const [selectedRowDetails, setSelectedRowDetails] =
    useState<TableRowData | null>(null);

  const openQrModal = (shortUrl: string) => {
    setSelectedShortUrl(shortUrl);
    setQrModalOpen(true);
  };

  const closeQrModal = () => {
    setSelectedShortUrl(null);
    setQrModalOpen(false);
  };

  const openViewDetailsModal = (rowDetails: TableRowData) => {
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
            {headers.map((header) => (
              <td
                key={header}
                className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
              >
                <p className="text-slate-500 dark:text-white">
                  {String(row[header])}
                </p>
              </td>
            ))}
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <button
                  className="hover:text-primary"
                  onClick={() => copyToClipboard(baseUrl + row["Short Url"])}
                >
                  <BsCopy size={18} />
                </button>
                <button
                  className="hover:text-primary"
                  onClick={() => openQrModal(baseUrl + row["Short Url"])}
                >
                  <BsQrCode size={18} />
                </button>
                <button
                  className="hover:text-primary"
                  onClick={() => openViewDetailsModal(row)}
                >
                  <IoStatsChartOutline size={18} />
                </button>
                <button className="hover:text-primary">
                  <CiEdit size={18} />
                </button>
                <button className="hover:text-primary">
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
          shortLink={selectedShortUrl}
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
