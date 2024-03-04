interface FormError {
  message?: string | undefined
}

interface FormFieldProps
  extends React.HTMLProps<HTMLInputElement> {
  label: string
  registerOptions?: any
  errors?: FormError
  normalize?: (value: string) => string
}

export const FormField = ({
  label,
  name,
  registerOptions,
  errors,
  normalize = (value) => value,
  ...inputProps
}: FormFieldProps) => {
  return (
    <div className="nes-field">
      <label id={`${name}-label`} htmlFor={name}>
        {label}:
      </label>
      <input
        aria-labelledby={`${name}-label`}
        name={name}
        {...inputProps}
        {...registerOptions}
        className={`nes-input ${errors && "is-error"}`}
        onChange={(e) =>
          (e.target.value = normalize(e.target.value))
        }
      />
      {errors && (
        <p className="note nes-text is-error">
          Error: {errors.message}
        </p>
      )}
    </div>
  )
}
