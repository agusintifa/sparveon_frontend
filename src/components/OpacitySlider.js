import React, { useContext } from 'react';
import Slider from 'rc-slider';
import { RawContext } from '../context/RawContextProvider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Slide = createSliderWithTooltip(Slider);

export default function OpacitySlider(props) {
    const { handleOpacity } = useContext(RawContext)
    return (
        <div>
            <Slide
                style={{width:'85%'}} 
                min={0} 
                max={20} 
                defaultValue={20} 
                tipFormatter={value => `${value/20*100}%`}
                onChange={(val) => {
                    //console.log(val);
                    handleOpacity(props.id, val/20);
                }} 
            />
        </div>
    )
}
