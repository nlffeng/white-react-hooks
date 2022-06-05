import { createHook, updateHook } from './hook'
import { areHookInputsEqual } from './utils'
import { Effect, Create, Deps, Destroy, Tag } from '../types'

export function mountEffect(
  parentInstance: any,
  create: Create,
  deps: Deps
): void {
  const hook = createHook(parentInstance)
  const nextDeps = deps === undefined ? null : deps

  hook.memoizedState = pushEffect(
    parentInstance,
    1,
    create,
    null,
    nextDeps
  )
}

export function udpateEffect(
  parentInstance: any,
  create: Create,
  deps: Deps
): void {
  const hook = updateHook(parentInstance)
  const nextDeps = deps === undefined ? null : deps
  const currentHook = parentInstance.workInHook

  const prevEffect: Effect = currentHook.memoizedState
  const prevDeps = prevEffect.deps;
  const destroy = prevEffect.destroy

  if (!areHookInputsEqual(nextDeps, prevDeps)) {
    hook.memoizedState = pushEffect(
      parentInstance,
      1,
      create,
      destroy,
      nextDeps
    )
    return
  }
  hook.memoizedState = pushEffect(
    parentInstance,
    0,
    prevEffect.create,
    destroy,
    prevDeps
  )
}

function pushEffect(
  parentInstance: any,
  tag: Tag,
  create: Create,
  destroy: Destroy,
  deps: Deps
) {
  const effect: Effect = {
    tag,
    create,
    destroy,
    deps,
    next: null,
  }

  let lastEffect = parentInstance.effect as Effect
  if (lastEffect === null) {
    parentInstance.effect = effect.next = effect
  } else {
    const firstEffect = lastEffect.next
    lastEffect.next = effect
    effect.next = firstEffect
    parentInstance.effect = effect
  }

  return effect
}

export function runEffect(effect: Effect): void {
  const lastEffect = effect
  if (lastEffect === null) return
  const firstEffect = lastEffect.next
  let currentEffect = firstEffect

  do {
    const { tag, create, destroy } = currentEffect
    if (tag === 1) {
      if (typeof create === 'function') {
        if (typeof destroy === 'function') {
          destroy()
        }
        const nextDestroy = create()
        currentEffect.destroy = nextDestroy
      }
    }
  } while ((currentEffect = lastEffect.next) !== firstEffect);
}

export function runDestroyEffect(effect: Effect): void {
  const lastEffect = effect
  if (lastEffect === null) return
  const firstEffect = lastEffect.next
  let currentEffect = firstEffect

  do {
    const { destroy } = currentEffect
    if (typeof destroy === 'function') {
      destroy()
    }
  } while ((currentEffect = lastEffect.next) !== firstEffect);
}
