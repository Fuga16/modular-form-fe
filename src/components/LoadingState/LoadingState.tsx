import { Container, Message, Spinner, SpinnerWrapper } from './LoadingState.styles'

import { DEFAULT_LOADING_MESSAGE } from './LoadingState.constants'

import type { LoadingStateProps } from './LoadingState.types'

export function LoadingState({ message = DEFAULT_LOADING_MESSAGE }: LoadingStateProps) {
  return (
    <Container role="status" aria-live="polite" aria-busy="true">
      <SpinnerWrapper aria-hidden="true">
        <Spinner />
      </SpinnerWrapper>

      <Message>{message}</Message>
    </Container>
  )
}
