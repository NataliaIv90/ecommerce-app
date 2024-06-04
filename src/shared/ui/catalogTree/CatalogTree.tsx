import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { CategoryInternal } from '../../../types/products';

const language = 'en-US';
const treeSX = {
  Maxheight: 400,
  maxWidth: 200,
  textAlign: 'start',
  m: 1,
};

export const CatalogTree: React.FC<{
  categories: CategoryInternal[];
  handleClick: (id: string) => void;
  selected: string;
  setSelected: (id: string) => void;
}> = ({ categories, handleClick, selected, setSelected }) => {
  const renderTree = (cats: CategoryInternal[]) =>
    cats.map((nodes) => (
      <TreeItem
        key={nodes.id}
        itemId={nodes.id}
        label={nodes.name[language]}
        onClick={() => {
          handleClick(nodes.id);
        }}
        sx={{ borderRadius: '5%' }}
      >
        {Array.isArray(nodes?.children) ? renderTree(nodes.children) : ''}
      </TreeItem>
    ));
  return (
    <SimpleTreeView
      aria-label='categories tree'
      defaultExpandedItems={['root']}
      sx={treeSX}
      selectedItems={selected}
      onSelectedItemsChange={(_event: React.SyntheticEvent, itemIds: string | null) => {
        return setSelected(itemIds as string);
      }}
    >
      {renderTree(categories)}
    </SimpleTreeView>
  );
};
