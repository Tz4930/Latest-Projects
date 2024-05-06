"use client";
import React, { useState } from "react";
import { Col, Row } from "antd";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import InputField from "@/components/InputBox/InputFeild";
import useAuthRedirect from "@/utils/useAuthRedirect";
import Swal from 'sweetalert2';
const Login: React.FC = () => {
  // useEffect(()=>{
  //   return useAuthRedirect();
  //     },[])
  useAuthRedirect();
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues; // Destructure the email and password from formValues
    try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // Use the destructured values
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Login successful:", data);
            localStorage.setItem("token", data.token); // Assuming the response includes a token
            // Display success notification
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You have successfully logged in!',
          });
            window.location.href = "/"; // Redirect on successful login
        } else {
            console.error("Login failed:", data.message);
            // Display SweetAlert for invalid credentials or unauthorized access
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message || 'Invalid credentials or unauthorized access',
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        // Display SweetAlert for login error
        Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An error occurred while trying to log in. Please try again later.',
        });
    }
};
  return (
    <div className="h-full ">
      <Row className="">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="  ">
            <img className="h-screen w-screen" src="/Login-Img.png" alt="" />
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={12}>
          <form onSubmit={handleSubmit} className="m-8">
            <div className="grid justify-center">
              <div className="flex justify-center ">
                <MdOutlineQrCodeScanner className=" text-[7em] text-green-700" />
              </div>
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="Head"
              >
                Login To Your QR Generator
              </label>
              <label
                className="block text-center text-gray-400 text-[12px] font-bold mb-2"
                htmlFor="Head2"
              >
                Enter your Log-In Credentials.
              </label>
            </div>
            <div className="px-16 grid h-full items-center">
              <label
                className="text-black text-xl not-italic font-medium leading-7 font-manrope"
                htmlFor="Email"
              >
                Email
              </label>
              <InputField
                type="email"
                name="email"
                placeholder="username@gmail.com"
                value={formValues.email}
                onChange={handleInputChange}
                className=" border rounded-[10px] border-solid border-[#BCBEC0] h-[50px]"
              />
              <br />
              <label
                className="text-black text-xl not-italic font-medium leading-7 font-manrope"
                htmlFor="Password"
              >
                Password
              </label>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
                className=" border rounded-[10px] border-solid border-[#BCBEC0] h-[50px]"
              />
              <div className="flex justify-center my-12 w-full">
                <button
                  type="submit"
                  className=" mr-[12px] w-full h-[50px] bg-[#00BFFF] text-green-100 py-2 px-8 rounded-[10px] focus:outline-none transition-colors duration-200 font-manrope"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
