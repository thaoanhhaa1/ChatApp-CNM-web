import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AttachedFile from '~/components/attachedFile';
import { getAttachedFiles } from '~/features/attachedFiles/attachedFilesSlice';

const AttachedFiles = () => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const attachedFilesAll = useSelector((state) => state.attachedFiles);
    const [loading, setLoading] = useState(false);
    const attachedFiles = useMemo(() => attachedFilesAll[active?._id], [attachedFilesAll, active]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Array.isArray(attachedFiles) || !active?._id) return;

        async function fetch() {
            try {
                setLoading(true);
                await dispatch(getAttachedFiles({ conversationId: active._id })).unwrap();
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, [active._id, attachedFiles, dispatch]);

    if (!active?._id) return null;

    return (
        <div>
            {loading && (
                <div>
                    <span className="w-6 h-6 border-2 rounded-full border-primary-color border-t-transparent animate-spin" />
                </div>
            )}
            {!loading && !attachedFiles?.length ? (
                <div className="text-sm text-secondary dark:text-dark-secondary text-center">
                    {t('chat.attached-file-empty')}
                </div>
            ) : null}
            {!loading && attachedFiles?.length ? (
                <div className="flex flex-col gap-2">
                    {attachedFiles.map((file, index) => (
                        <AttachedFile key={index} file={file} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

AttachedFiles.propTypes = {};

export default AttachedFiles;
