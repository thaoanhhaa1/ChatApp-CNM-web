const { createContext, useContext } = require('react');

const ChatContext = createContext();

export const ChatProvider = (props) => <ChatContext.Provider {...props} />;

const useChat = () => ({ ...useContext(ChatContext) });

export default useChat;
