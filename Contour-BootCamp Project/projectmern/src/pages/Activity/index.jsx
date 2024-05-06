import { Link } from "react-router-dom";
import { useState } from "react";
import { activityFields } from "../../utils/formFields";
import FormButton from "../../components/FormButton";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { beams } from "../../assets";

const fields = activityFields;
const initialActivityState = Object.fromEntries(fields.map((field) => [field.id, ""]));

export default function ActivityPage() {
  const [activityState, setActivityState] = useState(initialActivityState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setActivityState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(activityState);
    await createActivity();
  };

  const createActivity = async () => {
    try {
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Activity created successfully", data);
        setActivityState(initialActivityState);
      } else {
        const errorData = await response.json();
        console.log("Failed to create activity", errorData);
      }
    } catch (error) {
      console.error("Error occurred during activity creation", error);
    }
  };

  return (
    <>
    <div className="relative h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${beams})` }}>
      <Navbar />
      <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-7 min-w-sm rounded-2xl drop-shadow-2xl bg-gradient-to-bl from-[#73d1eed3] from-20% to-[#55f0f065] to-40%">
          <h2 className="mt-1 font-mono text-3xl text-center text-gray-900">
            Activity
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={activityState[field.id]}
                {...field}
              />
            ))}
            <FormButton handleSubmit={handleSubmit} text="Activity" />
          </form>
          <p className="mt-5 text-sm text-center text-gray-600">
            It is Activity Time{" "}
            <Link to="/activity" className="font-medium text-purple-600 hover:text-purple-500">
              Activity
            </Link>
          </p>
          <div className="absolute bottom-0 left-0 h-[5vw] w-[5vw] rounded-full bg-gradient-to-r from-[#72eeba4b] from-20% to-[#72EEEE] to-100% shadow-gray-400"></div>
        </div>
      </div>
    </div>
    </>
  );
}