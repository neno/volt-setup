import React, { useState } from 'react';

export default function MyButton(): JSX.Element {
  const [count, setCount] = useState(0);

  const getCount = async () => {
    const res = await fetch('http://localhost:8080/count');
    const n = await res.json()

    setCount(n.counter)
  }


  return (
    <button
      className='p-2 bg-blue-500 text-white'
      onClick={getCount}>
        Counter: {count}
    </button>
  );
}
