import { signal } from '@preact/signals-react'

/** Models */
import { type RateLimit } from '@models/rate-limit.model'

export const sigRateLimit = signal<RateLimit | undefined>(undefined)
