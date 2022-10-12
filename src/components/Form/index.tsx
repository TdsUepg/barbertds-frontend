import React from "react";
import { useForm, FormProvider } from "react-hook-form";

const Form: React.FC = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, child => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name
                }
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
}

export default Form;
