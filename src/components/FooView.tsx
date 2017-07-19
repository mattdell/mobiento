import React from 'react';

import Counter from './Counter';

export default function FooView() {
  return (
    <Counter
      counter={5}
      actions={{
        increment: () => null,
        decrement: () => null,
      }}
    />
  );
}
