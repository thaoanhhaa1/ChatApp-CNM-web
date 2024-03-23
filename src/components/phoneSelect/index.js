import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { DownArrowFillIcon } from '~/assets';
import { countries } from '~/constants';
import { useBoolean, useOnClickOutside } from '~/hooks';
import ScrollbarCustomize from '../scrollbarCustomize';
import Item from './Item';

const PhoneSelect = ({ onChange = () => {} }) => {
    const [country, setCountry] = useState(() => ({ name: 'Vietnam', dialling_code: '+84', code: 'VN' }));
    const { value, setFalse, toggle } = useBoolean();
    const ref = useRef();

    const handleClickItem = (country) => {
        setFalse();
        setCountry(country);
    };

    useOnClickOutside(ref, setFalse);

    useEffect(() => {
        onChange(country);
    }, [country, onChange]);

    return (
        <div ref={ref} className="relative z-1">
            <div
                onClick={toggle}
                className="w-[70px] flex items-center gap-1 py-1 rounded transition-colors hover:bg-black hover:bg-opacity-5 cursor-pointer"
            >
                <span className="text-sm flex-1 text-right">{country.dialling_code}</span>
                <DownArrowFillIcon className="flex-shrink-0 w-5 h-5 text-secondary dark:text-white" />
            </div>
            {value ? (
                <div className="flex flex-col w-[300px] h-[300px] bg-white absolute top-full left-0 shadow-phone-select border border-[#bbb] rounded-sm">
                    <ScrollbarCustomize>
                        {countries.map((country) => (
                            <Item onClick={handleClickItem} country={country} key={country.code} />
                        ))}
                    </ScrollbarCustomize>
                </div>
            ) : null}
        </div>
    );
};

PhoneSelect.propTypes = {
    onChange: PropTypes.func,
};

export default PhoneSelect;
