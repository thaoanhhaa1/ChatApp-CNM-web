import PropTypes from 'prop-types';
import { memo } from 'react';
import images from '~/assets/images';
import { classNames } from '~/utils';

const ChatItemReaction = ({ reacts, react, className }) => {
    const count = reacts.length + (react ? 1 : 0);
    const reaction = [...new Set([...reacts, react].filter(Boolean))];
    const width = Math.ceil(count / 10);

    return (
        <div
            className={classNames(
                'flex items-center p-[1px] bg-white dark:bg-dark-popup-bg rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
                className,
            )}
        >
            {reaction.map((react) => (
                <div key={react} className="px-[1px]">
                    <img alt={react} src={images[react]} className="w-4 h-4" />
                </div>
            ))}
            {count > 1 && (
                <span
                    style={{
                        width: `${width}ch`,
                    }}
                    className="min-w-[15px] px-1 text-ex leading-[0] text-secondary dark:text-dark-secondary"
                >
                    {count}
                </span>
            )}
        </div>
    );
};

ChatItemReaction.propTypes = {
    reacts: PropTypes.array.isRequired,
    react: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default memo(ChatItemReaction);
