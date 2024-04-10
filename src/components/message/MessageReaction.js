import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import images from '~/assets/images';
import { useMessage } from '~/context';
import { classNames } from '~/utils';

const MessageReaction = ({ className }) => {
    const { statuses } = useMessage();
    const { reacts, count } = useMemo(() => {
        const reacts = [];

        statuses.forEach((item) => item && reacts.push(item.react));

        return {
            reacts: [...new Set(reacts)],
            count: reacts.length,
        };
    }, [statuses]);

    if (!count) return null;

    const width = Math.ceil(count / 10);

    return (
        <div
            className={classNames(
                'flex items-center p-[1px] bg-white dark:bg-dark-popup-bg rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
                className,
            )}
        >
            {reacts.map((react) => (
                <div key={react} className="px-[1px]">
                    <LazyLoadImage alt={react} src={images[react]} className="w-4 h-4" />
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

MessageReaction.propTypes = {
    className: PropTypes.string,
};

export default memo(MessageReaction);
