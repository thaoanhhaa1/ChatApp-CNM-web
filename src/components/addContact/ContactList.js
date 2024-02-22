import PropTypes from 'prop-types';

const ContactList = ({ Icon, title, children }) => {
    return (
        <div>
            <div className="gap-1 text-sm leading-normal flex items-center h-[30px] pl-4 text-secondary dark:text-dark-secondary">
                {Icon && (
                    <span>
                        <Icon />
                    </span>
                )}
                <span>{title}</span>
            </div>
            <div>{children}</div>
        </div>
    );
};

ContactList.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    Icon: PropTypes.func,
};

export default ContactList;
