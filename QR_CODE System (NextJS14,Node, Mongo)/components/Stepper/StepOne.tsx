import React from "react";
import InputField from "@/components/InputBox/InputFeild";
interface UserTitleUrlProps {
  handleDataURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleLChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShortenUrl: () => void;
  currentURL: string;
  title: string;
  nextStep: () => void;
}
const UserTitleUrl: React.FC<UserTitleUrlProps> = ({
  handleDataURLChange,
  currentURL,
  nextStep,
  handleTitleLChange,
  handleShortenUrl,
  title,
}) => {
  return (
    <div className=" mx-[30px]">
      <div className="">
        <div className="font-manrope mt-[34px] mb-[30px]">
          <label
            htmlFor="Heading"
            className="overflow-hidden text-[color:var(--Neutral-800,#191D23)] text-ellipsis whitespace-nowrap text-3xl not-italic font-medium leading-[normal]"
          >
            Create Your QR Code Here
          </label>
          <p className="my-[10px] overflow-hidden text-[color:var(--Neutral-500,#64748B)] text-ellipsis whitespace-nowrap text-base not-italic font-normal leading-[normal]">
            Create your unique QR Code for your website now.
          </p>
        </div>
        <form className="">
          <div className="mb-10">
            <label
              className=" text-[color:var(--Neutral-500,#64748B)] text-[15px] not-italic font-normal leading-[normal]"
              htmlFor="Head"
            >
              Name Your QR Code
            </label>
            <br />
            <InputField
              className="mt-2 rounded border border-[color:var(--Neutral-100,#E7EAEE)] w-[437px] h-[50px] border-solid bg-white"
              name="title"
              type="text"
              placeholder=""
              value={title}
              onChange={handleTitleLChange}
            />
          </div>
          <div>
            <label
              className="text-[color:var(--Neutral-500,#64748B)] text-[15px] not-italic font-normal leading-[normal]"
              htmlFor="Head"
            >
              Enter Your Website Address
            </label>
            <br />
            <InputField
              className="mt-2 rounded border border-[color:var(--Neutral-100,#E7EAEE)] w-[437px] h-[50px] border-solid bg-white"
              name="url"
              type="url"
              placeholder=""
              value={currentURL}
              onChange={handleDataURLChange}
            />
          </div>
          <div className=" ">
            <button
              className="mt-[38px] flex w-[184px] h-10 flex-col justify-center items-center gap-2.5 shrink-0 p-4 rounded-[10px] bg-[#00bfff] text-white font-semibold"
              type="button"
              onClick={() => {
                nextStep();
                handleShortenUrl();
              }}
            >
              Create Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserTitleUrl;
