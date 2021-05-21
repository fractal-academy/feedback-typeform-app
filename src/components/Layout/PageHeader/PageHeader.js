import React from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../../styles'
import { styles } from './PageHeader.styles'
import { ROUTES_PATHS } from '../../../constants'
import { Button, Divider, Typography } from 'antd'
import { Row, Col, Container } from '@qonsoll/react-design'
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons'
import { generatePath, useHistory, useParams } from 'react-router'

const { Title } = Typography

function PageHeader(props) {
  const { title } = props

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { id } = useParams()

  // [COMPUTED PROPERTIES]
  const formPath = generatePath(ROUTES_PATHS.FORM_SHOW, { id })

  // [CLEAN FUNCTIONS]
  const onFormShow = () => {
    history.push(formPath)
  }

  return (
    <Container>
      <Row pt={4} px={45} noGutters>
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>
        <Col cw="auto" p={0} v="center">
          <Divider type="vertical" style={styles.dividerHeight} />
        </Col>
        <Col p={0} v="center">
          <Title style={globalStyles.resetMargin} level={3}>
            {title}
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Button
            type="text"
            shape="circle"
            icon={<EyeOutlined style={globalStyles.iconSize} />}
            onClick={onFormShow}
          />
        </Col>
      </Row>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageHeader
