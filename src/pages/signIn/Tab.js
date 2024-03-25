import PropTypes from 'prop-types';

const Tab = ({ active, children, onClick = () => {} }) => {
    return (
        <li className="flex-1">
            <button
                className={`w-full h-[50px] inline-block px-4 text-sm ${
                    active
                        ? 'text-black border-b-2 border-black rounded-t-lg active uppercase dark:text-blue-500 dark:border-blue-500 font-bold'
                        : 'text-gray-500 dark:text-gray-400 uppercase'
                }`}
                onClick={onClick}
            >
                {children}
            </button>
        </li>
    );
};

Tab.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Tab;
