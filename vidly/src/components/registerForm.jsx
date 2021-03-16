import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      name: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    name: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    //send to server
    try {
      await register(this.state.data);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email", "email")}
          {this.renderInput("User Name", "name")}
          {this.renderInput("Password", "password", "password")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
