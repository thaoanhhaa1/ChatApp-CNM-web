import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const FormLogin = ({ input, icon, name, value, onChange, error, ...props }) => {
    const Icon = icon;
    return (
        <div>
            <div className="flex items-center mt-2">

                {icon && (
                    <label htmlFor={name} className="block text-primary text-mm leading-5 font-medium" >
                        <Icon className="w-[16px] h-[16px] mr-2" />
                    </label>
                )}
                {input ? (

                    <input
                        id={name}
                        className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-primary text-sm focus:outline-none focus:shadow-outline"
                        name={name}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />) : (
                    <PhoneInput
                        id={name}
                        country="vn"
                        value={value}
                        onChange={onChange}
                        inputProps={{ required: true }}
                        name={name}
                        className='w-full'
                    />
                )
                }
            </div>
            {error && <div className="text-red-500 text-ss ml-5 mt-1">{error}</div>}
        </div>
    );
};

FormLogin.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default FormLogin;
