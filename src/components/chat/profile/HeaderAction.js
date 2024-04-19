import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const HeaderAction = ({ action, active }) => {
    const Icon = action.icon;

    return (
        <div className="flex flex-col items-center gap-2 p-1 flex-1">
            <Tippy content={action.title}>
                <button
                    onClick={action.onClick}
                    className={classNames(
                        'w-8 h-8 flex justify-center items-center rounded-lg transition-colors',
                        active
                            ? 'text-primary-color bg-primary-color bg-opacity-20'
                            : 'text-primary bg-[#eaedf0] hover:bg-[#dfe2e7]',
                    )}
                >
                    <Icon className="w-5 h-5" />
                </button>
            </Tippy>
            <span className="text-xs leading-normal text-center text-secondary dark:text-dark-secondary line-clamp-2">
                {action.title}
            </span>
        </div>
    );
};

HeaderAction.propTypes = {
    action: PropTypes.shape({
        icon: PropTypes.elementType,
        title: PropTypes.string,
        onClick: PropTypes.func,
    }).isRequired,
    active: PropTypes.bool,
};

export default HeaderAction;