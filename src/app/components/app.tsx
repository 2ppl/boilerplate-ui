import React from 'react';

export const App: React.FC<React.PropsWithChildren> = (props) => (
  <div>
    APP CMP {props.children}
  </div>
);
