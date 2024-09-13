import { createContext, useState } from 'react';

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [contextState, setContextState] = useState({
    name: 'John',
    age: 30,
    Image:"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
  });

  return (
    <MyContext.Provider value={{ contextState, setContextState}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };