import React, { useEffect } from 'react'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import PropTypes from 'prop-types'
import { Box, Col, Row } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import { Spinner } from '../../../../../src/components'
import { StyledTable } from '../../../../domains/Response/components/ResponseTable/ResponseTable.style'

const columns = [
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '50px'
        }}>
        {text}
      </div>
    ),
    title: '#',
    dataIndex: 'order',
    key: 'order',
    sortOrder: 'descend',
    width: '50px'
  },
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '100%'
        }}>
        {text}
      </div>
    ),
    title: 'Question',
    dataIndex: 'questionTitle',
    key: 'questionTitle'
  },
  {
    render: (text, record) => (
      <div
        style={{
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          width: '100%'
        }}>
        {text}
      </div>
    ),
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer'
  }
]

function ResponseTable(props) {
  const { data, loading, isFormQuiz } = props
  const { emptyStateAnswersDescription } = useTranslation()

  useEffect(() => {
    if (isFormQuiz) {
      columns?.push({
        render: (text, record) => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              width: '100%'
            }}>
            {text}
          </div>
        ),
        title: 'Answer Scores',
        dataIndex: 'answerScore',
        key: 'answerScore'
      })
    }
  }, [])

  return (
    <Box display="flex" flex={1} justifyContent="center" overflowX="hidden">
      {loading ? (
        <Spinner width="100%" size="large" />
      ) : (
        <Row width="100%">
          <Col>
            {data?.length > 0 ? (
              <StyledTable
                sortOrder
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
              />
            ) : (
              <EmptyState
                description={
                  emptyStateAnswersDescription || 'Choose answers to display'
                }
              />
            )}
          </Col>
        </Row>
      )}
    </Box>
  )
}

ResponseTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool
}

export default ResponseTable
