import React, { FC, ComponentClass } from 'react'
import { bindContextIns, runEffect, runDestroyEffect } from './hooks'
import { Hook, Effect } from './types'

export default function bindHooks(FuncComponent: FC): ComponentClass {
  class HooksComponent extends React.Component<any, {
    updateKey: number;
  }> {
    renderCount: number;
    hook: null | Hook;
    workInHook: null | Hook;
    effect: null | Effect;

    constructor(props) {
      super(props)

      // 记录渲染次数，大于2次时保持不变
      this.renderCount = 0

      // hook 链条
      this.hook = null
      // 正在处理的 hook
      this.workInHook = null
      // effect 链条
      this.effect = null

      this.state = {
        // 更新 key，触发更新
        updateKey: 0,
      }
    }

    update() {
      this.setState(prevState => {
        const v = prevState.updateKey + 1;
        return {
          ...prevState,
          updateKey: v === 10000 ? 0 : 1,
        };
      });
    }

    componentDidMount(): void {
      runEffect(this.effect)
    }

    componentDidUpdate(): void {
      runEffect(this.effect)
    }

    componentWillUnmount(): void {
      runDestroyEffect(this.effect)
    }

    render() {
      if (this.renderCount < 2) {
        this.renderCount += 1;
      }

      // 当渲染进行时，绑定函数组件的上下文
      bindContextIns(
        this,
        this.renderCount === 1
      )

      return <FuncComponent {...this.props} />
    }
  }

  return HooksComponent
}
