import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import Button from '~/components/button';
import { classNames, getDate, getTime } from '~/utils';

const ChatEmpty = ({ className }) => {
    const { t } = useTranslation();
    const { settings } = useSelector((state) => state.localSetting);

    return (
        <div
            className={classNames(
                'rounded-lg p-4 bg-primary-color bg-opacity-10 flex flex-col items-center gap-4',
                className,
            )}
        >
            <img src={images.transferMessages} className="w-[67px]" alt="" />
            <div className="text-center text-ss">
                <p>
                    {t('chat.empty-chat-description-1')}
                    &nbsp; ({getTime(settings.loginAt)}
                    &nbsp;
                    {t('chat.empty-chat-description-1-1')}
                    &nbsp;
                    {getDate(settings.loginAt)}).
                </p>
                <p className="mt-2">{t('chat.empty-chat-description-2')}</p>
            </div>
            <Button outline className="w-full">
                {t('chat.empty-chat-download')}
            </Button>
        </div>
    );
};

ChatEmpty.propTypes = {
    className: PropTypes.string,
};

export default ChatEmpty;
