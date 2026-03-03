import React from "react";
import { Input } from "../ui/input";
import FormErrorMessage from "./FormErrorMessage";
import { Field, FieldLabel } from "../ui/field";
import { defaultNumberValidKeys } from "../../constants";

const FormController = ({
  id,
  label,
  name,
  type,
  placeholder,
  value,
  onchange,
  error,
  invalid,
  isNumber = false,
}: {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  invalid: boolean;
  isNumber?: boolean;
}) => {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>

      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        aria-invalid={invalid}
        autoComplete="off"
        className="input-field"
        onKeyDown={(e) => {
          if (isNumber && !defaultNumberValidKeys.includes(e.key)) {
            e.preventDefault();
          }
        }}
      />
      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default FormController;
