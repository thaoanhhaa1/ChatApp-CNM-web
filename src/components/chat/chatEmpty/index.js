import { useTranslation } from 'react-i18next';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';
import { NextIcon, PrevIcon } from '~/assets';
import { slider } from '~/constants';
import SliderItem from './SliderItem';

const pagination = {
    clickable: true,
};

const ChatEmpty = () => {
    const { t } = useTranslation();

    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-[95%] relative flex justify-center items-center">
                <div className="absolute right-0 left-0 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[439px] mx-3">
                        <h2 className="text-center text-2xl leading-normal mb-4">{t('chats.emptyTitle')}</h2>
                        <p className="mb-[50px] text-sm leading-normal text-center">{t('chats.emptyDescription')}</p>
                    </div>
                    <Swiper
                        className="w-full slider relative"
                        slidesPerView={1}
                        pagination={pagination}
                        navigation={{
                            nextEl: '.slider-btn--next',
                            prevEl: '.slider-btn--prev',
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop
                    >
                        {slider.map((item) => (
                            <SwiperSlide key={v4()} className="!w-full">
                                <SliderItem slide={item} />
                            </SwiperSlide>
                        ))}
                        <button className="slider-btn slider-btn--prev">
                            <PrevIcon />
                        </button>
                        <button className="slider-btn slider-btn--next">
                            <NextIcon />
                        </button>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

ChatEmpty.propTypes = {};

export default ChatEmpty;
