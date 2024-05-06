const signinFields = [
  {
    id: "email-address",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "Email address",
    pattern: "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Password",
    pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
  },
];

const signupFields = [
  {
    id: "username",
    name: "username",
    type: "text",
    isRequired: true,
    placeholder: "Username",
    pattern: "^(?=.{3,20}$)[a-zA-Z]+$"
    ,
  },
  {
    id: "email-address",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "Email address",
    pattern: "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Password",
    pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$",
  },
  {
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    isRequired: true,
    placeholder: "Confirm Password",
    pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$",
  },
];

const activityFields = [
  {
      id: "activitytype",
      name: "Activitytype",
      type: "select",
      isRequired: true,
      placeholder: "Select Activity Type",
      options: [
        { value: "running", label: "Running '\u{1F3C3}'" },
        { value: "bicycle", label: "Bicycle '\u{1F6B2}'" },
        { value: "swimming", label: "Swimming'\u{1F3CA}'" },
        { value: "walking", label: "Walking'\u{1F6B6}'" },
        { value: "hiking", label: "Hiking'\u{1F9D7}'" },
      ],
  },
  {
      id: "description",
      name: "Description",
      type: "textarea",
      isRequired: true,
      placeholder: "Enter Description",
  },
  {
      id: "date",
      name: "Date",
      type: "date",
      isRequired: true,
      placeholder: "Select Date",
  },
  {
      id: "time",
      name: "Time",
      type: "time",
      isRequired: true,
      placeholder: "Select Time",
  },
];


export { signinFields, signupFields, activityFields };
