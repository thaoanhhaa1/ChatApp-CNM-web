import PropTypes from 'prop-types';
import PinMessage from './PinMessage';

const PinMessages = ({ messages }) => {
    return null;

    console.log('🚀 ~ PinMessages ~ messages:', messages);
    if (!messages?.length) return null;

    return (
        <div className="border-b border-separate dark:border-dark-separate">
            <PinMessage />
        </div>
    );
};

PinMessages.propTypes = {
    messages: PropTypes.array.isRequired,
};

export default PinMessages;
