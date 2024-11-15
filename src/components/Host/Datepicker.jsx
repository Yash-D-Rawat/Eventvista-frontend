import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function Datepicker({handleDate}) {
  const [date, setdate] = React.useState(dayjs(null)); // Initial state as null
  const [time, settime] = React.useState(dayjs(null));

  const handleDateChange = (newValue) => {
    setdate(newValue);
    // You can also call onDateChange if you want to pass the date up
    
    handleDate(newValue, time);
  };

  const handleTimeChange = (newValue) => {
    settime(newValue);
    // You can also call onDateChange if you want to pass the time up
    
    handleDate(date, newValue);
    
  };

  return (
    <div className='flex justify-between w-2/3'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker 
          value={date}
          onChange={handleDateChange}
          label="Basic date picker"/>
        </DemoContainer>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker 
          value={time}
          onChange={handleTimeChange}
          label="Basic time picker" />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}