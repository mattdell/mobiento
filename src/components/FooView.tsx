import React from 'react';

import Counter from './Counter';

export default function FooView() {
  return (
    <Counter
      counter={5}
      actions={{
        increment: () => alert('increment'),
        decrement: () => alert('decrement')
      }}
    />
  );
}
