import { ImageList, ImageListImageAspectContainer, ImageListItem } from '@rmwc/image-list';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import ChatImage from '../chat/body/ChatImage';

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
        <ImageList masonry style={{ columnCount }} className="grid gap-0.5 rounded-md overflow-hidden">
            {data.map((item) => (
                <ImageListItem key={item.url}>
                    <ImageListImageAspectContainer>
                        <ChatImage loading={loading} imageInList src={item.url} name={item.name} />
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

export default MessageImageList;
