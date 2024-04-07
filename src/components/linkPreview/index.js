import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import LinkPreviewCard from './LinkPreviewCard';
import LinkPreviewSkeleton from './LinkPreviewSkeleton';

const LinkPreview = ({ url }) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const linkPreviewRef = useRef(null);

    const handleSubmit = useCallback(() => {
        setLoading(true);

        fetch(`${process.env.REACT_APP_LINK_PREVIEW_ENDPOINT}?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&q=${url}`)
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(response.status);
            })
            .then(setResponse)
            .finally(() => setLoading(false));
    }, [url]);

    useEffect(() => {
        handleSubmit();
    }, [handleSubmit]);

    if (!response) return null;

    return (
        <div className="link-preview">
            {loading ? (
                <LinkPreviewSkeleton />
            ) : (
                response && (
                    <div ref={linkPreviewRef}>
                        <LinkPreviewCard response={response} />
                    </div>
                )
            )}
        </div>
    );
};

LinkPreview.prototype = {
    url: PropTypes.string.isRequired,
};

export default LinkPreview;
