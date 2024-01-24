import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';

const HeaderPage = ({ title, tooltip = '', rightIcon, children, rightClick = () => {} }) => {
    const Icon = rightIcon;
    let Wrap = 'span';

    if (tooltip) Wrap = Tippy;

    return (
        <div className="flex flex-col gap-2 ex:gap-3 sm:gap-4 md:gap-5 dl:gap-6 p-2 ex:p-3 sm:p-4 md:p-5 dl:p-6">
            <div className="flex justify-between items-center gap-2">
                <h1>{title}</h1>
                {rightIcon && (
                    <Wrap content={tooltip}>
                        <span
                            className="cursor-pointer flex justify-center w-12 text-secondary dark:text-dark-secondary"
                            onClick={rightClick}
                        >
                            <Icon className="w-[18px] h-[18px]" />
                        </span>
                    </Wrap>
                )}
            </div>
            {children}
        </div>
    );
};

HeaderPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightClick: PropTypes.func,
    rightIcon: PropTypes.func,
    children: PropTypes.node,
    tooltip: PropTypes.string,
};

export default HeaderPage;
