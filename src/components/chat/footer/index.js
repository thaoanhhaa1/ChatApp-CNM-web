import { useTranslation } from 'react-i18next';
import { AttachmentLineIcon, EmotionHappyLineIcon, ImageFillIcon, SendPlaneFillIcon } from '~/assets';
import Input from '~/components/input';
import Button from './Button';

const Footer = () => {
    const { t } = useTranslation();

    const actions = [
        {
            icon: EmotionHappyLineIcon,
        },
        {
            icon: AttachmentLineIcon,
        },
        {
            icon: ImageFillIcon,
        },
        {
            icon: SendPlaneFillIcon,
            type: 'primary',
        },
    ];

    return (
        <div className="border-t border-separate dark:border-dark-separate p-2 sm:p-3 md:p-4 dl:p-5 flex gap-2">
            <Input className="w-full" containerClassName="flex-1" placeholder={t('chat.chat')} />
            <div className="flex">
                {actions.map((action, index) => (
                    <Button key={index} {...action} />
                ))}
            </div>
        </div>
    );
};

Footer.propTypes = {};

export default Footer;
