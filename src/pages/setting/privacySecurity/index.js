import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "~/components/button";

const Privacy = ({handle}) => {
    const { t } = useTranslation();
    
    return (
        <div>
            <h2 className="text-black font-semibold">{t('settings.login_password')}</h2>
            <Button onClick={handle} className="text-sm bg-gray-50">
                {t('settings.change_password')}
            </Button>
        </div>
    );
};

export default Privacy;