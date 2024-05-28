import React from 'react';

interface SvgCircleIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  selected?: boolean;
}

const SvgCircleIcon: React.FC<SvgCircleIconProps> = ({
  size = 14,
  color = '#d3d3d3',
  strokeWidth = 2,
  selected = false,
}) => {
  return (
    <svg
      width={selected ? size : size * 0.7}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke={color}
        strokeWidth={strokeWidth}
        fill={selected ? color : 'none'}
      />
    </svg>
  );
};

export default SvgCircleIcon;
