import { Box } from '@qonsoll/react-design'
import { Spin } from 'antd'
import React from 'react'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import ResponseListItem from './ResponseListItem'
import { useTranslation } from '../../../../context/Translation'
import PropTypes from 'prop-types'
import moment from 'moment'

function ResponseList(props) {
  const { userAnswerGroup, loading, onListItemClick } = props
  const { emptyStateDescription } = useTranslation()

  const sortedUserAnswerGroup = userAnswerGroup?.sort(
    (a, b) =>
      moment(a.date.toDate()).format('x') - moment(b.date.toDate()).format('x')
  )
  return (
    <Box display="flex" flex={1} flexDirection="column" alignItems="center">
      {loading ? (
        <Box display="flex" flex={1} alignItems="center">
          <Spin size="large" />
        </Box>
      ) : (
        <>
          {sortedUserAnswerGroup?.length > 0 ? (
            sortedUserAnswerGroup?.map((item, index) => (
              <ResponseListItem
                key={index}
                index={index}
                user={item.user}
                date={item.date}
                onClick={onListItemClick}
              />
            ))
          ) : (
            <EmptyState
              description={
                emptyStateDescription ||
                "This form doesn't have any responses yet"
              }
            />
          )}
        </>
      )}
    </Box>
  )
}

ResponseList.propTypes = {
  userAnswerGroup: PropTypes.array,
  loading: PropTypes.bool,
  onListItemClick: PropTypes.func
}

export default ResponseList
