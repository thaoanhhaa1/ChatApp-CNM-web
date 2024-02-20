import PropTypes from 'prop-types';

const HeaderLabel = ({ number, children }) => {
    return (
        <>
            <span className="px-1 py-[1px] font-medium rounded bg-[#f0f7ff] dark:bg-[#0f2345] text-[#005ae0] dark:text-[#3989ff]">
                {number}
            </span>
            <span>{children}</span>
        </>
    );
};

HeaderLabel.propTypes = {
    number: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default HeaderLabel;
