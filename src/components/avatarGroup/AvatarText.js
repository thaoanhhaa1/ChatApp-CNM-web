import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const AvatarText = ({ text, size = '32px', className }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={classNames(
                'rounded-full border border-white dark:border-[#232526] flex items-center justify-center text-[11px] text-[#7589a3] bg-[#e6e8ea]',
                className,
            )}
        >
            {text}
        </div>
    );
};

AvatarText.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
};

export default AvatarText;
