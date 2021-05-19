import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './QuestionLayoutSwitcher.styles'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'

const menuMap = [
  { icon: <AlignLeftOutlined />, layoutType: LAYOUT_TYPE_KEYS[0] },
  { icon: <PicCenterOutlined />, layoutType: LAYOUT_TYPE_KEYS[1] },
  { icon: <MenuUnfoldOutlined />, layoutType: LAYOUT_TYPE_KEYS[2] },
  { icon: <PicLeftOutlined />, layoutType: LAYOUT_TYPE_KEYS[3] },
  {
    icon: <MenuUnfoldOutlined style={{ transform: 'scaleX(-1)' }} />,
    layoutType: LAYOUT_TYPE_KEYS[4]
  },
  { icon: <PicRightOutlined />, layoutType: LAYOUT_TYPE_KEYS[5] },
  { icon: <ProfileFilled />, layoutType: LAYOUT_TYPE_KEYS[6] }
]

function QuestionLayoutSwitcher(props) {
  const { onChange, defaultActive } = props

  return (
    <Menu style={styles.menuStyle} selectedKeys={defaultActive}>
      {menuMap.map((item) => (
        <Menu.Item
          key={item.layoutType}
          icon={item.icon}
          onClick={onChange}
          style={styles.menuItemStyle}
        />
      ))}
    </Menu>
  )
}

QuestionLayoutSwitcher.propTypes = {
  onChange: PropTypes.func,
  defaultActive: PropTypes.string
}

export default QuestionLayoutSwitcher
