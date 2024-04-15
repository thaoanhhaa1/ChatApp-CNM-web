import PropTypes from 'prop-types';
import { DownArrowFillIcon } from '~/assets';

const Header = ({ count, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="h-6 text-xs flex justify-between items-center bg-[#eaedf0] shadow-[0_1px_#d6dbe1]"
        >
            <span>Pinboard ({count})</span>
            <div className="flex">
                <span>Collapse</span>
                <span className="rotate-180">
                    <DownArrowFillIcon />
                </span>
            </div>
        </div>
    );
};

Header.propTypes = {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

export default Header;
