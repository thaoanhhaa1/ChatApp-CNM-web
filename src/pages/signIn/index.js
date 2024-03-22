import React, { useState } from 'react';
import QrTab from './qrTab/qrTab';
import SdtTab from './sdtTab/sdtTab';
import Button from '~/components/button';


// import SdtTab from './sdtTab/sdtTab';


const SignIn = () => {
  const [activeTab, setActiveTab] = useState('qr');

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-2">
      <div className="max-w-[400px] w-full bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col items-center justify-center">
        <ul className="flex flex-wrap justify-between -mb-px w-full border-b-2 border-gray-150">
          <li className="me-2 flex-1">
            <button
              className={`w-full inline-block p-4 ${activeTab === 'qr' ? 'text-black border-b-2 border-black rounded-t-lg active uppercase dark:text-blue-500 dark:border-blue-500 text-[12px] font-bold' : 'text-gray-500 dark:text-gray-400 uppercase text-[12px]'}`}
              onClick={() => switchTab('qr')}
            >
              với mã qr
            </button>
          </li>
          <div className="h-8 border border-gray-300 mt-3" />
          <li className="me-2 flex-1">
            <button
              className={`w-full inline-block p-4 ${activeTab === 'sdt' ? 'text-black border-b-2 border-black rounded-t-lg active uppercase dark:text-blue-500 dark:border-blue-500 text-[12px] font-bold' : 'text-gray-500 dark:text-gray-400 uppercase text-[12px]'}`}
              onClick={() => switchTab('sdt')}
            >
              với số điện thoại
            </button>
          </li>
        </ul>
        {activeTab === 'qr' && <QrTab />}
        {activeTab === 'sdt' && <SdtTab />}
      </div>
    </div>
  );
};

export default SignIn;
