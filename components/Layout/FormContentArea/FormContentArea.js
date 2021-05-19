import { Row, Col } from '@qonsoll/react-design'
import { Button } from 'antd'
import './FormContentArea.styles.css'
import PropTypes from 'prop-types'
import MiddleContainer from '../MiddleContainer'
import { ROUTES_PATHS } from 'app/constants'
import { useHistory } from 'react-router'

function FormContentArea(props) {
  const { children, leftSideMenu } = props

  // [ADDITIONAL HOOKS]
  const history = useHistory()

  // [CLEAN FUNCTIONS]
  const onCancel = () => {
    history.push(ROUTES_PATHS.FORMS_ALL)
  }
  const onCreateForm = () => {
    history.push(ROUTES_PATHS.FORMS_ALL)
  }

  return (
    <>
      <Row noGutters display="flex" m={4} height="100%" overflow="auto">
        <Col cw="auto" mr={3}>
          {leftSideMenu}
        </Col>
        <Col
          backgroundColor="white"
          className="content-style custom-scroll"
          p={3}
          overflow="auto">
          <MiddleContainer>{children}</MiddleContainer>
        </Col>
      </Row>
      <Row noGutters h="right" mb={4} mx={4}>
        <Col cw="auto" mr={3}>
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col cw="auto">
          <Button type="primary" onClick={onCreateForm}>
            Create form
          </Button>
        </Col>
      </Row>
    </>
  )
}

FormContentArea.propTypes = {
  leftSideMenu: PropTypes.node,
  children: PropTypes.node
}

export default FormContentArea
