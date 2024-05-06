interface StepThreeProps {
    prevStep: () => void;
  }
  
  const StepThree: React.FC<StepThreeProps> = ({ prevStep }) => {
    return (
      <div>
        <h2>Step 3: Review & Submit</h2>
        {/* Your review information here */}
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={() => alert("Form Submitted!")}>Submit</button>
      </div>
    );
  };
  
  export default StepThree;
  