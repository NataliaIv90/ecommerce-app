import React from 'react';
import './OutlinedButton.css';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  wideBtn?: boolean;
}

export const OutlinedButton = ({ text, onClick, wideBtn = false }: IButtonProps): JSX.Element => {
  let classListItems = 'outlinedButton';
  if (wideBtn) {
    classListItems += ' wideBtn';
  }

  return (
    <button
      className={classListItems}
      type='button'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
