import { createContext, useContext } from 'react';

const LayoutContext = createContext();

const LayoutProvider = (props) => <LayoutContext.Provider {...props} />;

const useLayout = () => ({ ...useContext(LayoutContext) });

export default useLayout;
export { LayoutProvider };
