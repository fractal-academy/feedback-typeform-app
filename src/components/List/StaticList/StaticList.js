import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Empty, Typography } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { ListItem, NewListItem } from '../../../components'
import { useTranslation } from '../../../context/Translation'

function StaticList(props) {
  const {
    data,
    setEdit,
    onClick,
    hasMedia,
    beforeUpload,
    customRequest,
    disableAddButton = true,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  // [ADDITIONAL HOOKS]
  const { emptyDescription, uploadImage, addForm } = useTranslation()

  // [COMPUTED PROPERTIES]
  const columnWidth = data?.[0]?.imageUrl ? 3 : [6, 4, 4, 2]

  return (
    <>
      {data?.length ? (
        <Row display="flex" width="100%" height="fit-content" noGutters>
          {disableAddButton && (
            <Col cw={columnWidth}>
              <NewListItem
                onClick={onClick}
                hasMedia={hasMedia}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
              />
            </Col>
          )}
          {data?.map((item) => (
            <Col key={item.id} cw={columnWidth}>
              <ListItem
                data={item}
                setEdit={setEdit}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Box mt={4} width="100%" display="flex" justifyContent="center">
          <Empty
            description={
              <>
                <Typography>
                  {emptyDescription || "There's nothing here"}
                </Typography>
                {hasMedia ? (
                  <Upload
                    multiple
                    name="file"
                    showUploadList={false}
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}>
                    <Typography.Link onClick={(e) => e.preventDefault()}>
                      {uploadImage || 'Upload image'}
                    </Typography.Link>
                  </Upload>
                ) : (
                  <Typography.Link onClick={onClick}>
                    {addForm || 'Add new form'}
                  </Typography.Link>
                )}
              </>
            }
          />
        </Box>
      )}
    </>
  )
}

StaticList.propTypes = {
  data: PropTypes.array,
  columnWidth: PropTypes.number
}

export default StaticList
