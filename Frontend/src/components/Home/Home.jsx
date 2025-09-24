import React from "react";
import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";
import Hero from "./Hero";
export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content (grows to fill available space) */}
        <Hero />
        {/* Footer always at bottom */}
        <Footer />
      </div>
    </>
  );
}
