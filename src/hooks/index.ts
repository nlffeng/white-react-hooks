import { mountState, updateState } from './use-state'
import { mountEffect, udpateEffect, runEffect, runDestroyEffect } from './use-effect'
import { UseState, UseEffect } from '../types'

const emptyFunction = (): void => {
  console.error(
    '请确定使用了 bindHooks 对 目标函数组件 进行了处理'
  )
}
let useState: UseState = emptyFunction as any
let useEffect: UseEffect = emptyFunction as any

export function bindContextIns(
  parentInstance: any,
  isMount: boolean
): void {
  // 每次 render 时进行初始化
  parentInstance.workInHook = null
  parentInstance.effect = null

  if (isMount) {
    useState = mountState.bind(null, parentInstance)
    useEffect = mountEffect.bind(null, parentInstance)
    return
  }

  useState = updateState.bind(null, parentInstance)
  useEffect = udpateEffect.bind(null, parentInstance)
}

export {
  useState,
  useEffect,
  runEffect,
  runDestroyEffect,
}
