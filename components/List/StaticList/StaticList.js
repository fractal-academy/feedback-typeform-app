import { List } from 'antd'
import PropTypes from 'prop-types'
// import { ListItem } from 'components'
import { FormSimpleView } from 'domains/Form/components'

function StaticList(props) {
  const { currentData } = props

  return (
    <List
      dataSource={currentData}
      renderItem={(item) => (
        <FormSimpleView
          id={item?.id}
          key={item?.id}
          title={item?.title}
          imageURL={item?.image}
          subtitle={item?.subtitle}
        />
      )}
    />
  )
}

StaticList.propTypes = {
  currentData: PropTypes.object
}

export default StaticList
