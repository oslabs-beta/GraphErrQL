import React, { createContext, useState } from 'react';

export const LiveContext = createContext({});

// export const LiveContextProvider = ({ children }) => {
//   //   const [info, setInfo] = useState({
//   //     uri: '',
//   //     body: '',
//   //     variables: '',
//   //     response: '',
//   //     extensions: '',
//   //     queryTime: '',
//   //     resolverTime: '',
//   //     graphData: [],
//   //   });

//   return (
//     <LiveContext.Provider value={useState('')}>{children}</LiveContext.Provider>
//   );
// };
