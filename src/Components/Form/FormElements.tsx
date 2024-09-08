import React, { ReactNode } from "react";
import SuccessIcon from "../../assets/images/icon-success-check.svg";

export const InputFormLabel: React.FC<{ labelName: string }> = ({
  labelName,
}) => {
  return (
    <label htmlFor={labelName}>
      {labelName} <span className="text-green-600">*</span>
    </label>
  );
};
export const InputFormLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 hover:cursor-pointer">{children}</div>
  );
};

export const InputTextLayout: React.FC<{
  children: ReactNode;
  isError?: boolean;
}> = ({ children, isError = false }) => {
  let classname =
    "flex h-10 w-full items-center justify-center rounded-md border-[1px] border-gray-500 p-2 hover:border-green-800";

  if (isError) {
    classname =
      "flex h-10 w-full items-center justify-center rounded-md border-[1px] border-red-600 p-2";
  }

  return <div className={classname}>{children}</div>;
};

export const InputTextAreaLayout: React.FC<{
  children: ReactNode;
  isError?: boolean;
}> = ({ children, isError = false }) => {
  let classname =
    "flex h-fit w-full items-center gap-4 rounded-md border-[1px] border-gray-500 p-2 hover:border-green-800 ";

  if (isError) {
    classname =
      "flex h-fit w-full items-center gap-4 rounded-md border-[1px] border-red-600 p-2";
  }

  return <div className={classname}>{children}</div>;
};

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <span className="text-base text-red-600">{message}</span>;
};

export interface IFormInput {
  firstname?: string;
  lastname?: string;
  mail?: string;
  generalEnquiry?: boolean;
  supportRequest?: boolean;
  message?: string;
  confirm?: boolean;
}

export const ValidFormMessage = () => {
  const animate =
    "animate-fade-down animate-duration-[500ms] animate-ease-in-out ";

  return (
    <div
      className={`fixed top-4 flex w-[87%] flex-col justify-center gap-4 rounded-lg bg-gray-900 p-4 text-white md:max-w-[28rem] ${animate}`}
    >
      <div className="ml-3 flex items-center gap-3">
        <span>
          <img src={SuccessIcon} alt="success" />
        </span>
        <span className="text-base">Message Sent!</span>
      </div>
      <p className="font-light text-green-200">
        Thanks for completing the form. We’ll be in touch soon!
      </p>
    </div>
  );
};
