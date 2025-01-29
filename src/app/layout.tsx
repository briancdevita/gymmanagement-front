'use client'
import store from "@/store";
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100 text-gray-900`}
      >
          <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
            {children}
            </Provider>
      </body>
    </html>
  );
}
