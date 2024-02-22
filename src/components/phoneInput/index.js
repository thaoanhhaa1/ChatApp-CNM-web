import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownArrowFillIcon } from '~/assets';
import { countries } from '~/constants';
import { useBoolean, useOnClickOutside } from '~/hooks';
import Input from '../input';
import ScrollbarCustomize from '../scrollbarCustomize';
import CountryItem from './CountryItem';

const PhoneInput = ({ value, setValue }) => {
    const ref = useRef();
    const { value: show, toggle, setFalse } = useBoolean();
    const [searchCountry, setSearchCountry] = useState('');
    const { t } = useTranslation();

    useOnClickOutside(ref, setFalse);

    const handleChangeCountry = (country) => {
        setFalse();
        setSearchCountry('');
        setValue((prev) => ({ ...prev, country }));
    };

    const handlePhoneChange = (phone) => setValue((prev) => ({ ...prev, phone }));

    useEffect(() => {
        value || setValue(() => ({ country: { name: 'Vietnam', dialling_code: '+84', code: 'VN' }, phone: '' }));
    }, [setValue, value]);

    return (
        <div className="flex gap-2">
            <div
                ref={ref}
                className="flex items-center relative cursor-pointer text-input px-1 border rounded transition-all border-separate dark:border-dark-separate bg-white dark:bg-dark-sidebar-sub-bg"
            >
                <div onClick={toggle} className="flex items-center gap-2">
                    <img
                        className="w-6 h-6 object-contain"
                        alt=""
                        src={`${process.env.REACT_APP_FLAG_ENDPOINT}/${value?.country.code.toLowerCase()}.png`}
                    />
                    <span className="text-sm font-medium leading-normal tracking-[0.2px]">
                        ({value?.country.dialling_code})
                    </span>
                    <DownArrowFillIcon className="w-5 h-5" />
                </div>

                {show && (
                    <div className="z-1 shadow-popup bg-white dark:bg-dark absolute top-full left-0 w-[300px] p-1 rounded border border-separate dark:border-dark-separate">
                        <Input
                            containerClassName="h-[26px]"
                            className="!px-3 !py-0"
                            rounded
                            placeholder={t('contacts.modal.placeholder')}
                            value={searchCountry}
                            onChangeText={setSearchCountry}
                        />
                        <div className="mt-1 h-[186px]">
                            <ScrollbarCustomize>
                                {countries
                                    .filter((country) =>
                                        country.name.toUpperCase().includes(searchCountry.toUpperCase()),
                                    )
                                    .map((country) => (
                                        <CountryItem
                                            onClick={() => handleChangeCountry(country)}
                                            country={country}
                                            key={country.name}
                                        />
                                    ))}
                            </ScrollbarCustomize>
                        </div>
                    </div>
                )}
            </div>
            <Input
                containerClassName="flex-1"
                type="tel"
                id="phone"
                name="phone"
                outline
                placeholder={t('contacts.enter-phone')}
                value={value?.phone}
                onChangeText={handlePhoneChange}
            />
        </div>
    );
};

PhoneInput.propTypes = {
    value: PropTypes.object,
    setValue: PropTypes.func,
};

export default PhoneInput;
