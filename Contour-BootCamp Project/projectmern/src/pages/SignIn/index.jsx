import { Link } from "react-router-dom";
import { useState } from "react";
import { signinFields } from "../../utils/formFields.js";
import FormButton from "../../components/FormButton.jsx";
import RememberMe from "./RememberMe";
import Input from "../../components/Input.jsx";
import Navbar from "../../components/Navbar.jsx";
import { beams, monkey1, monkey2, monkey3 } from "../../assets";

const SigninPage = () => {
  const [signinState, setSigninState] = useState({});
  const [selectedMonkey, setSelectedMonkey] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSigninState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signinState)
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signin successful", data);
      } else {
        const errorData = await response.json();
        console.log("Authentication failed", errorData);
      }
    } catch (error) {
      console.error("Error occurred during authentication", error);
    }
  };

  const handleInputClick = (id) => {
    setSelectedMonkey(id);
  };

  const monkeyImage = () => {
    switch (selectedMonkey) {
      case "email-address":
        return <img src={monkey2} alt="Monkey 2" />;
      case "password":
        return <img src={monkey3} alt="Monkey 3" />;
      default:
        return <img src={monkey1} alt="Monkey 1" />;
    }
  };

  return (
    <>
      <div
        className="relative h-screen bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${beams})` }}
      >
        <Navbar />
        <div className="flex items-center justify-center ">{monkeyImage()}</div>
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-7 min-w-sm rounded-2xl drop-shadow-2xl bg-gradient-to-bl from-[#a6fcfc] from-20% to-[#55f0f065] to-40%">
            <h2 className="mt-1 font-mono text-3xl text-center text-gray-900">
              SignIn
            </h2>
            <form className="mx-4 space-y-4" onSubmit={handleSubmit}>
              {signinFields.map((field) => (
                <div key={field.id} onClick={() => handleInputClick(field.id)}>
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={signinState[field.id] || ""}
                  {...field}
                />
                </div>
              ))}
              <RememberMe />
              <FormButton handleSubmit={handleSubmit} text="Signin" />
            </form>
            <p className="mt-5 text-sm text-center text-gray-600">
              Do not have an account yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Signup
              </Link>
            </p>
            <div className="absolute bottom-0 left-0 h-[5vw] w-[5vw] rounded-full bg-gradient-to-r from-[#72eeba4b] from-20% to-[#72EEEE] to-100% shadow-gray-400"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
