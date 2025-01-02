import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({ onSelectFarm }) {
    const [value, setValue] = React.useState(null);

    const farms = [
        { id: 1, name: 'Your Farm' },
        { id: 2, name: 'Da Nang Farm' },
        { id: 3, name: 'Ho Chi Minh Farm' },
        { id: 4, name: 'Hanoi Farm' },
    ];

    return (

        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue)
                setValue(newValue);
                onSelectFarm(newValue);  // Pass selected farm to the parent
            }}
            options={farms}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} placeholder='Tìm kiếm nông trại bạn yêu thích' />}
            sx={{ width: 500 }}
        />
    );
}
