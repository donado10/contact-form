import React, { FormEvent, ReactNode, useRef } from "react";
import { FormContextProvider } from "./formContext";

const InputFormLabel: React.FC<{ labelName: string }> = ({ labelName }) => {
  return <label htmlFor={labelName}>{labelName} *</label>;
};
const InputFormLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const InputTextLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-10 w-full items-center justify-center rounded-md border-[1px] border-gray-500 p-1">
      {children}
    </div>
  );
};

const InputRadioLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-10 w-full items-center gap-4 rounded-md border-[1px] border-gray-500 p-1">
      {children}
    </div>
  );
};

const InputTextAreaLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-fit w-full items-center gap-4 rounded-md border-[1px] border-gray-500 p-1">
      {children}
    </div>
  );
};

const Form = () => {
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const mailRef = useRef<HTMLInputElement>();
  const generalEnquiryRef = useRef<HTMLInputElement>();
  const supportRequestRef = useRef<HTMLInputElement>();
  const messageRef = useRef<HTMLTextAreaElement>();
  const confirmRef = useRef<HTMLInputElement>();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const mail = mailRef.current?.value;
    const generalEnquiry = generalEnquiryRef.current?.value;
    const supportRequest = generalEnquiryRef.current?.value;
    const message = messageRef.current?.value;
    const confirm = confirmRef.current?.value;
  };

  return (
    <form
      className="min-h-screen w-[90%] rounded-2xl bg-white p-8 md:w-[46rem]"
      onSubmit={submitHandler}
    >
      <h1 className="mb-8 flex items-center text-3xl font-bold">Contact Us</h1>
      <div className="flex flex-col justify-center gap-4">
        <InputFormLayout>
          <InputFormLabel labelName="First Name" />
          <InputTextLayout>
            <input
              type="text"
              className="w-full outline-none"
              ref={firstNameRef as React.LegacyRef<HTMLInputElement>}
            />
          </InputTextLayout>
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Last Name" />
          <InputTextLayout>
            <input
              type="text"
              className="w-full outline-none"
              ref={lastNameRef as React.LegacyRef<HTMLInputElement>}
            />
          </InputTextLayout>
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Email Address" />
          <InputTextLayout>
            <input
              type="email"
              className="w-full outline-none"
              ref={mailRef as React.LegacyRef<HTMLInputElement>}
            />
          </InputTextLayout>
        </InputFormLayout>

        <InputFormLayout>
          <InputFormLabel labelName="Query Type" />
          <div className="flex flex-col justify-center gap-2 md:flex-row">
            <InputRadioLayout>
              <div>
                <input
                  type="radio"
                  className="w-full outline-none"
                  ref={generalEnquiryRef as React.LegacyRef<HTMLInputElement>}
                />
              </div>
              <label htmlFor="General Enquiry">General Enquiry</label>
            </InputRadioLayout>
            <InputRadioLayout>
              <div>
                <input
                  type="radio"
                  className="w-full outline-none"
                  ref={supportRequestRef as React.LegacyRef<HTMLInputElement>}
                />
              </div>
              <label htmlFor="Support Request">Support Request</label>
            </InputRadioLayout>
          </div>
        </InputFormLayout>
        <InputFormLayout>
          <InputFormLabel labelName="Message" />
          <InputTextAreaLayout>
            <textarea
              name=""
              id=""
              className="min-h-52 w-full outline-none"
              ref={messageRef as React.LegacyRef<HTMLTextAreaElement>}
            ></textarea>
          </InputTextAreaLayout>
        </InputFormLayout>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <input
          type="checkbox"
          className="h-4 w-4"
          ref={confirmRef as React.LegacyRef<HTMLInputElement>}
        />
        <label htmlFor="">I consent to being contacted by the team *</label>
      </div>
      <button
        className="mt-8 flex h-10 w-full items-center justify-center rounded-md bg-green-600"
        onSubmit={submitHandler}
      >
        <span className="text-white">Submit</span>
      </button>
    </form>
  );
};

export default Form;
