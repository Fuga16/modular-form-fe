import type { KeyboardEvent, MouseEvent } from 'react';

import {
  ActionButton,
  Content,
  Footer,
  Header,
  HeaderInfo,
  IconBox,
  Label,
  Row,
  StatusBadge,
  StyledCard,
  Title,
  Value,
} from './ResourceCard.styles';
import type { ResourceCardProps } from './ResourceCard.types';

/** Clickable summary card representing a single resource. */
export function ResourceCard({
  title,
  information = [],
  status,
  onOpen,
  disabled = false,
  actionLabel = 'Open',
  icon = '📦',
}: ResourceCardProps) {
  const handleOpen = () => {
    if (!disabled) {
      onOpen();
    }
  };

  const handleActionClick = (e: MouseEvent) => {
    e.stopPropagation();
    handleOpen();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <StyledCard
      variant="outline"
      $disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <Header>
        <HeaderInfo>
          <IconBox aria-hidden="true">{icon}</IconBox>

          <div>
            <Title>{title}</Title>

            <StatusBadge $completed={status}>
              {status ? 'Completed' : 'Incomplete'}
            </StatusBadge>
          </div>
        </HeaderInfo>
      </Header>

      <Content>
        {information.filter(Boolean).map(({ label, value }) => (
          <Row key={`${title}-${label}`}>
            <Label>{label}</Label>
            <Value>{value || '-'}</Value>
          </Row>
        ))}
      </Content>

      <Footer>
        <ActionButton
          type="button"
          disabled={disabled}
          onClick={handleActionClick}
        >
          {actionLabel} →
        </ActionButton>
      </Footer>
    </StyledCard>
  );
}

export default ResourceCard;
