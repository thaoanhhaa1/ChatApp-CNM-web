import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CloseLineIcon, LeftLineIcon } from '~/assets';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';

const Header = ({ children, showBack, onClose, className }) => {
    const dispatch = useDispatch();

    const handleBack = () => dispatch(popSub());

    return (
        <div className="flex justify-between items-center p-2 ex:p-3 sm:p-4 border-b border-separate dark:border-dark-separate">
            <div className="flex items-center gap-1">
                {showBack && (
                    <span
                        onClick={handleBack}
                        className="cursor-pointer p-1 text-secondary dark:text-dark-secondary rounded-lg hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-200"
                    >
                        <LeftLineIcon className="w-5 h-5" />
                    </span>
                )}
                <h5 className="text-lg leading-normal font-semibold line-clamp-1">{children}</h5>
            </div>
            <span
                onClick={onClose}
                className="cursor-pointer p-1 text-secondary dark:text-dark-secondary rounded-lg hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-200"
            >
                <CloseLineIcon className="w-4 h-4" />
            </span>
        </div>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    showBack: PropTypes.bool,
    className: PropTypes.string,

};

export default Header;
