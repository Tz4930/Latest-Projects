export const menuItemValidation = async (data) => {
    let isValid = true
    let errors = {};
    if (!data["name"]) {
        isValid = false
        errors["name"] = "*Field is required";
      } 
      // if (!data["description"]) {
      //   isValid = false
      //   errors["description"] = "*Field is required";
      // }
      // if (data["categories"].length === 0) {
      //   isValid = false
      //   errors["categories"] = "*Field is required";
      // }
      if (!data["price"]) {
        isValid = false
        errors["price"] = "*Field is required";
      }
      if (data && data.variations) {
        let variationsErrors = [];
        let isVariationsValid = true;
        data.variations.forEach((element) => {
          let errorVariation = { name: "", description: "",  price: "" };
          if (!element.name || element.name === "") {
            isValid = false;
            isVariationsValid = false;
            errorVariation.name = "*Field Is Required";
          }
          // if (!element.description || element.description === "") {
          //   isValid = false;
          //   isVariationsValid = false;
          //   errorVariation.description = "*Field Is Required";
          // }
          if (!element.price || element.price === "") {
            isValid = false;
            isVariationsValid = false;
            errorVariation.price = "*Field Is Required";
          }
          variationsErrors.push(errorVariation);
        });
        if (!isVariationsValid) {
          errors["variations"] = variationsErrors;
        }
      }

    return {errors: errors, isValid: isValid }
    
}

export const menuItemCategoriesValidation = async (data) => {
  let isValid = true
  let errors = {};
  if (!data["name"]) {
      isValid = false
      errors["name"] = "*Field is required";
    } 
    if (!data["description"]) {
      isValid = false
      errors["description"] = "*Field is required";
    }
    return {errors: errors, isValid: isValid }
}

export const businessCategoriesValidation = async (data) => {
  let isValid = true
  let errors = {};
  if (!data["name"]) {
      isValid = false
      errors["name"] = "*Field is required";
    } 
    if (!data["description"]) {
      isValid = false
      errors["description"] = "*Field is required";
    }
    return {errors: errors, isValid: isValid }
}


export const businessProfileValidation = async (data) => {
  let isValid = true
  let errors = {};
  if (!data["firstName"]) {
      isValid = false
      errors["firstName"] = "*Field is required";
    } 
    if (!data["lastName"]) {
      isValid = false
      errors["lastName"] = "*Field is required";
    }
    if (!data["name"]) {
      isValid = false
      errors["name"] = "*Field is required";
    } 
    if (!data["description"]) {
      isValid = false
      errors["description"] = "*Field is required";
    }
    if (!data["address"]) {
      isValid = false
      errors["address"] = "*Field is required";
    } 
    if (!data["whatsAppNumber"]) {
      isValid = false
      errors["whatsAppNumber"] = "*Field is required";
    }
    return {errors: errors, isValid: isValid }
}

export const registerValidation = async (data) => {
  let isValid = true
  let errors = {};
  if(!data["email"]) {
    isValid = false
    errors["email"] = "*Field is required";
  }
  if (data["email"] !== "") {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(data["email"])) {
      isValid = false;
      errors["email"] = "*Please enter valid email.";
    }
  }
  if(!data["password"]) {
    isValid = false
    errors["password"] = "*Field is required";
  } else if (data["password"].length < 8) {
    isValid = false
    errors["password"] = "password must be at least 8 characters";
  } else if (!data["password"].match(/\d/) || !data["password"].match(/[a-zA-Z]/)) {
    errors["password"] = "password must contain at least 1 letter and 1 number";
  }
  if(!data["confirmPassword"]) {
    isValid = false
    errors["confirmPassword"] = "*Field is required";
  } else if(data["password"] && data["password"] !== data["confirmPassword"]) {
    isValid = false
    errors["confirmPassword"] = "*Password Not match";
  }
  return {errors: errors, isValid: isValid }
}

export const loginValidation = (data) => {
  let isValid = true
  let errors = {};
  if(!data["email"]) {
    isValid = false
    errors["email"] = "*Field is required";
  }
  if (data["email"] !== "") {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(data["email"])) {
      isValid = false;
      errors["email"] = "*Please enter valid email.";
    }
  }
  if(!data["password"]) {
    isValid = false
    errors["password"] = "*Field is required";
  }
  return {errors: errors, isValid: isValid }
}
