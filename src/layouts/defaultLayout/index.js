import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '~/components/chat';
import Loading from '~/components/loading';
import Navbar from '~/components/navbar';
import config from '~/config';
import { screens } from '~/constants';
import { LayoutProvider } from '~/context';
import { classNames } from '~/utils';

// TODO Check user
/**
 * - User not exist
 *      + accessToken exist
 *          ++ accessToken valid ===> Get User
 *          ++ accessToken invalid
 *              +++ refreshToken valid ==> Get accessToken
 *              +++ refreshToken invalid ==> redirect to Home
 *      + accessToken not exist ==> redirect to Home
 */
const DefaultLayout = ({ children }) => {
    const [showChat, setShowChat] = useState(false);
    const { width } = useWindowSize();
    const { user, loading } = useSelector((state) => state.user);
    const navigation = useNavigate();

    useEffect(() => {
        width > screens.DL && setShowChat(false);
    }, [width]);

    useEffect(() => {
        if (user._id) return;

        if (!user._id && !loading) navigation(config.routes.signIn);
    }, [loading, navigation, user._id]);

    if (loading || !user._id) return <Loading />;

    return (
        <LayoutProvider value={{ setShowChat }}>
            <main className="flex flex-col dl:flex-row h-screen">
                <Navbar />
                <section
                    className={classNames(
                        'relative flex flex-1 dl:order-2 overflow-hidden transition-[z-index]',
                        showChat ? 'z-20' : 'z-1 delay-400 dl:delay-0',
                    )}
                >
                    <div className="flex-shrink-0 relative w-full dl:w-sidebar bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg transition-width ease-linear duration-400">
                        <div className="absolute inset-0 overflow-y-hidden">{children}</div>
                    </div>
                    <div
                        className={classNames(
                            'z-1 fixed dl:relative inset-0 flex-1 transition-transform ease-linear duration-400 bg-white',
                            showChat ? 'translate-x-0' : 'translate-x-full dl:translate-x-0',
                        )}
                    >
                        <Chat />
                    </div>
                </section>
            </main>
        </LayoutProvider>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
