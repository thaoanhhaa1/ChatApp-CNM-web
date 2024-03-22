import PropTypes from 'prop-types';
import Avatar from '~/components/avatar';

const Mention = ({ mention }) => {
    return (
        <div className="h-12 px-2 ex:px-3 sm:px-4 flex items-center text-sm leading-normal tracking-wide bg-white dark:bg-[#313a43] hover:bg-[#f9fafb] dark:hover:bg-dark-sidebar-bg transition-all duration-300">
            <Avatar size="32px" src={mention.avatar} />
            <div className="ml-2 ex:ml-3 line-clamp-1">{mention.display}</div>
            {mention.tag && (
                <>
                    <div className="w-[1px] h-[1px] bg-[#081c36] mx-1.5" />
                    <div className="text-[#005ae0]">@{mention.tag}</div>
                </>
            )}
        </div>
    );
};

Mention.propTypes = {
    mention: PropTypes.object.isRequired,
};

export default Mention;
