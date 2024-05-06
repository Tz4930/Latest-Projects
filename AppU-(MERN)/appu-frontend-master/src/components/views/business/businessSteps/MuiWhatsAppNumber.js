import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import MuiPhoneNumber from "material-ui-phone-number";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const styles = {};
const CreateUserDialog = (props) => {
  const { onChangeInput, state } = props;
  //   const [state, setState] = useState({
  //     values: {
  //       phone: "",
  //     },
  //   });
  const handlePhoneChange = (value) => {
    onChangeInput(value, "whatsAppNumber");
  };

  return (
    <>
      <PhoneInput
        id="outlined-basic"
        variant="outlined"
        style={{ width: "100%" }}
        placeholder="+92-345-7400485"
        country={"pk"}
        value={
          state && state.values && state.values.whatsAppNumber
            ? state.values.whatsAppNumber
            : ""
        }
        onChange={(data) => handlePhoneChange(data)}
        // onChange={phone => this.setState({ phone })}
      />
      {/* <MuiPhoneNumber
      name="phone"
      id="outlined-basic"
      variant="outlined"
      style={{width: "100%"}}
      className="whatsAppDropDown"
      focused
      label="WhatsApp Number"
      data-cy="user-phone"
      defaultCountry={"pk"}
      preferredCountries={"pk"}
      value={state && state.values && state.values.whatsAppNumber ? state.values.whatsAppNumber : ""}
      onChange={(data) => handlePhoneChange(data)}
    /> */}
    </>
  );
};
CreateUserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default withStyles(styles)(CreateUserDialog);
