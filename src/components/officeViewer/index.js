import PropTypes from 'prop-types';
import { DocumentViewer } from 'react-documents';
import { useTranslation } from 'react-i18next';
import { CloseLineIcon, DownloadLineIcon } from '~/assets';
import { useBoolean, useDownloadFile } from '~/hooks';
import { getDate, getTime } from '~/utils';
import Avatar from '../avatar';
import Portal from '../portal';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const OfficeViewer = ({ file, user, date, viewer, onClose = () => {} }) => {
    const { t } = useTranslation();
    const { value: loading, setFalse: stopLoading } = useBoolean(true);
    const download = useDownloadFile(file.link, file.name);

    if (!file?.link) return null;

    return (
        <Portal>
            <div className="fixed flex flex-col inset-0 bg-white z-51">
                <div className="relative flex-1">
                    <DocumentViewer
                        viewer={viewer}
                        queryParams="hl=Nl"
                        url={file.link}
                        overrideLocalhost={process.env.REACT_APP_DOC_VIEWER}
                        loaded={stopLoading}
                    ></DocumentViewer>

                    {loading && viewer !== 'office' ? (
                        <div className="absolute inset-0 flex justify-center items-center bg-white z-1">
                            <span className="rounded-full animate-spin w-10 h-10 border-4 border-primary-color border-t-transparent"></span>
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center border-t border-separate dark:border-dark-separate flex-shrink-0 pl-5 h-[60px]">
                    <div className="flex-1 flex items-center">
                        <Avatar size="40px" src={user.avatar} />
                        <div className="ml-2">
                            <h4 className="text-sm font-medium">{file.name}</h4>
                            <p className="mt-0.5 text-ss">
                                {user.name} - {getDate(date)}&nbsp;{t('chat.at')}&nbsp;{getTime(date)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-3" onClick={download}>
                            <DownloadLineIcon className="w-[18px] h-[18px]" />
                        </button>
                        <button className="p-3" onClick={onClose}>
                            <CloseLineIcon className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

OfficeViewer.propTypes = {
    file: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    viewer: PropTypes.string,
    onClose: PropTypes.func,
};

export default withErrorBoundary(OfficeViewer, {
    fallback: null,
    onError: (error, info) => {
        toast.error('OfficeViewer::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
