import React from "react";

import ToastProvider from "@/components/Toast/ToastProvider";

const ProviderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default ProviderLayout;
