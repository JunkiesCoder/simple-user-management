import { createContext, useState } from "react";

export const userContext = createContext(null);

export function Context({ children }) {
  const [user, setUser] = useState(null);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
