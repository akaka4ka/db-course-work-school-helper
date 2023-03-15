import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import { useState } from 'react';

export default function DuraDatePicker({ value, setValue, placeholder, style }) {
    return (
        <div style={style}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={'ru'}
            >
                <DatePicker
                    label={placeholder}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => <TextField {...params} required />}
                />
            </LocalizationProvider>
        </div>
    );
}