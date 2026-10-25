import { useTheme } from '../../hooks/useTheme';
import type { ThemePreference } from '../../theme/ThemeContext';
import { Button } from '../Button';

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'system', label: 'Как в системе' },
];

export function ThemeSwitcher() {
  const { preference, setTheme } = useTheme();

  return (
    <div>
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={preference === option.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setTheme(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
