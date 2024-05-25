import { ImageList, ImageListImageAspectContainer, ImageListItem } from '@rmwc/image-list';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import MessageImage from '~/components/message/MessageImage';

const MessageImageList = ({ files, loading }) => {
    const data = useMemo(
        () =>
            files.map((file) => ({
                url: file.link || URL.createObjectURL(file),
                name: file.name,
            })),
        [files],
    );
    const columnCount = data.length >= 12 ? 4 : data.length >= 6 ? 3 : data.length >= 4 ? 2 : 1;

    return (
        <ImageList
            masonry
            style={{ columnCount, columnGap: '2px' }}
            className="rounded-md overflow-hidden max-w-[370px]"
        >
            {data.map((item) => (
                <ImageListItem className="mb-0.5" key={item.url}>
                    <ImageListImageAspectContainer>
                        <MessageImage loading={loading} imageInList src={item.url} name={item.name} />
                    </ImageListImageAspectContainer>
                </ImageListItem>
            ))}
        </ImageList>
    );
};

MessageImageList.propTypes = {
    files: PropTypes.array.isRequired,
    loading: PropTypes.bool,
};

export default withErrorBoundary(MessageImageList, {
    fallback: null,
    onError: (error, info) => {
        toast.error('MessageImageList::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
