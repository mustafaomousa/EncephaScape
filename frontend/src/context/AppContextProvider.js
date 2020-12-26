import { createContext } from 'react';
import { useSelector } from 'react-redux';

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const user = useSelector(state => state.session.user);
    return (
        <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>
    )
};

export default AppContextProvider;