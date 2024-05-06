"use client";
import React, { useState } from "react";
import { Col, Row } from "antd";
import { FaRegEdit } from "react-icons/fa";
import QrUpdateModal from "../Modal/QrUpdateModal"
interface QrDataItem {
  title: any;
  originalUrl: any;
  shortId: any;
  filePath: any;
  user: any;
  scan: any;
}

interface MyQrSectionProps {
  myQrData: QrDataItem[] | any; // Adjusted to match your type
}
const MyQrSection: React.FC<MyQrSectionProps> = ({ myQrData }) =>{
  
  const {title,filePath,shortId} =myQrData;
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      // Create a new blob with the PNG MIME type
      const pngBlob = new Blob([blob], { type: 'image/png' });
  
      const downloadUrl = window.URL.createObjectURL(pngBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
  
      // Ensure the fileName ends with '.png'
      const pngFileName = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
  
      link.setAttribute('download', pngFileName); // Set the file name for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error('Download failed', error);
    }
  };
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="w-full ml-[24px] mt-[34px]">
      <Row className=" ">
        <Col xs={8} sm={8} md={8} lg={8} xl={20}>
          <label
            htmlFor="Heading"
            className=" overflow-hidden text-[color:var(--Neutral-800,#191D23)] text-ellipsis whitespace-nowrap text-[30px] not-italic font-bold leading-[normal]"
          >
           {title}
          </label>
          <p className=" overflow-hidden text-[#53678C] text-ellipsis whitespace-nowrap text-base not-italic font-normal">
            {shortId}
          </p>
          <button
            type="submit"
            className="my-[26px] text-white text-base font-semibold w-[184px] h-10 rounded-[10px] bg-[#00BFFF] font-manrope"
            onClick={() => {
              const imagePath :any= `/uploads/${filePath}`; 
              const fileName:any = title; 
              handleDownload(imagePath, fileName); 
            }}
          >
            Download
          </button>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={4}>
        <div className="bg-[url('/QR-bg.png')] bg-cover w-[142px] h-[142px] flex items-center justify-center mr-[24px]">
        <img
            src={`/uploads/${filePath}`}
            alt="qrcodepic"
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="">
        <FaRegEdit onClick={showModal} className="text-[2em] mt-[1em] mb-[-25px] pointer"/>
        <QrUpdateModal visible={visible} onClose={handleCancel} />
        </div>
        </Col>
      </Row>
      <hr className="w-full h-0.5 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <div className=" border-y-1 border-gray-500">
      <Row >
        <Col xs={8} sm={8} md={8} lg={8} xl={5}>
          <label
            htmlFor="Heading"
            className="text-[color:var(--Neutral-500,#64748B)] text-xl font-bold leading-8"
          >
            TOTAL SCANS
          </label>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={5}>
          <label
            htmlFor="Heading"
            className=" text-[color:var(--Neutral-500,#64748B)] text-[15px] font-medium leading-8"
          >
            MEDIUM
          </label>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={5}>
          <label
            htmlFor="Heading"
            className=" text-[color:var(--Neutral-500,#64748B)] text-[15px] font-medium leading-8"
          >
            Folder
          </label>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={5}>
          <label
            htmlFor="Heading"
            className=" text-[color:var(--Neutral-500,#64748B)] text-[15px] font-medium leading-8"
          >
            CAMPAIGN START
          </label>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={4}>
          <label
            htmlFor="Heading"
            className=" text-[color:var(--Neutral-500,#64748B)] text-[15px] font-medium leading-8"
          >
            CAMPAIGN END
          </label>
        </Col>
        
      </Row>
      <Row className="my-[15px]">
          <Col xs={8} sm={8} md={8} lg={8} xl={5}>
            <label
              htmlFor="Heading"
              className=" text-black text-[15px] font-medium"
            >
              6 / 6 UNIQUE
            </label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={5}>
            <label
              htmlFor="Heading"
              className="  text-black text-[15px] font-medium"
            >
              Add Info +
            </label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={5}>
            <label
              htmlFor="Heading"
              className="  text-black text-[15px] font-medium"
            >
              Add Info +
            </label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={5}>
            <label
              htmlFor="Heading"
              className="  text-black text-[15px] font-medium"
            >
              March 7, 2022
            </label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={4}>
            <label
              htmlFor="Heading"
              className="  text-black text-[15px] font-medium"
            >
              Add Info +
            </label>
          </Col>
        </Row>
      </div>
      <hr className="w-full h-0.5 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
    </div>
  );
};

export default MyQrSection;
