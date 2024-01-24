import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const Contact = ({ title, contactList }) => {
    return (
        <div>
            <h6 className="p-2 sm:p-4 text-mm text-primary-color font-bold leading-normal">{title}</h6>
            <div>
                {contactList.map((contact, index) => (
                    <ContactItem contact={contact} key={index} />
                ))}
            </div>
        </div>
    );
};

Contact.propTypes = {
    title: PropTypes.string.isRequired,
    contactList: PropTypes.array.isRequired,
};

export default Contact;
