import React from 'react';

interface SvgCircleIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  selected?: boolean;
  strokeColor?: string;
  modal?: boolean;
}

const SvgCircleIcon: React.FC<SvgCircleIconProps> = ({
  size = 18,
  strokeColor = '#222222',
  color = '#d3d3d3',
  strokeWidth = 2,
  selected = false,
  modal = false,
}) => {
  return (
    <svg
      width={selected ? size : size * 0.6}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke={modal ? (selected ? strokeColor : color) : color}
        strokeWidth={strokeWidth}
        fill={modal ? (selected ? color : strokeColor) : 'none'}
      />
    </svg>
  );
};

export default SvgCircleIcon;
