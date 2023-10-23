import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {goodsApiService} from "../../services/user.service";
import {userThunks} from "../../store/slices";
import {useAppDispatch} from "../../store/store";



const SelectItemsCount = () => {

    const dispatch = useAppDispatch();

    const [count, setCount] = React.useState('');

    const handleChange = async (event: SelectChangeEvent) => {
        dispatch(userThunks.fetchGoods({limit:event.target.value}))
    };

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Count</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={count}
                    label="Count"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={5}><div style={{color:"black"}}>5</div></MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default SelectItemsCount;