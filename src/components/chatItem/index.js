import PropTypes from 'prop-types';
import { useLayout } from '~/context';
import { classNames } from '~/utils';
import Avatar from '../avatar';
import Typing from '../typing';

const ChatItem = ({ active, typing }) => {
    const { setShowChat } = useLayout();

    return (
        <div
            className={classNames(
                'rounded cursor-pointer px-2.5 dl:px-5 py-1.5 dl:py-4 flex items-center gap-2.5 dl:gap-4 transition-all duration-400 hover:bg-light dark:hover:bg-dark-separate',
                active && 'bg-light dark:bg-dark-separate',
            )}
            onClick={() => setShowChat(true)}
        >
            <Avatar
                status="ONLINE"
                src="https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="flex-1 flex justify-between">
                <div className="">
                    <h5 className="text-mm font-semibold mb-1 line-clamp-1">Patrick Hendricks</h5>
                    {(typing && <Typing />) || (
                        <p className="text-sm text-secondary dark:text-dark-secondary line-clamp-1">
                            hey! there I'm available
                        </p>
                    )}
                </div>
                <div>
                    <span className="text-ex text-secondary dark:text-dark-secondary">02:50 PM</span>
                    <div className="ml-auto w-fit px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[1.6] text-danger bg-danger bg-opacity-20">
                        01
                    </div>
                </div>
            </div>
        </div>
    );
};

ChatItem.propTypes = {
    active: PropTypes.bool,
    typing: PropTypes.bool,
};

export default ChatItem;
