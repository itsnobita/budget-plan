
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import React from "react";

export const metadata = {
    title: 'Budget Tracker',
    description: 'Track budget.',
  };

  
  export default async function RootLayout({ children }) {
    return (
      <html lang="en" >
        
          <body className={inter.className}>
            {children}
          </body>
        
      </html>
    );
  }
