"use client";
import html2canvas from "html2canvas";
import { nanoid } from "nanoid";
import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import QRCodeStyling, {
  Options,
  DrawType,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import {
  options as dotOptions,
  cornerSquareOptions,
  cornerDotOptions,
} from "../../utils/options";
import { Col, Row } from "antd";
interface StepTwoProps {
  prevStep: () => void;
  nextStep: () => void;
  currentURL: string;
  title: string;
  shortid: string;
}
import { notification } from "antd";
import { parseJwt } from "@/utils/jwt";
const StepTwo: React.FC<StepTwoProps> = ({
  currentURL,
  shortid,
  title,
}) => {
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string>("#000");
  const [cornerDotColor, setCornerDotColor] = useState<string>("#000");
  const [qrOptions, setQrOptions] = useState<Partial<Options>>({
    width: 180,
    height: 180,
    type: "svg" as DrawType,
    data: `qr.digitz.co/${shortid}`,
    dotsOptions: {
      color: currentColor,
      type: "square" as DotType,
    },
    backgroundOptions: {
      color: "transparent",
    },
    cornersDotOptions: {
      color: cornerDotColor,
      type: "square" as CornerDotType,
    },
    cornersSquareOptions: {
      color: cornerDotColor,
      type: "extra-rounded" as CornerSquareType,
    },
  });
  const qrCode = useRef(new QRCodeStyling(qrOptions));
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrOptions2, setQrOptions2] = useState<Partial<Options>>({
    width: 2000,
    height: 2000,
    type: "svg" as DrawType,
    data: `qr.digitz.co/${shortid}`,
    dotsOptions: {
      color: currentColor,
      type: "square" as DotType,
    },
    backgroundOptions: {
      color: "transparent",
    },
    cornersDotOptions: {
      color: cornerDotColor,
      type: "square" as CornerDotType,
    },
    cornersSquareOptions: {
      color: cornerDotColor,
      type: "extra-rounded" as CornerSquareType,
    },
  });
  const qrCode2 = useRef(new QRCodeStyling(qrOptions2));
  const qrRefTwo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you store it
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        setUserId(payload.userId);
      }
    }
  }, []);
  const handleCornerDotColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    setQrOptions((prev) => ({
      ...prev,
      cornersDotOptions: { ...(prev?.cornersDotOptions || {}), color: color },
      cornersSquareOptions: {
        ...(prev?.cornersSquareOptions || {}),
        color: color,
      },
    }));
    setQrOptions2((prev) => ({
      ...prev,
      cornersDotOptions: { ...(prev?.cornersDotOptions || {}), color: color },
      cornersSquareOptions: {
        ...(prev?.cornersSquareOptions || {}),
        color: color,
      },
    }));
  };
  useEffect(() => {
    if (qrRef.current && qrRefTwo.current) {
      qrCode.current.append(qrRef.current);
      qrCode2.current.append(qrRefTwo.current);
    }
  }, []);

  useEffect(() => {
    qrCode.current.update(qrOptions);
    qrCode2.current.update(qrOptions2);
  }, [qrOptions]);

  const handleDotOptionClick = (dotType: DotType) => {
    setQrOptions((prev) => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, type: dotType },
    }));
    setQrOptions2((prev) => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, type: dotType },
    }));
  };
  const handleDotColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setQrOptions((prev) => ({
      ...prev,
      dotsOptions: { ...(prev?.dotsOptions || {}), color: color },
    }));
    setQrOptions2((prev) => ({
      ...prev,
      dotsOptions: { ...(prev?.dotsOptions || {}), color: color },
    }));
  };

  const handleCornerSquareOptionClick = (
    cornerSquareType: CornerSquareType
  ) => {
    setQrOptions((prev) => ({
      ...prev,
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        type: cornerSquareType,
      },
    }));
    setQrOptions2((prev) => ({
      ...prev,
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        type: cornerSquareType,
      },
    }));
  };

  const handleCornerDotOptionClick = (cornerDotType: CornerDotType) => {
    setQrOptions((prev) => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, type: cornerDotType },
    }));
    setQrOptions2((prev) => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, type: cornerDotType },
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrOptions((prevOptions) => ({
          ...prevOptions,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    qrCode.current.update(qrOptions);
    qrCode2.current.update(qrOptions2);
  }, [qrOptions,qrOptions2]);

  const captureAndUploadQRCode = async (): Promise<void> => {
    setMessage("Processing...");
    console.log(qrRefTwo)
    if (qrRefTwo.current) {
      const canvas = await html2canvas(qrRefTwo.current);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const randomFileName = `${nanoid()}.png`;
          const formData = new FormData();
          formData.append("file", blob, randomFileName);
          formData.append("originalUrl", currentURL);
          formData.append("title", title);
          formData.append("shortId", shortid);
          if (userId !== null) {
            formData.append("userId", userId);
          } else {
            console.error("userId is null. Ensure the user is logged in.");
            // Handle this error appropriately, maybe abort the operation or show a message
          }
          try {
            const response = await fetch("/api/myQr", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Failed to upload QR code and URL");
            }

            notification.success({
              message: "Success",
              description: "QR code and URL saved successfully!",
            });
            window.location.href = "/";
          } catch (error) {
            console.error("Error:", error);
            notification.error({
              message: "Error",
              description: "Failed to upload QR code and URL",
            });
          }
        }
      }, "image/png");
    }
    else{
      console.log("Not FOund") 
    }
  };
  return (
    <div>
      <div className="font-manrope">
        <h1 className="text-[2em]">Title: {title}</h1>
        <Row>
          <Col
            span={7}
            className="border-r-[#E0E0E0] border-r border-solid mx-[24px]"
          >
            <div className="h-full w-full flex items-center justify-center flex-col">
              <div className="bg-[url('/QR-bg.png')] bg-cover w-[300px] h-[300px] flex items-center justify-center mr-[24px]">
                <div ref={qrRef} />
              </div>
              <div className="fixed z-[-2]" ref={qrRefTwo} />
              <button
                className=" w-[194.337px] h-10 rounded-[10px] bg-[#00BFFF] mt-[68px] text-white text-sm not-italic font-bold "
                type="submit"
                onClick={captureAndUploadQRCode}
              >
                Save QR Code
              </button>
            </div>
          </Col>
          <Col span={16}>
            <div className="options-container">
              <label
                htmlFor="Heading"
                className="overflow-hidden text-[color:var(--Neutral-800,#191D23)] text-ellipsis whitespace-nowrap text-3xl not-italic font-medium leading-[normal]"
              >
                Design Your QR Code
              </label>
              <br />
              <label className=" text-base font-bold leading-6 uppercase">
                QR CODE
              </label>
              <br />
              {dotOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => handleDotOptionClick(option.value as DotType)}
                  className={`m-1 p-2 w-20 h-20 border-2  bg-gray-200 border-gray-400 rounded overflow-hidden focus:outline-none`}
                >
                  <img
                    src={option.imgSrc}
                    alt={option.label}
                    className="w-full h-full "
                  />
                </button>
              ))}
              <div>
                {qrOptions?.dotsOptions?.color !== undefined && (
                  <input
                    className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                    placeholder="s"
                    type="color"
                    value={qrOptions.dotsOptions.color}
                    onChange={handleDotColorChange}
                  />
                )}
                {/* <span>{currentColor}</span> */}
              </div>
              <h3 className=" text-base font-bold leading-6 uppercase">Corner Square Styles</h3>
              {cornerSquareOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() =>
                    handleCornerSquareOptionClick(
                      option.value as CornerSquareType
                    )
                  }
                  className={`m-1 p-2 w-20 h-20 border-2  bg-gray-200 border-gray-400 rounded overflow-hidden focus:outline-none`}
                >
                  <img
                    src={option.imgSrc}
                    alt={option.label}
                    className="w-full h-full "
                  />
                </button>
              ))}

              <h3 className=" text-base font-bold leading-6 uppercase">Corner Dot Styles</h3>
              {cornerDotOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() =>
                    handleCornerDotOptionClick(option.value as CornerDotType)
                  }
                  className={`m-1 p-2 w-20 h-20 border-2  bg-gray-200 border-gray-400 rounded overflow-hidden focus:outline-none`}
                >
                  <img
                    src={option.imgSrc}
                    alt={option.label}
                    className="w-full h-full "
                  />
                </button>
              ))}
              <div>
                <input
                  className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                  placeholder="corner"
                  type="color"
                  // value={cornerDotColor}
                  value={qrOptions.cornersDotOptions?.color ?? ''}
                  onChange={handleCornerDotColorChange}
                />
              </div>
              <br />
              <div className="flex w-full ">
                <label className="w-48 h-10 flex items-center px-4 bg-white text-[#00BFFF] text-[14px] cursor-pointer ">
                  <svg
                    className="w-6 h-6 "
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 mx-2 text-xs leading-normal text-black font-manrope font-medium">
                    Upload
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    placeholder="File"
                  />
                </label>
              </div>

              {/* <input
                type="file"
                onChange={handleFileChange}
                placeholder="File"
                className="relative m-0 block w-1/4 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              /> */}
            </div>
            <br />
            <label className=" text-base font-bold leading-6 uppercase">
              Your Shorten Url is
            </label>
            <br />
            <input
              className="p-2 w-[425px] h-[50px] rounded border border-[color:var(--Neutral-100,#E7EAEE)] text-[15px] font-normal border-solid bg-white font-manrope"
              value={`qr.digitz.co/${shortid}`}
              placeholder="shortenID"
              type="text"
              name=""
              id=""
            />
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StepTwo;
