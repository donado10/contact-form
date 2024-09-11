import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  ErrorMessage,
  IFormInput,
  InputFormLabel,
  InputFormLayout,
  InputTextAreaLayout,
  InputTextLayout,
  ValidFormMessage,
} from "./FormElements";

import InputRadio from "./InputRadio";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm<IFormInput>();

  const inputConfirmRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [inputGeneralEnquiryRadioCheck, setInputGeneralEnquiryRadioCheck] =
    useState<boolean>(false);
  const [inputSupportRequestRadioCheck, setInputSupportRequestRadioCheck] =
    useState<boolean>(false);

  const submitHandler: SubmitHandler<IFormInput> = () => {
    reset();
    setInputGeneralEnquiryRadioCheck(false);
    setInputSupportRequestRadioCheck(false);
  };

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 3000);
  }, [isSubmitSuccessful]);

  return (
    <>
      {isSubmitSuccessful && <ValidFormMessage />}
      <form
        className="min-h-screen w-[90%] rounded-2xl bg-white p-8 md:w-[46rem]"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-8 flex items-center text-3xl font-bold">
          Contact Us
        </h1>
        <div className="flex flex-col justify-center gap-4">
          <InputFormLayout>
            <InputFormLabel id={"firstname"} labelName="First Name" />
            <InputTextLayout isError={errors.firstname && true}>
              <input
                id="firstname"
                type="text"
                className="w-full bg-transparent outline-none"
                {...register("firstname", { required: true })}
                name="firstname"
              />
            </InputTextLayout>
            {errors.firstname && (
              <ErrorMessage message="This field is required" />
            )}
          </InputFormLayout>
          <InputFormLayout>
            <InputFormLabel id={"lastname"} labelName="Last Name" />
            <InputTextLayout isError={errors.lastname && true}>
              <input
                id="lastname"
                type="text"
                className="w-full outline-none"
                {...register("lastname", { required: true })}
                name="lastname"
              />
            </InputTextLayout>
            {errors.lastname && (
              <ErrorMessage message="This field is required" />
            )}
          </InputFormLayout>
          <InputFormLayout>
            <InputFormLabel id={"mail"} labelName="Email Address" />
            <InputTextLayout isError={errors.mail && true}>
              <input
                id={"mail"}
                type="email"
                className="w-full outline-none"
                {...register("mail", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                name="mail"
              />
            </InputTextLayout>
            {errors.mail && (
              <ErrorMessage message="Please enter a valid email address" />
            )}
          </InputFormLayout>

          <InputFormLayout>
            <h1>
              Query Type <span className="text-green-600">*</span>
            </h1>
            <div className="flex flex-col justify-center gap-2 md:flex-row">
              <InputRadio
                isSelected={inputGeneralEnquiryRadioCheck}
                {...register("generalEnquiry", {
                  value: inputGeneralEnquiryRadioCheck,
                  validate: () =>
                    inputSupportRequestRadioCheck ||
                    inputGeneralEnquiryRadioCheck,
                })}
                onClick={() => {
                  setValue("generalEnquiry", true);
                  setValue("supportRequest", false);
                  setInputSupportRequestRadioCheck(false);
                  setInputGeneralEnquiryRadioCheck(true);
                }}
                labelName="General Enquiry"
                id="generalenquiry"
              />
              <InputRadio
                isSelected={inputSupportRequestRadioCheck}
                {...register("supportRequest", {
                  validate: () =>
                    inputSupportRequestRadioCheck ||
                    inputGeneralEnquiryRadioCheck,
                })}
                onClick={() => {
                  setValue("generalEnquiry", false);
                  setValue("supportRequest", true);
                  setInputSupportRequestRadioCheck(true);
                  setInputGeneralEnquiryRadioCheck(false);
                }}
                labelName="Support Request"
                id="supportrequest"
              />
            </div>
            {(errors.generalEnquiry || errors.supportRequest) && (
              <ErrorMessage message="Please select a query type" />
            )}
          </InputFormLayout>
          <InputFormLayout>
            <InputFormLabel id="message" labelName="Message" />
            <InputTextAreaLayout isError={errors.message && true}>
              <textarea
                id="message"
                className="min-h-52 w-full outline-none"
                {...register("message", {
                  required: true,
                  minLength: 1,
                })}
              ></textarea>
            </InputTextAreaLayout>
            {errors.message && (
              <ErrorMessage message="This field is required" />
            )}
          </InputFormLayout>
        </div>
        <div className="mt-8">
          <div
            className="flex items-center gap-4 hover:cursor-pointer"
            onClick={() => {
              inputConfirmRef.current.checked =
                !inputConfirmRef.current.checked;
              const value = inputConfirmRef.current.checked;
              setValue("confirm", value);
            }}
          >
            <input
              type="checkbox"
              id="confirm"
              className="h-4 w-4 accent-green-800 hover:cursor-pointer"
              {...register("confirm", { required: true })}
              ref={inputConfirmRef}
            />
            <label htmlFor="confirm" className="hover:cursor-pointer">
              I consent to being contacted by the team{" "}
              <span className="text-green-600">*</span>
            </label>
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
    </>
  );
};

export default Form;
