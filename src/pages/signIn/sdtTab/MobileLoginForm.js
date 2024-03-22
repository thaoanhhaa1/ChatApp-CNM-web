import { MobileIcon } from "~/assets";
import FormLogin from "~/components/Sigin/formLogin";
import PropTypes from 'prop-types';
import Button from "~/components/button";

const MobileLoginForm = ({ value, onChange, error, onClick }) => {

    return (
        <div>
            <FormLogin
                name="phone"
                icon={MobileIcon}
                value={value}
                onChange={onChange}
                error={error}
            />
            <div className='text-center text-ss ml-6 mr-6 mt-4'>
                <p>Chúng tôi sẽ gửi một yêu cầu đăng nhập đến ứng dụng Zalo trên thiết bị của bạn.</p>
            </div>
            <Button className='w-full hover:bg-hoverPurple mt-5' primary>Đồng ý</Button>
            <Button onClick={onClick}>&#171; Quay lại</Button>
        </div>
    );
}
MobileLoginForm.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
export default MobileLoginForm;