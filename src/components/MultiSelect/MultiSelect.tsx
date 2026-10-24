import { useEffect, useMemo, useRef, useState } from 'react'

import { Checkbox } from '@/design-system'

import type { MultiSelectProps } from './MultiSelect.types'

import {
  Arrow,
  Dropdown,
  DropdownItem,
  Field,
  Helper,
  Label,
  LabelRow,
  TooltipIcon,
  Trigger,
  Value,
  Wrapper,
} from './MultiSelect.styles'

export function MultiSelect({
  label,
  tooltip,
  helperText,
  error,
  disabled = false,
  options,
  value,
  onChange,
  placeholder = 'Select options',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = (optionValue: string) => {
    const isSelected = value.includes(optionValue)

    onChange(
      isSelected ? value.filter((item) => item !== optionValue) : [...value, optionValue],
    )
  }

  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label),
    [options, value],
  )

  const displayValue = selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder

  return (
    <Field>
      {label && (
        <LabelRow>
          <Label>{label}</Label>

          {tooltip && (
            <TooltipIcon aria-label={tooltip} data-tooltip={tooltip}>
              i
            </TooltipIcon>
          )}
        </LabelRow>
      )}

      <Wrapper ref={wrapperRef}>
        <Trigger
          type="button"
          disabled={disabled}
          $hasError={Boolean(error)}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Value>{displayValue}</Value>

          <Arrow $open={isOpen}>⌄</Arrow>
        </Trigger>

        {isOpen && !disabled && (
          <Dropdown role="listbox">
            {options.map((option) => (
              <DropdownItem key={option.value} onClick={() => handleToggle(option.value)}>
                <Checkbox
                  label={option.label}
                  checked={value.includes(option.value)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => {}}
                />
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </Wrapper>

      {(helperText || error) && (
        <Helper $hasError={Boolean(error)}>{error ?? helperText}</Helper>
      )}
    </Field>
  )
}
