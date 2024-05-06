import React, { useState } from "react"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import IntlTelInput from 'react-bootstrap-intl-tel-input'

const Example = () => {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState("+92")
  const onChangeHandler = (value) => {
      console.log(value)
      setValue(value.callingCode)
  }
  return (
      <>
    {/* <PhoneInput
      placeholder="Enter phone number"
      value={value}
    //   country="PK"
      onChange={setValue}/> */}
      <IntlTelInput
     preferredCountries={['PK']}
     defaultCountry={'PK'}
     defaultValue={value}
     onChange={(data) => onChangeHandler(data)}
/>
</>
  )
}

export default Example
