import React from 'react';
import './Input.css';
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  placeholder?: string;
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ type, id, placeholder, label, error, ...restProps }, ref) => {
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${'formInput'} ${error ? 'errorInput' : ''}`}
          ref={ref}
          {...restProps}
        />
        <p className={error ? 'error_visibility' : 'error_invisible'}>{error ? error : 'Error'}</p>
      </div>
    );
  }
);

export default Input;
