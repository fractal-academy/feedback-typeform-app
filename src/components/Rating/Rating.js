import React from 'react'
import { Rate, message } from 'antd'
import styled from 'styled-components'
import { Container } from '@qonsoll/react-design'
import typeformTheme from '../../../styles/theme'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'

const StyledRate = styled(Rate)`
  ${({ theme }) => `
  &.ant-rate {
    font-size: 40px;
    color: ${
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
    };
  }
`}
`
function CustomRating(props) {
  const { allowClear, tooltips, onClick, question, currentSlide } = props
  const { questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  // [CLEAN FUNCTIONS]
  const onChange = (value) => {
    const data = { question, answer: { value } }

    onClick && onClick(data)
  }

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        !question?.isRequired
          ? onChange && onChange('')
          : message.error(
              answerRequiredMessageError ||
                'It`s required question, please answer'
            )
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <Container>
      <StyledRate
        autoFocus={false}
        count={questionConfigurations?.length}
        allowClear={allowClear}
        tooltips={tooltips}
        onChange={onChange}
        disabled={!onClick}
      />
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }