import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const useDownloadFile = (src, name) => {
    const { t } = useTranslation();

    const handleDownload = () => {
        fetch(src)
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            })
            .catch(() => toast.error(t('request-error')));
    };

    return handleDownload;
};

export default useDownloadFile;
