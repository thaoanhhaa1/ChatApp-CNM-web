import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LeftIcon, RightIcon, SearchIcon } from '~/assets';
import { stickers } from '~/constants';
import Input from '../input';
import ScrollbarCustomize from '../scrollbarCustomize';
import Button from './Button';
import StickerFooterItem from './StickerFooterItem';
import StickerList from './StickerList';

const Sticker = () => {
    const ref = useRef();
    const [scrollTops, setScrollTops] = useState(() => new Array(stickers.length).fill(0));
    const [swiper, setSwiper] = useState();
    const [isBeginning, setBeginning] = useState(true);
    const [isEnd, setEnd] = useState(true);
    const { t } = useTranslation();

    const handleSlideChange = (swiper) => {
        setBeginning(swiper.isBeginning);
        setEnd(swiper.isEnd);
    };

    const handleSwiper = (swiper) => {
        setSwiper(swiper);
        handleSlideChange(swiper);
    };

    const handleClickNext = () => swiper?.slideNext?.();
    const handleClickPrev = () => swiper?.slidePrev?.();

    const setOffsetTop = (index) => (offsetTop) =>
        setScrollTops((prev) => {
            const newOffsetTops = [...prev];

            newOffsetTops[index] = offsetTop;

            return newOffsetTops;
        });

    const scrollTo = (index) => () => ref.current.scrollY(scrollTops[index]);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 flex flex-col pb-0.5">
                <div className="p-2">
                    <Input
                        iconClassName="sm:pl-2 h-[14px] w-[22px]"
                        className="py-0 h-6 pr-3 sm:pl-2"
                        Icon={SearchIcon}
                        rounded
                        outline
                        placeholder={t('sticker.search')}
                    />
                </div>
                <div className="flex-1">
                    <ScrollbarCustomize ref={ref}>
                        {stickers.map((sticker, index) => (
                            <StickerList key={sticker.id} sticker={sticker} setOffsetTop={setOffsetTop(index)} />
                        ))}
                    </ScrollbarCustomize>
                </div>
            </div>
            <div className="flex h-12 border-t border-[#d6dbe1] bg-white rounded-b-lg z-1">
                <Button onClick={handleClickPrev} hidden={isBeginning}>
                    <LeftIcon />
                </Button>
                <Swiper onSwiper={handleSwiper} onSlideChange={handleSlideChange} spaceBetween={0} slidesPerView="auto">
                    {stickers.map((item, index) => (
                        <SwiperSlide className="!w-fit" key={item.id}>
                            <StickerFooterItem onClick={scrollTo(index)} item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button onClick={handleClickNext} hidden={isEnd}>
                    <RightIcon />
                </Button>
            </div>
        </div>
    );
};

Sticker.propTypes = {};

export default Sticker;
