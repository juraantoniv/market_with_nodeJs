import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppDispatch} from "../../store/store";
import {userActions, userThunks} from "../../store/slices";

function valuetext(value: number) {
    return `${value}°C`;
}

export const  RangeSlider=()=> {
    const [value, setValue] = React.useState<number[]>([1, 100]);
    const dispatch = useAppDispatch();

    console.log(value);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);

    };

    return (
        <Box sx={{ width: "70%" }}>
            <Slider
                getAriaLabel={() => 'Price'}
                value={value}
                step={10}
                onChange={handleChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}