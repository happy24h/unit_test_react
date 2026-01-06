import {useState } from 'react';

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}