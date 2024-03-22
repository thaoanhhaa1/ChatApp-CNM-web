import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { classNames } from '~/utils';

const TextareaCountChar = ({ maxLength, value, className, onChangeText = () => {}, onChange = () => {}, ...props }) => {
    const { t } = useTranslation();

    const handleChange = (e) => {
        onChange(e);
        onChangeText(e.target.value);
    };

    return (
        <div
            className={classNames(
                'flex flex-col gap-2 p-2 ex:p-2.5 sm:p-3 border rounded border-[#d6dbe1] focus-within:border-primary-color',
                className,
            )}
        >
            <textarea
                maxLength={maxLength}
                placeholder={t('contacts.modal.placeholderGreetingMessage')}
                className="bg-transparent textarea flex-1 outline-none resize-none text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-input dark:text-dark-primary"
                value={value}
                onChange={handleChange}
                {...props}
            />
            <div className="text-xs leading-normal text-secondary text-right">
                {value.length}/{maxLength} {t('contacts.modal.character')}
            </div>
        </div>
    );
};

TextareaCountChar.propTypes = {
    maxLength: PropTypes.number.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
};

export default TextareaCountChar;
