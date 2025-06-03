import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ALLow_REGISTER_INPUTS } from "./consts";
import React from "react";
import PropsTypes from "prop-types";

function Form({
  children,
  schema,
  defaultValues = {},
  formProps = {},
  onSubmit,
}) {
  const config = {
    defaultValues,
    ...formProps,
  };
  if (schema) {
    config.resolver = yupResolver(schema);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(config);

  const inputs = React.Children.toArray(children).map((child) => {
    if (!ALLow_REGISTER_INPUTS.includes(child.type)) return child;

    return React.cloneElement(child, {
      register: register(child.props.name),
      message: errors[child.props.name]?.message,
    });
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{inputs}</form>;
}

Form.propTypes = {
  children: PropsTypes.node,
  schema: PropsTypes.object,
  defaultValues: PropsTypes.object,
  formProps: PropsTypes.object,
  onSubmit: PropsTypes.func,
};

export default Form;
