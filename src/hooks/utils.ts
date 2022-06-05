import { Deps } from '../types'

export function areHookInputsEqual(
  nextDeps: Deps,
  prevDeps: Deps
): boolean {
  if (!prevDeps || !nextDeps) return false
  if (prevDeps.length !== nextDeps.length) return false

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (nextDeps[i] === prevDeps[i]) {
      continue
    }
    return false
  }

  return true
}
