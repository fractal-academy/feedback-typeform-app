import { List } from 'antd'
import arrayMove from 'array-move'
import SortableItem from './SortableItem'
import { Box } from '@qonsoll/react-design'
import SortableContainer from './SortableContainer'
import { useEffect, useMemo, useState } from 'react'

function DragableList(props) {
  const { dataSource, onUpdate, renderItem, sortable = true, ...args } = props

  // [COMPONENT STATE HOOKS]
  const [sortableItems, setSortableItems] = useState([])

  // [CLEAN FUNCTIONS]
  function onSortEnd({ oldIndex, newIndex }) {
    const updatedItems = [...arrayMove(sortableItems, oldIndex, newIndex)]
    setSortableItems(updatedItems)

    if (!onUpdate) return
    onUpdate(
      updatedItems.map((i, index) => ({
        ...dataSource[i],
        order: index
      }))
    )
  }

  // [COMPUTED PROPERTIES]
  const Container = useMemo(() => (sortable ? SortableContainer : Box), [
    sortable
  ])
  const SortableWrapper = useMemo(() => (sortable ? SortableItem : Box), [
    sortable
  ])

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && setSortableItems(Object.keys(dataSource))
    // [CLEAN UP FUNCTION]
    return () => {
      isComponentMounted = false
    }
  }, [dataSource])

  return (
    <Container onSortEnd={onSortEnd} useDragHandle>
      <List
        {...args}
        dataSource={sortableItems}
        renderItem={(item, index) => (
          <SortableWrapper key={`item-${index}`} index={index}>
            {renderItem ? renderItem(dataSource[item], index) : item}
          </SortableWrapper>
        )}
      />
    </Container>
  )
}

export default DragableList
