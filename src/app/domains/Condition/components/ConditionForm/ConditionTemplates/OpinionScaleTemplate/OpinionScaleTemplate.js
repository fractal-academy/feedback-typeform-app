import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import Search from 'antd/es/input/Search'

const { Option, OptGroup } = Select
const mockQuestionListRedirect = [
  'Go to the next question',
  'Yes/no question example',
  'Picture choice question example',
  'Short text question example',
  'Date question example'
]

function OpinionScaleTemplate(props) {
  const { answers, onChange, questionList } = props
  let startLetter = 65

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              // width="300px"
              key={index}
              p={2}
              mr={2}
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Button type="outline" style={{ marginRight: '10px' }}>
                <Text strong>{String.fromCharCode(startLetter++)}</Text>
              </Button>
              {item}
            </Box>
          </Col>
          <Col mr>
            <Box display="flex" border="1px solid #bbbbbb" borderRadius="4px">
              <Select
                showSearch
                allowClear
                bordered={false}
                onChange={onChange}
                defaultValue={mockQuestionListRedirect[0]}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '48px'
                }}>
                <Button>
                  <Text strong>Submit form</Text>
                </Button>
                <OptGroup label="JUMP TO...">
                  {questionList.map((item, index) => (
                    <Option key={index} value={item.name} onClick={() => {}}>
                      {item.name}
                    </Option>
                  ))}
                </OptGroup>
                {/*<Search />*/}
              </Select>
            </Box>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default OpinionScaleTemplate
