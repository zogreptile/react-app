import React from 'react';

interface IInputProps {
  id?: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: IInputProps) => {
  return (
    <input
      className={'input'}
      id={props.id || Date.now().toString()}
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default Input;
