import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  DateRangePicker,
  type DateRangePickerProps,
} from '@/components/DateRangePicker';

/** Fixed "today" so the initial month is predictable. */
const TODAY = new Date('2026-01-15T12:00:00');

/** Replaces `window.matchMedia` so the mobile and desktop layouts can be chosen per test. */
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

function renderPicker(props: Partial<DateRangePickerProps> = {}) {
  const onChange = props.onChange ?? vi.fn();
  const user = userEvent.setup();

  const view = render(
    <DateRangePicker
      label="Period"
      value={{ from: '', to: '' }}
      {...props}
      onChange={onChange}
    />,
  );

  return { ...view, user, onChange };
}

const getField = () =>
  screen.getByRole('textbox', { name: 'Period' }) as HTMLInputElement;

const getDay = (iso: string) => {
  const day = document.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`);

  if (!day) {
    throw new Error(`Day ${iso} is not rendered`);
  }

  return day;
};

const queryPopup = () =>
  screen.queryByRole('dialog', { name: 'Choose date range' });

const getClearButton = () => screen.getByRole('button', { name: 'Clear' });

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'], now: TODAY });
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('DateRangePicker: range selection', () => {
  it('opens the popup when the field is clicked', async () => {
    const { user } = renderPicker();

    await user.click(getField());

    expect(queryPopup()).not.toBeNull();
    expect(getField().getAttribute('aria-expanded')).toBe('true');
  });

  it('commits the range after two clicks and closes the popup', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));
    await user.click(getDay('2026-01-10'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-05',
      to: '2026-01-10',
    });
    expect(queryPopup()).toBeNull();
  });

  it('does not report anything after the first click', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Pick an end date')).not.toBeNull();
    expect(queryPopup()).not.toBeNull();
  });

  it('shows the picked start date in the field while the end is pending', async () => {
    const { user } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));

    expect(getField().value).toBe('Jan 5, 2026 – …');
  });

  it('swaps the dates when the end is picked before the start', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-10'));
    await user.click(getDay('2026-01-05'));

    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-05',
      to: '2026-01-10',
    });
  });

  it('accepts a range that starts and ends on the same day', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));
    await user.click(getDay('2026-01-05'));

    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-05',
      to: '2026-01-05',
    });
  });

  it('selects the end date in the second visible month', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-20'));
    await user.click(getDay('2026-02-03'));

    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-20',
      to: '2026-02-03',
    });
  });

  it('shows the committed range in the field when it is closed', () => {
    renderPicker({
      value: { from: '2026-01-05', to: '2026-01-10' },
    });

    expect(getField().value).toBe('Jan 5, 2026 – Jan 10, 2026');
  });

  it('shows the placeholder when no range is set', () => {
    renderPicker();

    expect(getField().value).toBe('');
    expect(getField().placeholder).toBe('Select dates');
  });
});

describe('DateRangePicker: min and max', () => {
  it('does not select days outside min and max', async () => {
    const { user, onChange } = renderPicker({
      min: '2026-01-05',
      max: '2026-01-20',
    });

    await user.click(getField());
    await user.click(getDay('2026-01-02'));

    expect(getDay('2026-01-02').getAttribute('aria-disabled')).toBe('true');
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Pick a start date')).not.toBeNull();

    await user.click(getDay('2026-01-05'));
    await user.click(getDay('2026-01-20'));

    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-05',
      to: '2026-01-20',
    });
  });
});

describe('DateRangePicker: clearing', () => {
  it('clears a committed range', async () => {
    const { user, onChange } = renderPicker({
      value: { from: '2026-01-05', to: '2026-01-10' },
    });

    await user.click(getField());
    await user.click(getClearButton());

    expect(onChange).toHaveBeenCalledWith({ from: '', to: '' });
  });

  it('clears a pending start date', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));
    await user.click(getClearButton());

    expect(onChange).toHaveBeenCalledWith({ from: '', to: '' });
    expect(screen.getByText('Pick a start date')).not.toBeNull();
  });
});

describe('DateRangePicker: closing', () => {
  it('closes on an outside click without changing the value', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.click(getDay('2026-01-05'));
    await user.click(document.body);

    expect(queryPopup()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes on Escape and returns focus to the field', async () => {
    const { user, onChange } = renderPicker();

    await user.click(getField());
    await user.keyboard('{Escape}');

    expect(queryPopup()).toBeNull();
    expect(document.activeElement).toBe(getField());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('stops Escape from reaching a surrounding container', async () => {
    const onParentKeyDown = vi.fn();
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <div onKeyDown={onParentKeyDown}>
        <DateRangePicker
          label="Period"
          value={{ from: '', to: '' }}
          onChange={onChange}
        />
      </div>,
    );

    await user.click(getField());
    await user.keyboard('{Escape}');

    expect(queryPopup()).toBeNull();
    expect(onParentKeyDown).not.toHaveBeenCalledWith(
      expect.objectContaining({ key: 'Escape' }),
    );
  });
});

describe('DateRangePicker: keyboard', () => {
  it('opens with Enter from the field', async () => {
    const { user } = renderPicker();

    getField().focus();
    await user.keyboard('{Enter}');

    expect(queryPopup()).not.toBeNull();
  });

  it('moves focus between days with the arrow keys', async () => {
    const { user } = renderPicker({
      value: { from: '2026-01-05', to: '' },
    });

    getField().focus();
    await user.keyboard('{Enter}');

    expect(document.activeElement).toBe(getDay('2026-01-05'));

    await user.keyboard('{ArrowRight}');

    expect(document.activeElement).toBe(getDay('2026-01-06'));
  });

  it('selects a range with the keyboard only', async () => {
    const { user, onChange } = renderPicker();

    getField().focus();
    await user.keyboard('{Enter}');

    // Focus starts on today (2026-01-15). Move to 2026-01-01 and pick the start.
    await user.keyboard('{ArrowUp}{ArrowUp}{Enter}');
    // Move to 2026-01-05 and pick the end.
    await user.keyboard(
      '{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}{Enter}',
    );

    expect(onChange).toHaveBeenCalledWith({
      from: '2026-01-01',
      to: '2026-01-05',
    });
  });
});

describe('DateRangePicker: layout', () => {
  it('shows two months on larger screens', async () => {
    const { user } = renderPicker();

    await user.click(getField());

    expect(screen.getAllByRole('grid')).toHaveLength(2);
  });

  it('shows one month on small screens', async () => {
    mockMatchMedia(true);
    const { user } = renderPicker();

    await user.click(getField());

    expect(screen.getAllByRole('grid')).toHaveLength(1);
  });
});

describe('DateRangePicker: locked and disabled', () => {
  it('does not open when locked, and keeps the value visible', async () => {
    const { user } = renderPicker({
      locked: true,
      value: { from: '2026-01-05', to: '2026-01-10' },
    });

    await user.click(getField());

    expect(queryPopup()).toBeNull();
    expect(getField().getAttribute('aria-expanded')).toBe('false');
    expect(getField().value).toBe('Jan 5, 2026 – Jan 10, 2026');
  });

  it('does not open when disabled', async () => {
    const { user } = renderPicker({ disabled: true });

    await user.click(getField());

    expect(queryPopup()).toBeNull();
  });
});
