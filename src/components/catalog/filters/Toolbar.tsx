import { Search } from './Search';
import { SortBar } from './Sort';

export const Toolbar: React.FC = () => {
  return (
    <div className='toolbar-inner'>
      <Search />
      <SortBar />
    </div>
  );
};
