import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const LinkPreviewCard = ({ response }) => (
    <div className="w-[300px] rounded mt-[14px]">
        <a href={response.url || '#'} target="_blank" rel="noreferrer">
            <CardMedia
                component="img"
                image={response.image || ''}
                alt="No Image Found"
                sx={{
                    objectFit: 'contain',
                    borderRadius: '3px',
                }}
            />

            <div className="mt-3">
                <h5 className="text-sm mb-1 line-clamp-1">{response.title}</h5>
                <p className="text-sm mb-1 line-clamp-2 text-secondary dark:text-dark-secondary">
                    {response.description}
                </p>
            </div>
            {response.publisher ? <span className="text-ss text-primary-color">{response.publisher}</span> : null}
        </a>
    </div>
);

LinkPreviewCard.propTypes = {
    response: PropTypes.shape({
        url: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        publisher: PropTypes.string,
    }).isRequired,
};

export default withErrorBoundary(LinkPreviewCard, {
    fallback: null,
    onError: (error, info) => {
        toast.error('LinkPreviewCard::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
