import PropTypes from 'prop-types';
import { ChevronDownIcon } from '~/assets';
import { classNames } from '~/utils';

const Header = ({ icon, children, active, onClick = () => {} }) => {
    const Icon = icon;

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center gap-2 px-2.5 ex:px-5 py-1.5 ex:py-3 text-sm font-semibold bg-[rgba(73,80,87,0.03)] dark:bg-[rgba(166,176,207, 0.03)]"
        >
            <Icon className="w-[14px] h-[14px] stroke-2" />
            <span className="flex-1">{children}</span>
            <span className={classNames(active && 'rotate-180')}>
                <ChevronDownIcon />
            </span>
        </div>
    );
};

Header.propTypes = {
    icon: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
};

export default Header;
