"use client"
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Col, Row } from "antd";
import Layout from "@/components/Layout/Layout-Filter";
import Table from "./Table";
import { parseJwt } from "@/utils/jwt";
import useAuthRedirect from "@/utils/useAuthRedirect";

interface QrDataItem {
  title: string;
  originalUrl: string;
  shortId: string;
  filePath: string;
  status: string;
  user: string;
  scan: number;
}

interface QrData {
  data: QrDataItem[];
}

const QrCards: NextPage = () => {
  useAuthRedirect();
  const [userId, setUserId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<QrData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        setUserId(payload.userId);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        let url = `/api/myQr?userId=${userId}`;
        if (statusFilter) {
          url += `&status=${statusFilter}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData: QrData | null = await response.json();
        setQrData(userData);
      } catch (error) {
        console.error("Failed to fetch QR data: ", error);
      }
    }

    fetchUser();
  }, [userId, statusFilter]);

  const handleFilter = (selectedFilter: string | null) => {
    setStatusFilter(selectedFilter);
  };
  const transformedData = qrData?.data.map((item, index) => ({
    key: index.toString(),
    BRANDS: item.title,
    LINKS: item.shortId,
    GENERATEDATE: new Date().toISOString(),
    QRCODE: item.filePath,
    NOOFSCAN: item.scan,
    ACTION: 'View',
  })) ?? [];

  return (
    <Layout handleFilter={handleFilter}>
      <Row className="">
        <Col xs={2} sm={2} md={2} lg={2} xl={14}>
          <div className="mx-[30px] font-manrope">
            <label
              htmlFor="Heading"
              className="overflow-hidden text-[color:var(--Neutral-800,#191D23)] text-ellipsis whitespace-nowrap text-3xl not-italic font-medium leading-[normal]"
            >
              Hello, Here’re your QR Codes
            </label>
            <p className="my-[10px] overflow-hidden text-[color:var(--Neutral-500,#64748B)] text-ellipsis whitespace-nowrap text-base not-italic font-normal leading-[normal]">
              Active QR Codes (48/50 Dynamic codes)
            </p>
          </div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={4}>
          <button
            type="submit"
            className="flex w-[132px] h-11 justify-center items-center gap-2.5 rounded px-4 py-2 bg-[#00BFFF] font-manrope text-white text-base not-italic font-bold leading-[normal]"
          >
            Last Created
          </button>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={6}>
          <a href="/create">
            <button
              type="submit"
              className="flex w-[226px] h-11 justify-center items-center gap-2.5 rounded px-3 py-2 border-[1.5px]  border-gray-300 font-manrope"
            >
             Create New QR Code
            </button>
          </a>
        </Col>
      </Row>
      <div className="m-[30px]">
        <Table tableData={transformedData} />
      </div>
    </Layout>
  );
};

export default QrCards;
