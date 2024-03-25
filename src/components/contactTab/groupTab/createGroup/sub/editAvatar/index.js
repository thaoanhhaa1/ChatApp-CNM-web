import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { LeftLineIcon, RightLineIcon } from '~/assets';
import Avatar from '~/components/avatar';
import Modal from '~/components/modal';
import { constants } from '~/constants';
import { setUrlAvatar } from '~/features/createGroup/createGroupSlice';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { classNames } from '~/utils';
import ArrowButton from './ArrowButton';

const IMAGE_SIZE = 48;

const EditAvatar = ({ onClose }) => {
    const { t } = useTranslation();
    const { avatar } = useSelector((state) => state.createGroup);
    const dispatch = useDispatch();
    const ref = useRef();
    const { width } = useWindowSize();
    const avatarsPerSlide = useMemo(() => {
        const element = ref.current;

        const width = element?.offsetWidth || 0;

        return Math.floor(width / (IMAGE_SIZE + 8)) - 1;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);
    const [slide, setSlide] = useState({});

    const handleClickAvatar = (url) => dispatch(setUrlAvatar(url));

    const handleScroll = useCallback(
        (isPrev = false, count = 1) => {
            const element = ref.current;
            element.scrollTo({
                top: 0,
                left: element.scrollLeft + avatarsPerSlide * (IMAGE_SIZE + 8) * (isPrev ? -1 : 1) * count,
                behavior: 'smooth',
            });
            setSlide((prev) => ({
                ...prev,
                select: Math.max(0, Math.min(prev.select + (isPrev ? -1 : 1) * count, prev.max)),
            }));
        },
        [avatarsPerSlide],
    );

    const handleCancel = () => {
        dispatch(resetSubs());
        dispatch(setUrlAvatar());
    };
    const handleUpdateAvatar = () => {
        dispatch(resetSubs());
    };

    useEffect(() => {
        const index = constants.AVATAR_GROUP_SAMPLE.findIndex((url) => url === avatar.url);
        const slide = Math.floor(index / avatarsPerSlide);

        handleScroll(false, slide);
    }, [avatar.url, avatarsPerSlide, handleScroll]);

    useEffect(() => {
        const element = ref.current;

        const width = element?.offsetWidth || 0;
        const max = constants.AVATAR_GROUP_SAMPLE.length / Math.floor(width / (IMAGE_SIZE + 8));

        setSlide({
            max,
            select: 0,
        });
    }, [width]);

    return (
        <>
            <Modal.Header onClose={onClose} showBack>
                {t('contacts.create-group-modal.update-avatar')}
            </Modal.Header>

            <div>
                <div className="p-10 flex justify-center items-center">
                    <div
                        style={{
                            backgroundImage: `url(${avatar.url})`,
                        }}
                        className="w-[300px] h-[300px] bg-cover bg-center relative"
                    >
                        <div className="absolute inset-0 bg-white bg-opacity-40"></div>

                        <LazyLoadImage src={avatar.url} className="absolute inset-0 rounded-full" alt="" />
                    </div>
                </div>

                <div className="flex items-center px-6 py-4">
                    <ArrowButton disabled={slide.select === 0} onClick={() => handleScroll(true)} Icon={LeftLineIcon} />
                    <div className="relative flex-1 overflow-hidden">
                        <div ref={ref} className="flex gap-2 overflow-hidden transition-all">
                            <div className="w-2 flex-shrink-0"></div>
                            {constants.AVATAR_GROUP_SAMPLE.map((url, index) => (
                                <div
                                    className={classNames(
                                        'cursor-pointer rounded-full flex-shrink-0 border-2 overflow-hidden',
                                        (avatar.url === url && 'border-primary-color') || 'border-transparent',
                                    )}
                                    key={index}
                                    onClick={() => handleClickAvatar(url)}
                                >
                                    <div
                                        className={classNames(
                                            'rounded-full border',
                                            avatar.url === url ? 'border-white' : 'border-[#b6bec9]',
                                        )}
                                    >
                                        <Avatar size={`${IMAGE_SIZE}px`} src={url} />
                                    </div>
                                </div>
                            ))}
                            <div className="w-2 flex-shrink-0"></div>
                        </div>
                        <div className="pointer-events-none absolute w-[30px] h-full top-0 left-0 bg-[linear-gradient(90deg,#fff_20%,hsla(0,0%,100%,0)_80%)]"></div>
                        <div className="pointer-events-none absolute w-[30px] h-full top-0 right-0 bg-[linear-gradient(270deg,#fff_20%,hsla(0,0%,100%,0)_80%)]"></div>
                    </div>
                    <ArrowButton
                        disabled={slide.max === slide.select}
                        onClick={() => handleScroll()}
                        Icon={RightLineIcon}
                    />
                </div>
            </div>

            <Modal.Footer className="flex gap-2 justify-end">
                <Modal.Button onClick={handleCancel} type="text-primary">
                    {t('contacts.create-group-modal.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleUpdateAvatar}>{t('contacts.create-group-modal.update')}</Modal.Button>
            </Modal.Footer>
        </>
    );
};

EditAvatar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default EditAvatar;
