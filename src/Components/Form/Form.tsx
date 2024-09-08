import React, { ReactNode, useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const InputFormLabel: React.FC<{ labelName: string }> = ({ labelName }) => {
  return <label htmlFor={labelName}>{labelName} *</label>;
};
const InputFormLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 hover:cursor-pointer">{children}</div>
  );
};

const InputTextLayout: React.FC<{ children: ReactNode; isError?: boolean }> = ({
  children,
  isError = false,
}) => {
  let classname =
    "flex h-10 w-full items-center justify-center rounded-md border-[1px] border-gray-500 p-1 hover:border-green-800";

  if (isError) {
    classname =
      "flex h-10 w-full items-center justify-center rounded-md border-[1px] border-red-600 p-1";
  }

  return <div className={classname}>{children}</div>;
};

const InputRadioLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-10 w-full items-center gap-4 rounded-md border-[1px] border-gray-500 p-1">
      {children}
    </div>
  );
};

const InputTextAreaLayout: React.FC<{
  children: ReactNode;
  isError?: boolean;
}> = ({ children, isError = false }) => {
  let classname =
    "flex h-fit w-full items-center gap-4 rounded-md border-[1px] border-gray-500 p-1 hover:border-green-800 ";

  if (isError) {
    classname =
      "flex h-fit w-full items-center gap-4 rounded-md border-[1px] border-red-600 p-1";
  }

  return <div className={classname}>{children}</div>;
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <span className="text-base text-red-600">{message}</span>;
};

interface IFormInput {
  firstname?: string;
  lastname?: string;
  mail?: string;
  generalEnquiry?: boolean;
  supportRequest?: boolean;
  message?: string;
  confirm?: boolean;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [inputGeneralEnquiryRadioCheck, setInputGeneralEnquiryRadioCheck] =
    useState<boolean>(false);
  const [inputSupportRequestRadioCheck, setInputSupportRequestRadioCheck] =
    useState<boolean>(false);

  const generalEnquiryRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const supportRequestRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const submitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="min-h-screen w-[90%] rounded-2xl bg-white p-8 md:w-[46rem]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-8 flex items-center text-3xl font-bold">Contact Us</h1>
      <div className="flex flex-col justify-center gap-4">
        <InputFormLayout>
          <InputFormLabel labelName="First Name" />
          <InputTextLayout isError={errors.firstname && true}>
            <input
              type="text"
              className="w-full outline-none"
              {...register("firstname", { required: true })}
            />
          </InputTextLayout>
          {errors.firstname && (
            <ErrorMessage message="This field is required" />
          )}
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Last Name" />
          <InputTextLayout isError={errors.lastname && true}>
            <input
              type="text"
              className="w-full outline-none"
              {...register("lastname", { required: true })}
            />
          </InputTextLayout>
          {errors.lastname && <ErrorMessage message="This field is required" />}
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Email Address" />
          <InputTextLayout isError={errors.mail && true}>
            <input
              type="email"
              className="w-full outline-none"
              {...register("mail", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
          </InputTextLayout>
          {errors.mail && (
            <ErrorMessage message="Please enter a valid email address" />
          )}
        </InputFormLayout>

        <InputFormLayout>
          <InputFormLabel labelName="Query Type" />
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            <InputRadioLayout>
              <div className="grid place-items-center">
                <input
                  type="radio"
                  className={`col-start-1 row-start-1 h-4 w-4 appearance-none rounded-full border-[2px] ${inputGeneralEnquiryRadioCheck ? "border-green-800" : ""}`}
                  {...register("generalEnquiry", {
                    validate: () =>
                      generalEnquiryRef.current.checked ||
                      supportRequestRef.current.checked,
                  })}
                  ref={generalEnquiryRef}
                  onChange={() => {
                    supportRequestRef.current.checked = false;
                    setInputSupportRequestRadioCheck(false);
                    setInputGeneralEnquiryRadioCheck(true);
                  }}
                />
                {inputGeneralEnquiryRadioCheck && (
                  <div
                    className={`col-start-1 row-start-1 h-2 w-2 rounded-full bg-green-800`}
                  ></div>
                )}
              </div>
              <label htmlFor="General Enquiry">General Enquiry</label>
            </InputRadioLayout>
            <InputRadioLayout>
              <div className="grid place-items-center">
                <input
                  type="radio"
                  className={`col-start-1 row-start-1 h-4 w-4 appearance-none rounded-full border-[2px] ${inputSupportRequestRadioCheck ? "border-green-800" : ""}`}
                  {...register("supportRequest", {
                    validate: () =>
                      generalEnquiryRef.current.checked ||
                      supportRequestRef.current.checked,
                  })}
                  ref={supportRequestRef}
                  onChange={() => {
                    generalEnquiryRef.current.checked = false;
                    setInputSupportRequestRadioCheck(true);
                    setInputGeneralEnquiryRadioCheck(false);
                  }}
                />
                {inputSupportRequestRadioCheck && (
                  <div
                    className={`col-start-1 row-start-1 h-2 w-2 rounded-full bg-green-800`}
                  ></div>
                )}
              </div>
              <label htmlFor="Support Request">Support Request</label>
            </InputRadioLayout>
          </div>
          {(errors.generalEnquiry || errors.supportRequest) && (
            <ErrorMessage message="Please select a query type" />
          )}
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Message" />
          <InputTextAreaLayout isError={errors.message && true}>
            <textarea
              id=""
              className="min-h-52 w-full outline-none"
              {...register("message", {
                required: true,
                minLength: 1,
              })}
            ></textarea>
          </InputTextAreaLayout>
          {errors.message && <ErrorMessage message="This field is required" />}
        </InputFormLayout>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="h-4 w-4 accent-green-800 hover:cursor-pointer"
            {...register("confirm", { required: true })}
          />
          <label htmlFor="">I consent to being contacted by the team *</label>
        </div>
        {errors.confirm && (
          <ErrorMessage message="To submit this form, please consent to being contacted" />
        )}
      </div>
      <button
        className="hover: mt-8 flex h-10 w-full items-center justify-center rounded-md bg-green-800"
        onSubmit={handleSubmit(submitHandler)}
      >
        <span className="text-white">Submit</span>
      </button>
    </form>
  );
};

export default Form;
