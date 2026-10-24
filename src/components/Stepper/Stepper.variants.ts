import type { Theme } from '@/design-system/theme/theme'
import type { StepStatus } from './Stepper.types'

type ThemeColorKey = keyof Theme['colors']

/** Circle background/text color keys (theme.colors) mapped by step status. */
export const stepStatusColors: Record<
  StepStatus,
  { background: ThemeColorKey; color: ThemeColorKey }
> = {
  completed: { background: 'success', color: 'surface' },
  active: { background: 'primary', color: 'surface' },
  locked: { background: 'border', color: 'inkMuted' },
}
