import { toast } from 'react-toastify'

import { ApiError } from '@/api/client'

export function showSuccessToast(message: string) {
  toast.success(message)
}

export function showErrorToast(error: unknown) {
  const apiError =
    error instanceof ApiError ? error : new ApiError(0, 'Something went wrong.')

  toast.error(apiError.message)
}
