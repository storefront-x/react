import { useState } from 'react'

export default function Page() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Click me: {count}!</button>
}
