import React from 'react';
import './OutlinedButton.css';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  wideBtn?: boolean;
  type?: 'submit' | 'button';
  light?: boolean;
  loading?: boolean;
}

export const OutlinedButton = ({
  text,
  onClick,
  wideBtn = false,
  type = 'button',
  light = false,
  loading = false,
}: IButtonProps): JSX.Element => {
  let classListItems = 'outlinedButton';
  if (wideBtn) {
    classListItems += ' wideBtn';
  }

  if (light) {
    classListItems += ' lightBtn';
  }

  return (
    <button
      className={classListItems}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {text}
    </button>
  );
};
