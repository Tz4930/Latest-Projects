import React,{useState} from "react";
import { Drawer, Button } from "antd";
import {Link} from 'react-router-dom';
import { MenuOutlined } from "@ant-design/icons";
const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const openDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };
  
  return (
    <div className="lg:hidden">
      <div className="xs:w-screen h-[50px] bg-mainBgColor">
        <MenuOutlined
          className=" text-white text-[32px] mt-2 ml-2"
          onClick={openDrawer}
        />
      </div>
      <div>
        <Drawer
          title="DrFitness"
          placement="left"
          onClose={onClose}
          visible={visible}
        >
          <div>
            <Link to="/dashboard">
              <Button type="Ghost"  size="large">
                Dashboard
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/history">
              <Button type="Ghost" size="large">
                History
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/logout">
              <Button type="Ghost" csize="large">
                Logout
              </Button>
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
