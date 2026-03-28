import React from "react";
import { StoreProvider } from "@/store/StoreContext";
import AppSwitcher from "./AppSwitcher";

export const metadata = {
  title: "Sudo Coffee // POS & Storefront",
  description: "Unified Order Management System for Sudo Coffee",
};

export default function POSPage() {
  return (
    <StoreProvider>
      <AppSwitcher />
    </StoreProvider>
  );
}
