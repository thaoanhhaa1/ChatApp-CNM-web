import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SliderItem = ({ slide }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center pb-14">
            <img src={slide.image} alt={t(slide.title)} className="object-cover w-[380px]" />
            <div className="mx-[30px] text-center">
                <h4 className="text-lg leading-normal text-primary-color mt-5 mb-2.5">{t(slide.title)}</h4>
                <p className="text-sm leading-normal">{t(slide.description)}</p>
                {slide.button && (
                    <a
                        className="text-ss leading-normal text-primary-color mt-2.5"
                        href={slide.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t(slide.button)}
                    </a>
                )}
            </div>
        </div>
    );
};

SliderItem.propTypes = {
    slide: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
        description: PropTypes.string.isRequired,
        button: PropTypes.string,
    }).isRequired,
};

export default SliderItem;
