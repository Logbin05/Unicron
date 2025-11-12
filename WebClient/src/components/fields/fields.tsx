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

        const baseInput = `
          border-1 rounded-xl p-2 w-full
          focus:outline-none focus:ring focus:ring-offset-0
          transition-all duration-150
        `;

        const colorClass = error
          ? "border-red-400 focus:border-red-500 focus:ring-red-300"
          : "border-gray-300 focus:border-third focus:ring-third active:border-fifth";

        const inputClasses = `${baseInput} ${colorClass} ${
          field.inputClassName ?? ""
        }`;
        const labelClasses = `${field.labelClassName ?? ""} ${
          error ? "text-red-400" : ""
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
                    ${error ? "border-red-400" : ""} ${
                    field.inputClassName ?? ""
                  }
                  `}
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
                <span className={`ml-2 ${error ? "text-red-400" : ""}`}>
                  {field.label}
                </span>
              </label>
            ) : (
              <label className={labelClasses}>
                <div className="flex items-center gap-2">
                  {field.label}
                  {error && (
                    <span className="flex items-center gap-1 text-red-400 text-xs">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12M12 16H12.01M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
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
                  id={field.name}
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
