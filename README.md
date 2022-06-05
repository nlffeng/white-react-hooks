# white-react-hooks

React Hooks API 在低版本下的一个实现，可以在 16低版本 下体验新的 React Hooks API

## Install

```shell
npm install white-react-hooks
```

## Usage

使用 bindHooks 函数包装 函数组件 就可以使用 Hooks API 了，如下：

```javascript
import { bindHooks, useState } from 'white-react-hooks'

const Demo = (props) => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count - 1)}> - </button>
      count: {count}
      <button onClick={() => setCount(count + 1)}> + </button>
    </div>
  )
}

export default bindHooks(Demo)
```

## API

- bindHooks
- useState
- useEffect
