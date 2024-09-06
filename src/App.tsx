import "./App.css";
import Form from "./Components/Form/Form";
import { FormContextProvider } from "./Components/Form/formContext";

function App() {
  return (
    <div className="flex h-full w-full items-center justify-center py-16">
      <FormContextProvider>
        <Form />
      </FormContextProvider>
    </div>
  );
}

export default App;
