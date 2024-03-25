import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import Button from './Button';

const SendFiles = ({ tooltip, Icon, accept, onSend = () => {} }) => {
    const id = v4();

    const handleChange = (e) => {
        const files = [...e.target.files];
        if (files.length) onSend(files);
    };

    return (
        <Tippy content={tooltip}>
            <label htmlFor={id} className="cursor-pointer">
                <Button className="pointer-events-none" icon={Icon} />
                <input onChange={handleChange} multiple accept={accept} id={id} type="file" hidden />
            </label>
        </Tippy>
    );
};

SendFiles.propTypes = {
    tooltip: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
    accept: PropTypes.string,
    onSend: PropTypes.func,
};

export default SendFiles;
