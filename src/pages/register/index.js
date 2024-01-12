import React, { useState } from 'react';
import validator from 'validator';

const Register = () => {
  const formArray = [1,2,3,4];
    const [currentStep, setCurrentStep] = useState(formArray[0]);

    
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      password: '',
      gender:'male',
      dateOfBirth: '',
    });

    const [errors, setErrors] = useState({});

    const nextStep = () => {
       
        const validationErrors = validateFormFields(currentStep);
        if (Object.keys(validationErrors).length === 0) {
          setCurrentStep(currentStep + 1);
        } else {
          
          setErrors(validationErrors);
        }
      };

      const validateFormFields = (step) => {
        const validationErrors = {};
    
        if (step === 1 && !validator.matches(formData.name, /^[a-zA-ZÀ-ỹ\s]{2,40}$/)) {
          validationErrors.name = 'Tên Zalo phải có ít nhất 2-40 kí tự.';
        }
    
        if (step === 2 && !validator.isMobilePhone(formData.phone,'vi-VN')) {
          validationErrors.phone = 'Số điện thoại không hợp lệ.';
        }
    
        if (step === 3 && !validator.isLength(formData.password, { min: 6, max: undefined })) {
          validationErrors.password = 'Mật khẩu có ít nhất 6 kí tự';
        }
        
        if (step === 4) {
            if (!formData.dateOfBirth) {
              validationErrors.dateOfBirth = 'Ngày sinh là bắt buộc.';
            } else {
              const currentDate = new Date();
              const dateOfBirth = new Date(formData.dateOfBirth);
              const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
              if (age < 14) {
                validationErrors.dateOfBirth = 'Bạn phải đủ 14 tuổi.';
              }
            }
          }
        console.log(validationErrors);
        
        return validationErrors;
      };
  
    const prevStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      setErrors({
        ...errors,
        [name]: '',
      });

    }; 
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateFormFields(currentStep);
      if (Object.keys(validationErrors).length === 0) {
        console.log('Form submitted:', formData); 
      } else {
        
        setErrors(validationErrors);
      }
    };
  
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-blue-500 font-bold mb-10">Zalo</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className='flex justify-center items-center mb-4'>
              
              {
                formArray.map((v,i)=><><div className={`w-[35px] wy-3 text-white rounded-full ${currentStep-1 === i ? 'bg-blue-400' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
                  {v}
                  </div>
                  {     
                    i !== formArray.length -1 && <div className='w-[40px] h-[2px] bg-slate-400'></div>
                  }
                  </>)
              }
          </div>
          {currentStep === 1 && (
            <div>
              <label htmlFor="name" className="block text-gray-700 text-14 font-bold mb-2">
                Tên zalo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Gồm 2-40 kí tự"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              <div>
                <p className='text-xs mt-2'>Lưu ý khi đặt tên</p>
                <p className='text-xs'>
                    - Không vi phạm <a href='https://help.zalo.me/huong-dan/chuyen-muc/bao-mat-va-rieng-tu/quy-dinh-dat-ten-nguoi-dung-tren-zalo' className='text-blue-500'>quy định đặt tên trên Zalo</a> <br/>
                    - Nên sử dụng tên thật để giúp bạn bè nhận ra bạn <br/>
                </p>
                
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
                <div>
                <label htmlFor="phone" className="block text-gray-700 text-14 font-bold mb-2">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
                )}
            </div>
            <div className="flex items-center mb-4 mt-4">
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 rounded"/>
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tôi đồng ý với các <a href='https://zalo.vn/dieukhoan/' className='text-blue-500'>điều khoản sử dụng Zalo</a></label>
            </div>
             
            </div>
            
          )}
          
          {currentStep === 3 && (
            <div>
              <label htmlFor="password" className="block text-gray-700 text-14 font-bold mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
                )}
            </div>
          )}

        {currentStep === 4 && (
            <div>
                <h3 className="block text-gray-700 text-14 font-bold">Giới tính</h3>
                <ul className="items-center w-full text-sm font-medium rounded-lg sm:flex">
                    <li className="w-full">
                        <div className="flex items-center ps-3">
                            <input type="radio"id="male" name="gender" value="male" className="w-4 h-4" checked={formData.gender === 'male'} onChange={handleChange}/>
                            <label htmlFor="male" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                        </div>
                    </li>
                    <li className="w-full">
                        <div className="flex items-center ps-3">
                            <input type="radio"id="female" name="gender" value="female" className="w-4 h-4" checked={formData.gender === 'female'} onChange={handleChange}/>
                            <label htmlFor="female" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
                        </div>
                    </li>
                </ul>
                <div>
                     <label htmlFor="dateOfBirth" className="block text-gray-700 text-14 font-bold mb-2">
                    Ngày sinh
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    {errors.dateOfBirth && (
                        <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>
                        )}
                    
                </div>

            </div>
                            
        )}
  
        <div className="flex justify-between mt-4">
            {currentStep > 1 && (
                <button
                className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500"
                type="button"
                onClick={prevStep}
                >
                Previous
                </button>
            )}
            {currentStep < 4 ? (
                <button
                className='px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500'
                type="button"
                onClick={nextStep}
                >
                Next
                </button>
                ) : (
                  <button type="submit" onClick={handleSubmit} className='px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500'>Submit</button>
                  
            )}
              
        </div>

      </div>
      </div>
  );
};

Register.propTypes = {};

export default Register;

