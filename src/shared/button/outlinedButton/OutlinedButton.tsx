import React from 'react';
import './OutlinedButton.css';

interface IButtonProps {
  text: string;
  onClick: () => void;
}

export const OutlinedButton = ({ text, onClick }: IButtonProps): JSX.Element => (
  <button
    className={'OutlinedButton'}
    type='button'
    onClick={onClick}
  >
    {text}
  </button>
);
