"use client"
interface Params {
  unique: string;
}
import { useEffect, useState } from 'react';
import {  Spin } from 'antd';
export default async function RedirectPage({ params }: { params: Params }) {
  const { unique } = params;

  useEffect(() => {
    window.location.href = `/api/redirectUrl/${unique}`
  }, [unique]);

  return (
    <div  className="flex justify-center items-center h-screen">
       <Spin size="large">
       <div className=" flex justify-start items-center h-full ">
    </div>
      </Spin>
    </div>
  );
}
