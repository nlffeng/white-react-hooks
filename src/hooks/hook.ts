import { Hook } from '../types'

export function createHook(parentInstance: any): Hook {
  const hook: Hook = {
    memoizedState: null,

    queue: null,

    next: null,
  };

  if (parentInstance.workInHook === null) {
    parentInstance.hook = parentInstance.workInHook = hook
  } else {
    parentInstance.workInHook = parentInstance.workInHook.next = hook;
  }

  return hook
}

export function updateHook(parentInstance: any): Hook {
  let currentHook: Hook = null
  if (parentInstance.workInHook === null) {
    currentHook = parentInstance.workInHook = parentInstance.hook
  } else {
    currentHook = parentInstance.workInHook = parentInstance.workInHook.next
  }
  return currentHook;
}
