import { useState } from 'react';
import { ChatProvider } from '~/context';
import Body from './body';
import Footer from './footer';
import Header from './header';
import Profile from './profile';

const Chat = () => {
    const [showProfile, setShowProfile] = useState(false);

    const handleHideProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);

    return (
        <ChatProvider value={{ showProfile, handleHideProfile, handleShowProfile }}>
            <div className="flex h-full shadow-navbar z-1 dark:bg-dark">
                <div className="w-full flex flex-col flex-1">
                    <Header />
                    <Body />
                    <Footer />
                </div>
                {showProfile && <Profile />}
            </div>
        </ChatProvider>
    );
};

Chat.propTypes = {};

export default Chat;
