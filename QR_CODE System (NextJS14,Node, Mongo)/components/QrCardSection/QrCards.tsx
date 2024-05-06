import React from "react";
interface QrDataItem {
  title: string;
  originalUrl: string;
  shortId: string;
  filePath: string;
  user: string;
  slug:string;
}
const TABLE_HEAD = ["BRANDS", "LINKS", "GENERATE DATE", "QRCODE","NO OF SCAN", "ACTION",""];
const QrCard: React.FC<{ data: QrDataItem }> = () => {
  // const { title = "", shortId = "", filePath , slug= "" } = data ?? {};
  return (
    <>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                  {head}
              </th>
            ))}
          </tr>
        </thead>
        </table>
    {/* <div className="w-full px-4 grid items-center rounded bg-gray-50 h-32 dark:bg-gray-800">
      <Row className="">
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          <img
            className="w-[100px] h-[100px]"
            src={`/uploads/${filePath}`}
            alt="asa"
          />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={10}>
          <div className="px-4 grid space-between h-full ">
            <p className="text-[14px] font-[bold] font-poppins">Website</p>
            <p className="text-[22px] font-[bold] font-poppins"> {title}</p>
            <p className="text-[12px] font-poppins text-gray-400">
              March 02 2024
            </p>
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={6}>
          <div className="px-4 grid space-between h-full ">
            <p className="text-[14px] font-[bold] font-poppins">No Folder</p>
            <p className="text-[14px] font-[bold] font-poppins">{shortId}</p>
            <p className="text-[12px] font-poppins text-gray-400">
              Modified if needded
            </p>
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={3}>
          <div className="px-4 grid justify-start h-full ">
            <p className="text-[20px] font-[bold] font-poppins ">Scan</p>
            <p className="text-[30px] font-[bold] font-poppins flex justify-center">
              0
            </p>
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={3}>
          <div className="px-4 flex items-center h-full">
            <Link href={`/myqrcode/${slug}`} passHref>
              <button
                type="button"
                className=" mr-[12px] bg-green-500 hover:bg-green-400 text-green-100 py-2 px-8 rounded focus:outline-none transition-colors duration-200"
              >
                Details
              </button>
            </Link>
          </div>
        </Col>
      </Row>
    </div> */}
    </>
  );
};

export default QrCard;
