import type { GeneralInfo } from '@/api/types';

/** Values of the general information form. The resource name is set at creation and is not editable here. */
export type GeneralInfoFormValues = Omit<GeneralInfo, 'name'>;
