import React from 'react';
import Sidebar from "./index";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    console.log(children)
  return (
    <div className="layout">
      {/* <Sidebar /> */}
      <main className="layout__main-content">{children}</main>
    </div>
  );
};

export default BaseLayout;
