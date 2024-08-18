import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import { AnalyticsResponse } from "@/services/analytics";
import { font } from "@/commons/consts/font";

interface DownloadPdfButtonProps {
  data: AnalyticsResponse | undefined | null;
  isLoading: boolean;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  data,
  isLoading,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsButtonEnabled(true);
        setLoadingMessage("Download PDF");
      }, 1000); // 10 seconds delay

      // Clear timeout if isLoading changes before 10 seconds
      return () => clearTimeout(timer);
    } else {
      setIsButtonEnabled(false);
      setLoadingMessage("Loading...");
    }
  }, [isLoading]);

  const handleDownload = async () => {
    if (!data) return;

    const pdf = new jsPDF("p", "mm", "a4");

    const element = document.getElementById("pdf-content");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    if (data) {
      pdf.addPage();

      pdf.addFileToVFS("Satoshi-Medium-normal.ttf", font);
      pdf.addFont("Satoshi-Medium-normal.ttf", "Satoshi-Medium", "normal");
      pdf.setFont("Satoshi-Medium");

      pdf.setFontSize(22);
      pdf.text("Analytics Report - Data Overview", 20, 30);

      const margin = 10;
      const lineHeight = 10;
      let startY = 50;

      startY += lineHeight * 0.5; // Adding extra space
      const urlIds = data.result.urlIds?.length
        ? data.result.urlIds.join(", ")
        : "All";
      const tagIds = data.result.tagIds?.length
        ? data.result.tagIds.join(", ")
        : "All";
      const startDate = data.result.startDate
        ? data?.result?.startDate?.split("T")[0]
        : "Not Specified";
      const endDate = data.result.endDate
        ? data?.result?.endDate?.split("T")[0]
        : "Not Specified";

      const tableData = [
        ["URL IDs", urlIds],
        ["Tag IDs", tagIds],
        ["Start Date", startDate],
        ["End Date", endDate],
        ["Total Clicks", data.result.totalClicks],
        ["New Users", data.result.newUsers],
        ["Returning Users", data.result.returningUsers],
      ];

      autoTable(pdf, {
        head: [["Field", "Value"]],
        body: tableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium",
        },
      });

      pdf.setFontSize(16);
      pdf.setFontSize(14);

      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;

      pdf.text("OS Breakdown:", margin, startY);
      const osTableData = Object.entries(data.result.osBreakdown).map(
        ([os, count]) => [os, count.toString()]
      );
      autoTable(pdf, {
        head: [["OS", "Count"]],
        body: osTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });

      // Device Breakdown
      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;
      pdf.text("Device Breakdown:", margin, startY);
      const deviceTableData = Object.entries(data.result.deviceBreakdown).map(
        ([device, count]) => [device, count.toString()]
      );
      autoTable(pdf, {
        head: [["Device", "Count"]],
        body: deviceTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });

      // Referrer Breakdown
      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;
      pdf.text("Referrer Breakdown:", margin, startY);
      const referrerTableData = Object.entries(
        data.result.referrerBreakdown
      ).map(([referrer, count]) => [referrer, count.toString()]);
      autoTable(pdf, {
        head: [["Referrer", "Count"]],
        body: referrerTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });

      // Country Map Data
      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;
      pdf.text("Country Map Data:", margin, startY);
      const countryTableData = Object.entries(data.result.countryMapData).map(
        ([country, count]) => [country, count.toString()]
      );
      autoTable(pdf, {
        head: [["Country", "Count"]],
        body: countryTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });

      // Top Cities
      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;
      pdf.text("Top Cities:", margin, startY);
      const citiesTableData = Object.entries(data.result.topCities).map(
        ([city, count]) => [city, count.toString()]
      );
      autoTable(pdf, {
        head: [["City", "Count"]],
        body: citiesTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });

      // Click Growth Over Time
      startY = pdf.lastAutoTable.finalY + lineHeight * 0.5;
      pdf.text("Click Growth Over Time:", margin, startY);
      const growthTableData = Object.entries(
        data.result.clickGrowthOverTime
      ).map(([date, clicks]) => [date, clicks.toString()]);
      autoTable(pdf, {
        head: [["Date", "Clicks"]],
        body: growthTableData,
        startY: startY + lineHeight * 0.5,
        margin: { left: margin, right: margin },
        theme: "striped",
        styles: {
          font: "Satoshi-Medium", // Use Satoshi-Medium font
        },
      });
    }

    // Save the PDF
    pdf.save("analytics-report.pdf");
  };

  return (
    <button
      disabled={isLoading || !isButtonEnabled}
      onClick={handleDownload}
      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
    >
      {isLoading ? loadingMessage : "Download PDF"}
    </button>
  );
};

export default DownloadPdfButton;
