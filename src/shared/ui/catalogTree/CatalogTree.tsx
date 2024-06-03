import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { CategoryInternal } from '../../../types/products';
import { SetStateAction, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { setCategory } from '../../../store/slices/productSlice';

const language = 'en-US';
const treeSX = {
  Maxheight: 100,
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
  const dispatch = useAppDispatch();
  const categoriesNotTransfromed = useAppSelector((state) => state.products.categoriesNotTransfromed);
  const [expanded, setExpanded] = useState([] as string[]);
  useEffect(() => {
    const node = categoriesNotTransfromed.find((node) => node.id === selected);
    if (node) {
      if (node.ancestors?.length) setExpanded([node.id]);
      else node.ancestors.reverse().forEach((node) => setExpanded([node.id]));
    }
    if (selected === '') setExpanded([]);
  }, [selected, categories, categoriesNotTransfromed]);

  const renderTree = (cats: CategoryInternal[]) =>
    cats.map((nodes) => (
      <TreeItem
        key={nodes.id}
        itemId={nodes.id}
        label={nodes.name[language]}
        onClick={() => {
          dispatch(setCategory({ categoryId: nodes.id }));
          handleClick(nodes.id);
          if (nodes.children?.length) setExpanded([nodes.id]);
        }}
        sx={{ borderRadius: '5%' }}
      >
        {Array.isArray(nodes?.children) ? renderTree(nodes.children) : ''}
        {/* {nodes.name && nodes.name[language]} */}
      </TreeItem>
    ));
  return (
    <SimpleTreeView
      aria-label='categories tree'
      defaultExpandedItems={['root']}
      sx={treeSX}
      //eslint-disable-next-line
      selected={selected}
      onNodeSelect={(_event: SyntheticEvent<Element, Event>, nodeId: SetStateAction<string>) => {
        setSelected(nodeId as string);
      }}
      expanded={expanded}
    >
      {renderTree(categories)}
    </SimpleTreeView>
  );
};
