const { Signin } = require("../models");

const createSignin= async (signinBody) => {
    return Signin.create(signinBody);
}

module.exports = {
    createSignin,
}
