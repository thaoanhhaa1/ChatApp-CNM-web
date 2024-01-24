import PropTypes from 'prop-types';

const AboutItem = ({ title, children }) => {
    return (
        <div>
            <p className="text-mm text-secondary dark:text-dark-secondary">{title}</p>
            {children && <h5 className="mt-1 text-sm font-semibold">{children}</h5>}
        </div>
    );
};

AboutItem.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string,
};

export default AboutItem;
