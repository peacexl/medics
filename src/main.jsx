import React from "react"; 
import ReactDOM from "react-dom/client"; 
import { ChakraProvider} from "@chakra-ui/react"; 
import { BrowserRouter } from "react-router-dom"; 
import App from "./App"; 
import "./index.css";
import { ConsultationProvider } from "./Components/ConsultationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ConsultationProvider>
        <App />
        </ConsultationProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
