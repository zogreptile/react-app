import React from 'react';

interface IButtonProps {
  children: React.ReactNode;
  onClick: (event?: any) => void;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
};

const Button: React.FC<IButtonProps> = (props) => {
  const {
    children,
    onClick,
    type = 'button',
    disabled,
  } = props;

  return (
    <button
      className="button"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
