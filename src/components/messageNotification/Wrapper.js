import PropTypes from 'prop-types';

const Wrapper = ({ children }) => {
    return (
        <div className="flex gap-2 items-center text-ss px-3 py-1.5 w-fit justify-self-center self-center rounded-full bg-sidebar-sub-bg dark:bg-dark-sidebar-bg">
            {children}
        </div>
    );
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
