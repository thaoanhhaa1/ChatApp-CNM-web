import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    ChatForwardIcon,
    DeleteBinLineIcon,
    DownloadLineIcon,
    FileCopyIcon,
    MoreFillIcon,
    SaveLineIcon,
} from '~/assets';
import Popup from '~/components/popup';

const ChatImage = ({ src }) => {
    const { t } = useTranslation();

    const mores = [
        {
            icon: FileCopyIcon,
            title: t('chat.more.copy'),
        },
        {
            icon: SaveLineIcon,
            title: t('chat.more.save'),
        },
        {
            icon: ChatForwardIcon,
            title: t('chat.more.forward'),
        },
        {
            icon: DeleteBinLineIcon,
            title: t('chat.more.delete'),
        },
    ];

    const handleDownload = () => {
        fetch(src, {
            method: 'GET',
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'image.png'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="relative max-w-[150px] aspect-[3/2] border border-separate dark:border-dark-separate rounded">
            <LazyLoadImage className="w-full h-full object-cover rounded" src={src} alt="" />
            <div className="absolute bottom-0 ex:bottom-1 right-0 ex:right-1 flex gap-1 xs:gap-2">
                <button onClick={handleDownload} className="text-white p-1 xs:p-1.5">
                    <DownloadLineIcon className="w-[18px] h-[18px]" />
                </button>
                <Popup data={mores} animation="shift-toward" placement="bottom-end">
                    <button className="text-white p-1 xs:p-1.5">
                        <MoreFillIcon className="w-[18px] h-[18px]" />
                    </button>
                </Popup>
            </div>
        </div>
    );
};

ChatImage.propTypes = {
    src: PropTypes.string.isRequired,
};

export default ChatImage;
