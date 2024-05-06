import React, { useState } from 'react';
import Link from 'next/link'; 
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface AppProps {
  tableData: DataType[]; 
}
interface DataType {
  key: React.Key;
  BRANDS: string; 
  LINKS: string; 
  GENERATEDATE: string; 
  QRCODE: string; 
  NOOFSCAN: number; 
  ACTION: string;
}
interface AppProps {
  tableData: DataType[];
}
const columns: ColumnsType<DataType> = [
  {
    title: 'BRANDS',
    dataIndex: 'BRANDS',
    align: 'center',
    width: '226px', 
    render: (text, record:any) => (
      <Link href={`/myqrcode/${record.LINKS}`} passHref>
          {text}
      </Link>
    ),
  },
    {
      title: 'LINKS',
      dataIndex: 'LINKS',
      align: 'center',
      width: '226px',
      render: (folderId: string) => (
        <span >http://qr.digitz.co/{folderId}</span>
      ),
    },
    {
      title: 'GENERATE DATE',
      dataIndex: 'GENERATEDATE',
      align: 'center',
      width: '166', 
    },
    {
      title: 'QRCODE',
      dataIndex: 'QRCODE',
      key: 'QRCODE',
      align: 'center',
      width: 166,
      render: (filepath: string) => (
        <div className="flex justify-center">
        <img src={`/uploads/${filepath}`} alt="QR Code" className='w-[24px] h-[24px]' />
        </div>
      ),
    },
    {
      title: 'NO OF SCAN',
      dataIndex: 'NOOFSCAN',
      align: 'center',
      width: '166', 
    },
    {
      title: 'ACTION',
      dataIndex: 'ACTION',
      align: 'center',
      render: (_, record: any) => (
        <div className="flex justify-center"> 
          <Button
            onClick={() => {
              // Download logic goes here
              const filePath = `uploads/${record.QRCODE}`; 
              const fileName = record.BRANDS;
    
              const handleDownload = async () => {
                const response = await fetch(filePath);
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileName); 
                document.body.appendChild(link);
                link.click();
              };
    
              handleDownload().catch(console.error); // Call the download function
            }}
            className="text-center bg-[#00bfff] text-white font-medium" 
          >
            Download
          </Button>
        </div>
      ),
      width: '166',
    },
  ];
  
const App: React.FC<AppProps> = ({ tableData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);

  // const start = () => {
  //   setLoading(true);
  //   // Simulating an AJAX request
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div >
      <div>
        <span>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table className=' text-center' rowSelection={rowSelection} columns={columns} dataSource={tableData} pagination={{ position: ['bottomLeft'] }}/>
    </div>
  );
};

export default App;
