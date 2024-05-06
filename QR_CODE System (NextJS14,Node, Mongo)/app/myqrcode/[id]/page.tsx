"use client"
import React, { useState, useEffect } from 'react';
import MyQrSection from '../../../components/MyQrSection'
import Layout from '@/components/Layout';
interface QrDataItem {
  title:string;
  originalUrl:string;
  shortId:string;
  filePath:string;
  user:string;
  scan?: number;
}
interface IndividualQrData {
  data:  QrDataItem[] | any;
}
type PageParams = {
  params: {
    id: string;
  };
};
const Page : React.FC<PageParams> = ({ params: { id }}) => {
  const [qrData, setQrData] = useState<IndividualQrData | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/myQr?shortId=${id}`);
      const userData: IndividualQrData = await response.json();
      setQrData(userData);
    }
    fetchUser();
  }, []);
  const myQrData = qrData?.data || "" 
  return (
    <Layout>
        <MyQrSection myQrData = {myQrData}/>
    </Layout>
  )
}

export default Page

