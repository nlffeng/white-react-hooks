import { createHook, updateHook } from './hook'
import { UpdateQueue, Update } from '../types'

export function mountState(parentInstance: any, initialState: any): [any, any] {
  const hook = createHook(parentInstance)

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  hook.memoizedState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
  });

  const dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    parentInstance,
    queue,
  ));

  return [hook.memoizedState, dispatch];
}

export function updateState(parentInstance: any, initialState: any): [any, any] {
  const hook = updateHook(parentInstance)
  const queue = hook.queue

  const pending = queue.pending

  if (pending !== null) {
    let newState = hook.memoizedState
    const firstUpdate = pending.next
    let update = firstUpdate

    do {
      newState = typeof update.action === 'function' ? update.action(newState) : update.action;
      update = update.next
    } while (update !== firstUpdate);

    hook.memoizedState = newState
    hook.queue.pending = null
  }

  return [hook.memoizedState, queue.dispatch]
}

function dispatchAction<S, A>(
  parentInstance,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  const update: Update<S, A> = {
    action,
    next: null,
  };

  const pending = queue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  parentInstance.update()
}
