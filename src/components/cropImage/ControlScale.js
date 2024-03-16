import { Slider } from '@mui/material';
import PropTypes from 'prop-types';
import { RoundMinusIcon, RoundPlusIcon } from '~/assets';
import { constants } from '~/constants';
import ControlButton from './ControlButton';

const ControlScale = ({ scale, onChangeScale = () => {}, onScaleDown = () => {}, onScaleUp = () => {} }) => {
    return (
        <div className="h-14 my-4 flex justify-center items-center gap-4">
            <ControlButton disabled={scale === constants.MIN_SCALE_IMAGE} onClick={onScaleDown} Icon={RoundMinusIcon} />
            <div className="flex w-[200px]">
                <Slider
                    min={constants.MIN_SCALE_IMAGE}
                    max={constants.MAX_SCALE_IMAGE}
                    className="text-primary-color"
                    value={scale}
                    onChange={onChangeScale}
                    step={constants.SCALE_PER_WHEEL}
                />
            </div>
            <ControlButton disabled={scale === constants.MAX_SCALE_IMAGE} onClick={onScaleUp} Icon={RoundPlusIcon} />
        </div>
    );
};

ControlScale.propTypes = {
    scale: PropTypes.number.isRequired,
    onChangeScale: PropTypes.func,
    onScaleDown: PropTypes.func,
    onScaleUp: PropTypes.func,
};

export default ControlScale;
