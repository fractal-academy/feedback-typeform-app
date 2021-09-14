import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { UserOutlined } from '@ant-design/icons'
import { NumberedCard } from '../../../../components'
import { Row, Col, Box, Avatar, Text } from '@qonsoll/react-design'

function ResponseList(props) {
  const { date, user, index, onClick } = props

  // [CLEAN FUNCTIONS]
  const onItemClick = () => {
    onClick?.(user, date)
  }

  // [COMPUTED PROPERTIES]
  const formattedDate = moment(date.toDate(), 'YYYYMMDD').fromNow()

  return (
    <Box my={2} onClick={onItemClick}>
      <NumberedCard number={index + 1}>
        <Row v="center" noGutters>
          <Col cw="auto" ml={2} mr={3}>
            <Avatar size={44} icon={<UserOutlined />} />
          </Col>
          <Col>
            <Text variant="h4" color="var(--qf-font-color-accent)">
              {user}
            </Text>
            <Text color="var(--qf-font-color-caption1)">{formattedDate}</Text>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

ResponseList.propTypes = {
  date: PropTypes.object,
  user: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func
}

export default ResponseList
