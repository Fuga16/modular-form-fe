import {
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';

import styles from './MultiSelect.module.css';
import type { MultiSelectProps } from './MultiSelect.types';
import { Checkbox, Tooltip } from '@/design-system';

/**
 * Multiple-choice dropdown with a checkbox per option.
 *
 * The trigger is a button with `aria-expanded` and `aria-controls`. The dropdown
 * is a labelled group of checkboxes, so each option is a native checkbox for
 * keyboard and screen reader users. The dropdown closes on a click outside,
 * or on Escape, which returns focus to the trigger.
 */
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
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const valueId = `${generatedId}-value`;
  const dropdownId = `${generatedId}-dropdown`;
  const helperId = `${generatedId}-help`;

  const isExpanded = isOpen && !disabled;
  const message = error ?? helperText;
  const hasError = Boolean(error);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !isExpanded) return;

    // Stops the event before it reaches the Modal or Drawer listener on document,
    // so Escape closes only the dropdown.
    event.stopPropagation();
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleToggle = (optionValue: string) => {
    const isSelected = value.includes(optionValue);

    onChange(
      isSelected
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue],
    );
  };

  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label),
    [options, value],
  );

  const displayValue =
    selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder;

  return (
    <div className={styles.field}>
      {label ? (
        <div className={styles.labelRow}>
          <span
            id={labelId}
            className={styles.label}
          >
            {label}
          </span>
          {tooltip ? <Tooltip content={tooltip} /> : null}
        </div>
      ) : null}

      <div
        ref={wrapperRef}
        className={styles.wrapper}
        onKeyDown={handleKeyDown}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          disabled={disabled}
          aria-expanded={isExpanded}
          aria-controls={dropdownId}
          aria-invalid={hasError}
          aria-describedby={message ? helperId : undefined}
          aria-labelledby={label ? `${labelId} ${valueId}` : valueId}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            id={valueId}
            className={styles.value}
          >
            {displayValue}
          </span>
          <span
            aria-hidden="true"
            className={clsx(styles.chevron, isExpanded && styles.chevronOpen)}
          />
        </button>

        {isExpanded ? (
          <div
            id={dropdownId}
            role="group"
            aria-labelledby={label ? labelId : valueId}
            className={styles.dropdown}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.option}
              >
                <Checkbox
                  label={option.label}
                  checked={value.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {message ? (
        <p
          id={helperId}
          className={clsx(styles.helper, hasError && styles.helperError)}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
