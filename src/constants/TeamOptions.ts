export const TEAM_OPTIONS = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
] as const

export type TeamMember = (typeof TEAM_OPTIONS)[number]

export const SELECT_TEAM_OPTIONS = TEAM_OPTIONS.map((value) => ({
  value,
  label: value,
}))
