import { createContext, useContext } from 'react';

const MessageContext = createContext();

const useMessage = () => useContext(MessageContext);

const MessageProvider = (props) => <MessageContext.Provider {...props} />;

export default useMessage;
export { MessageProvider };
