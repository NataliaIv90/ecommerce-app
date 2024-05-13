import React from 'react';
import './OutlinedButton.css';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  wideBtn?: boolean;
  type?: 'submit' | 'button';
}

export const OutlinedButton = ({ text, onClick, wideBtn = false, type = 'button' }: IButtonProps): JSX.Element => {
  let classListItems = 'outlinedButton';
  if (wideBtn) {
    classListItems += ' wideBtn';
  }

  return (
    <button
      className={classListItems}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
