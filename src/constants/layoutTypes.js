import React from 'react'
import {
  PicCenterOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  ProfileFilled,
  MenuUnfoldOutlined
} from '@ant-design/icons'
const smallImageSize = { width: '50%', height: '50%' }
const imageFullSize = { width: '100%', height: '100%' }
const imageBetweenSize = { width: '150px', height: '200px' }

const LAYOUT_TYPES = {
  DEFAULT: { type: 'default', icon: <AlignLeftOutlined /> },
  BETWEEN: {
    type: 'Between',
    imgSize: imageBetweenSize,
    icon: <PicCenterOutlined />
  },
  LEFT_SIDE_SMALL: {
    type: 'Left side small',
    imgSize: smallImageSize,
    imageOrder: 1,
    icon: <MenuUnfoldOutlined />
  },
  LEFT_SIDE_BIG: {
    type: 'Left side big',
    imgSize: imageFullSize,
    imageOrder: 1,
    icon: <PicLeftOutlined />
  },
  RIGHT_SIDE_SMALL: {
    type: 'Right side small',
    imgSize: smallImageSize,
    imageOrder: 3,
    icon: <MenuUnfoldOutlined style={{ transform: 'scaleX(-1)' }} />
  },
  RIGHT_SIDE_BIG: {
    type: 'Right side big',
    imgSize: imageFullSize,
    imageOrder: 3,
    icon: <PicRightOutlined />
  },
  FULL_SCREEN: {
    type: 'Fullscreen',
    icon: <ProfileFilled />
  }
}

const LAYOUT_TYPE_KEYS = Object.keys(LAYOUT_TYPES)
const LAYOUT_TYPE_VALUES = Object.values(LAYOUT_TYPES)

export { LAYOUT_TYPE_KEYS, LAYOUT_TYPE_VALUES }
export default LAYOUT_TYPES
