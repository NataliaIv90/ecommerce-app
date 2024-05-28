import { FC } from 'react';

interface IRateStarIconProps {
  isYellow?: boolean;
}

export const RateStarIcon: FC<IRateStarIconProps> = ({ isYellow }) => (
  <svg
    width='25'
    height='23'
    viewBox='0 0 25 23'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11.2543 1.16155L8.42014 6.90807L2.079 7.83255C0.941844 7.99748 0.486115 9.39939 1.31077 10.2023L5.89844 14.6728L4.81337 20.9879C4.61806 22.1294 5.82032 22.9845 6.82726 22.4506L12.5 19.4688L18.1727 22.4506C19.1797 22.9801 20.3819 22.1294 20.1866 20.9879L19.1016 14.6728L23.6892 10.2023C24.5139 9.39939 24.0582 7.99748 22.921 7.83255L16.5799 6.90807L13.7457 1.16155C13.2379 0.137242 11.7665 0.124221 11.2543 1.16155Z'
      fill={isYellow ? '#F5ED20' : '#d3d3d3'}
    />
  </svg>
);
