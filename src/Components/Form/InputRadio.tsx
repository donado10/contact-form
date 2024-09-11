import React, { ReactNode, useRef } from "react";

interface IInputRadioLayout extends React.HTMLAttributes<HTMLDivElement> {
  labelName: string;
  isSelected?: boolean;
}

const InputRadioLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="grid place-items-center">{children}</div>;
};

const InputRadio: React.FC<IInputRadioLayout> = React.forwardRef(
  ({ labelName, id, isSelected = false, ...props }, ref) => {
    let radioRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    if (ref) {
      radioRef = ref as React.MutableRefObject<HTMLInputElement>;
    }

    let classname =
      "flex h-10 w-full items-center gap-5 pl-6 rounded-md border-[1px] border-gray-500 p-1";

    if (isSelected) {
      classname =
        "flex h-10 w-full items-center gap-5 pl-6 rounded-md border-[1px] border-green-800 bg-green-200 p-1";
    }

    return (
      <div className={classname} {...props}>
        <InputRadioLayout>
          <input
            type="radio"
            className={`col-start-1 row-start-1 h-4 w-4 appearance-none rounded-full border-[2px] ${isSelected ? "border-green-800" : "border-gray-300"}`}
            ref={radioRef}
            name={labelName}
          />
          {isSelected && (
            <div
              className={`col-start-1 row-start-1 h-2 w-2 rounded-full bg-green-800`}
            ></div>
          )}
        </InputRadioLayout>
        <label id={id} className="hover:cursor-pointer">
          {labelName}
        </label>
      </div>
    );
  },
);

export default InputRadio;
