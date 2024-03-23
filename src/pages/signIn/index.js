import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Languages from '~/components/languages';
import Tab from './Tab';
import QrTab from './qrTab/qrTab';
import SdtTab from './sdtTab/sdtTab';

const QR_TAB = 'qr';
const PHONE_TAB = 'sdt';

const SignIn = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(QR_TAB);

    const switchTab = (tab) => setActiveTab(tab);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-2">
            <h1 className="text-4xl text-primary-color font-bold mb-10">Zalo</h1>
            <div className="max-w-[400px] w-full bg-white shadow-md rounded flex flex-col items-center justify-center">
                <ul className="flex flex-wrap justify-between -mb-px w-full border-b-2 border-gray-150">
                    <Tab active={activeTab === QR_TAB} onClick={() => switchTab(QR_TAB)}>
                        {t('login.with-qr-code')}
                    </Tab>
                    <div className="h-8 border border-gray-300 mt-3" />
                    <Tab active={activeTab === PHONE_TAB} onClick={() => switchTab(PHONE_TAB)}>
                        {t('login.with-phone-number')}
                    </Tab>
                </ul>
                <div className="px-[45px] py-[30px] w-full">
                    {activeTab === QR_TAB && <QrTab />}
                    {activeTab === PHONE_TAB && <SdtTab />}
                </div>
            </div>

            <Languages />

            <div className="absolute inset-0 -z-10 bg-sidebar-item-active-bg" />
        </div>
    );
};

export default SignIn;
