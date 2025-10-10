import React, { useState, type ReactElement, type ReactNode } from "react"
import { slugify } from "@/utils/slugify"

export interface InputProps {
  key?: number | string
  icon?: ReactElement | ReactNode
  label: string
  type: "text" | "number" | "email" | "password" | "url" | "name"
  name: string
  initValue?: string | number
  placeholder?: string
  typing?: (data: { prop: string; value: string | number }) => void
}

const InputWrapper: React.FC<InputProps> = ({
  icon,
  label,
  type,
  placeholder,
  initValue = "",
  name,
  typing,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState<string | number>(initValue)

  const labelString = slugify(label)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
    typing?.({ prop: name, value: newValue }) // si existe typing, la ejecuta
  }

  return (
    <div className={`InputWrapper ${isFocused ? "focus" : ""}`}>
      <label htmlFor={labelString}>
        <span>{label}</span>
        <div className="InputProvider">
          {icon && <p>{icon}</p>}
          <input
            onChange={handleChange}
            type={type}
            placeholder={placeholder}
            value={value}
            id={labelString}
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </label>
    </div>
  )
}

export default InputWrapper
