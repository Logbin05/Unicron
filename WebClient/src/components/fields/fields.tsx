import type { FieldValues } from "react-hook-form";
import { typeInput, type fieldsProps } from "@entities/ui/fields";

export function Fields<T extends FieldValues>({
  className,
  register,
  fields,
  errors,
}: fieldsProps<T>) {
  return (
    <div className={className}>
      {fields.map((field) => {
        const error = errors?.[field.name];
        const inputClasses = `${field.inputClassName ?? ""} ${
          error ? "!border-fourth" : ""
        }`;
        const labelClasses = `${field.labelClassName ?? ""} ${
          error ? "text-fourth" : ""
        }`;

        return (
          <div key={field.name} className="mb-4">
            {field.type === typeInput.checkbox ? (
              <label
                className={`flex items-center cursor-pointer ${labelClasses}`}
              >
                <input
                  type="checkbox"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  className="peer sr-only"
                />
                <div
                  className={`w-5 h-5 border rounded-sm flex items-center justify-center
                    transition-colors duration-200 lg:cursor-pointer
                    peer-checked:bg-primary peer-checked:border-primary
                    ${error ? "border-secondary" : ""} ${inputClasses}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <span className={`ml-2 ${error ? "text-fourth" : ""}`}>
                  {field.label}
                </span>
              </label>
            ) : (
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  {field.label}
                  {error && (
                    <span className="flex items-center gap-1 text-fourth xs:text-10 sm:text-12 md:text-14 lg:text-12">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-br-secondary-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V12"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16H12.01"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {String(error.message) || "This field is required"}
                    </span>
                  )}
                </div>
                <input
                  type={field.type}
                  {...register(field.name, {
                    pattern: field.pattern,
                    validate: field.validate,
                    required: field.required,
                    minLength: field.minLength,
                    maxLength: field.maxLength,
                  })}
                  className={inputClasses}
                />
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
