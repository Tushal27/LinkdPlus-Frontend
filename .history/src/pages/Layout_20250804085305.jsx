import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}