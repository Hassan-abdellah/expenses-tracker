import { NumericFormat } from "react-number-format";
import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import FormErrorMessage from "./FormErrorMessage";
const NumericInput = ({
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
  onchange: (value: string | "") => void;
  error: string | undefined;
  invalid: boolean;
}) => {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>
      <NumericFormat
        id={id}
        name={name}
        value={value}
        className="input-field"
        placeholder={placeholder}
        aria-invalid={invalid}
        thousandSeparator=","
        valueIsNumericString={true}
        allowNegative={false}
        onValueChange={(values) => {
          const { formattedValue } = values;
          if (onchange) {
            onchange(formattedValue ? formattedValue : "");
          }
        }}
        customInput={Input}
        // for decimal sperator
        decimalScale={2}
        // for readonly component
        isAllowed={() => true}
        displayType={"input"}
      />
      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default NumericInput;
