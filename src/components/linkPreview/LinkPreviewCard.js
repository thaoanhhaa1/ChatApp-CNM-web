import { CardMedia } from '@mui/material';

const LinkPreviewCard = (props) => (
    <div className="w-[300px] rounded mt-[14px]">
        <a href={props.response.url || '#'} target="_blank" rel="noreferrer">
            <CardMedia
                component="img"
                image={props.response.image || ''}
                alt="No Image Found"
                sx={{
                    objectFit: 'contain',
                    borderRadius: '3px',
                }}
            />

            <div className="mt-3">
                <h5 className="text-sm mb-1 line-clamp-1">{props.response.title}</h5>
                <p className="text-sm mb-1 line-clamp-2 text-secondary dark:text-dark-secondary">
                    {props.response.description}
                </p>
            </div>
            {props.response.publisher ? (
                <span className="text-ss text-primary-color">{props.response.publisher}</span>
            ) : null}
        </a>
    </div>
);

export default LinkPreviewCard;
