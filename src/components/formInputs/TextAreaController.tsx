import React, { Fragment } from "react";
import FormErrorMessage from "./FormErrorMessage";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const TextAreaController = ({
  id,
  label,
  name,
  placeholder,
  value,
  onchange,
  error,
  invalid,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | undefined;
  invalid: boolean;
}) => {
  return (
    <Fragment>
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={id} className="input-label">
          {label}
        </FieldLabel>
        <InputGroup className="input-group">
          <InputGroupTextarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            rows={6}
            className="min-h-24 resize-none"
            aria-invalid={invalid}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="tabular-nums text-muted-black">
              {value.length}/100 characters
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        {invalid && <FormErrorMessage error={error} />}
      </Field>
    </Fragment>
  );
};

export default TextAreaController;
