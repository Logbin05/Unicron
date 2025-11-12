import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

export enum typeInput {
  email = "email",
  text = "text",
  radio = "radio",
  button = "button",
  password = "password",
  checkbox = "checkbox",
}

export type fieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: typeInput;
  required?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  pattern?: RegisterOptions["pattern"];
  validate?: RegisterOptions["validate"];
  minLength?: RegisterOptions["minLength"];
  maxLength?: RegisterOptions["maxLength"];
};

export type fieldsProps<T extends FieldValues> = {
  className?: string;
  register: UseFormRegister<T>;
  fields: fieldConfig<T>[];
  errors?: FieldErrors<T>;
};
