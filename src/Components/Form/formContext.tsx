import { createContext, ReactNode, useContext, useState } from "react";

interface IFormInput {
  firstname?: string;
  lastname?: string;
  mail?: string;
  generalEnquiry?: boolean;
  supportRequest?: boolean;
  message?: string;
  confirm?: boolean;
}

interface IFormInputContext {
  input: IFormInput | null;
  addInput: (input: IFormInput) => void;
  updateInput: () => void;
  deleteInput: () => void;
}

const FormContext = createContext<IFormInputContext | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};

export const FormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState<IFormInput | null>(null);

  const addInput = (input: IFormInput) => {
    setInput(input);
  };

  const updateInput = (input?: IFormInput) => {
    if (input?.firstname) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, firstname: input.firstname };
        }
        return { firstname: input.firstname } as IFormInput;
      });
    }

    if (input?.lastname) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, lastname: input.lastname };
        }
        return { lastname: input.lastname } as IFormInput;
      });
    }

    if (input?.mail) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, mail: input.mail };
        }
        return { mail: input.mail } as IFormInput;
      });
    }

    if (input?.generalEnquiry) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, generalEnquiry: input.generalEnquiry };
        }
        return { generalEnquiry: input.generalEnquiry } as IFormInput;
      });
    }

    if (input?.supportRequest) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, supportRequest: input.supportRequest };
        }
        return { supportRequest: input.supportRequest } as IFormInput;
      });
    }

    if (input?.message) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, message: input.message };
        }
        return { message: input.message } as IFormInput;
      });
    }

    if (input?.confirm) {
      setInput((prev) => {
        if (prev) {
          return { ...prev, confirm: input.confirm };
        }
        return { confirm: input.confirm } as IFormInput;
      });
    }
  };

  const deleteInput = () => {
    setInput(null);
  };

  return (
    <FormContext.Provider
      value={{ input: input, addInput, deleteInput, updateInput }}
    >
      {children}
    </FormContext.Provider>
  );
};
