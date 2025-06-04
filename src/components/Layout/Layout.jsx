import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 140px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}