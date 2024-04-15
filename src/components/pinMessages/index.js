import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useBoolean, useOnClickOutside } from '~/hooks';
import Header from './Header';
import PinMessage from './PinMessage';

const PinMessages = ({ messages }) => {
    const { value, setTrue, setFalse } = useBoolean(false);
    const ref = useRef(null);

    useOnClickOutside(ref, setFalse);

    if (!messages?.length) return null;

    return (
        <div className="border-b border-separate dark:border-dark-separate">
            <PinMessage onMore={setTrue} pinCount={messages.length} message={messages[0]} />

            {value ? (
                <div className="absolute inset-0 z-51 bg-black bg-opacity-30">
                    <div ref={ref} className="bg-white">
                        <Header onClick={setFalse} count={messages.length} />
                        {messages.map((message) => (
                            <PinMessage key={message._id} message={message} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

PinMessages.propTypes = {
    messages: PropTypes.array.isRequired,
};

export default PinMessages;
