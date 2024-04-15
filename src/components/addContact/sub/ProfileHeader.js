import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { BlockIcon, PencilLineIcon } from '~/assets';
import Avatar from '~/components/avatar';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import Alias from './alias';

const DEFAULT_BACKGROUND = 'https://cover-talk.zadn.vn/6/a/6/c/9/82037b27670895bf54b18e4937cb00cf.jpg';

const ProfileHeader = () => {
    const { contact } = useSelector((state) => state.addContact);
    const dispatch = useDispatch();

    const handleChangeAlias = () => dispatch(addSub(Alias));

    return (
        <div>
            <LazyLoadImage
                className="w-full aspect-[400/171] object-cover"
                src={contact.background || DEFAULT_BACKGROUND}
                alt=""
            />

            <div className="px-2 ex:px-3 sm:px-4 -mt-4">
                <div className="flex gap-2 ex:gap-3 sm:gap-4 items-center">
                    <div className="relative">
                        <Avatar src={contact.avatar} size="80px" />

                        {contact.blocked && (
                            <span className="absolute right-0 bottom-0 rounded-full bg-white dark:bg-[#242526] border border-white dark:border-[#242526] text-[#d91b1b]">
                                <BlockIcon className="w-6 h-6" />
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <h3 className="text-lg leading-normal font-medium line-clamp-1">
                            {contact.alias || contact.name}
                        </h3>
                        <span
                            onClick={handleChangeAlias}
                            className="p-1 ml-2 cursor-pointer rounded-lg hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5 transition-all"
                        >
                            <PencilLineIcon className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {};

export default ProfileHeader;
