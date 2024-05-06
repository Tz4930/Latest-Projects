// components/Layout.tsx

import Navbar from '@/components/Header';
import Sidebar from '@/components/sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  handleFilter: (status: string) => void;
};

const Layout = ({ children, handleFilter }: LayoutProps) => {
  return (
    <div >
      <Navbar />
      <div className="container flex">
        <Sidebar handleFilter={handleFilter} />
        <div className="content w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;