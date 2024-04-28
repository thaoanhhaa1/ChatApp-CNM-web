import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { statusUser } from '~/constants';
import { classNames } from '~/utils';
import MoreThreeAvatars from './MoreThreeAvatars';
import OneAvatar from './OneAvatar';
import ThreeAvatars from './ThreeAvatars';
import TwoAvatars from './TwoAvatars';

const AvatarGroup = ({ avatars, size = '36px', status = statusUser.OFFLINE }) => {
    const children = useMemo(() => {
        if (avatars.length === 1) return <OneAvatar size={`${(2 / 3) * 100}%`} avatar={avatars[0]} />;
        if (avatars.length === 2) return <TwoAvatars size={`${(2 / 3) * 100}%`} avatars={avatars} />;
        if (avatars.length === 3) return <ThreeAvatars size={`${(7 / 12) * 100}%`} avatars={avatars} />;
        return <MoreThreeAvatars avatars={avatars} size={`${(13 / 24) * 100}%`} />;
    }, [avatars]);

    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className="flex-shrink-0 relative select-none pointer-events-none"
        >
            {children}

            {status !== statusUser.OFFLINE && (
                <div
                    className={classNames(
                        'absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#262e35] z-10',
                        status === statusUser.ONLINE && 'bg-[#06d6a0]',
                    )}
                />
            )}
        </div>
    );
};

AvatarGroup.propTypes = {
    avatars: PropTypes.array.isRequired,
    size: PropTypes.string,
};

export default AvatarGroup;
