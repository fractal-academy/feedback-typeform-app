import { useEffect } from 'react'
import { Badge } from 'antd'
import { styles } from './CustomBadge.styles'
import { CheckOutlined } from '@ant-design/icons'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomBadge(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return <Badge count={<CheckOutlined style={styles.customBadge} />} />
}

CustomBadge.propTypes = {}

export default CustomBadge
