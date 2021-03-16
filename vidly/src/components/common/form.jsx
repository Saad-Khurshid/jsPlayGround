import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  validate = () => {
    const { data } = this.state;

    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const schema = {
      [name]: this.schema[name],
    };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return null;
    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };

  renderInput = (label, name, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (label, name, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
