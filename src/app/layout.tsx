"use client";
import { CssBaseline } from "@mui/material";
import store from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
         
            <CssBaseline /> {/* Resetea los estilos para que MUI se vea bien */}
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </Provider>
      </body>
    </html>
  );
}
