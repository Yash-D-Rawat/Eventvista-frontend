import React from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

function Reg_prize({reg, prize, handleChange}) {
    return (
        <div className='w-2/3 flex justify-between'>
            <FormControl className='w-2/5'>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                name='fee'
                value={reg}
                onChange={handleChange}
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                    type='number'
                    required
                />
            </FormControl>

            <FormControl className='w-2/5'>
                <InputLabel htmlFor="outlined-adornment-amount">Prize</InputLabel>
                <OutlinedInput
                name='prize'
                value={prize}
                onChange={handleChange}
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Prize"
                    type='number'
                    required
                />
            </FormControl>
        </div>
    )
}

export default Reg_prize