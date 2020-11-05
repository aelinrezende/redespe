import React from 'react';

const currentAccountContext = React.createContext<(string|Function)[]>(["", () => {}]);

export default currentAccountContext;