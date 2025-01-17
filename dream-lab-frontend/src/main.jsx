import React from "react";

// Componente principal
import App from "./App.jsx";

// Para el enrutamiento
import ReactDOM from "react-dom/client";

// Para los estilos de NextUI
import { NextUIProvider } from "@nextui-org/react";

// Para los selectores de fecha y hora
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-mx.js";

// Para utilizar redux
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// Para utilizar firebase en el videowall
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "../firebase-config.js";

// Estilos
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es-mx"
            >
                <Provider store={store}>
                    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                        <App />
                    </FirebaseAppProvider>
                </Provider>
            </LocalizationProvider>
        </NextUIProvider>
    </React.StrictMode>
);
