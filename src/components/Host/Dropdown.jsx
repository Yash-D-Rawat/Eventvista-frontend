import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { div } from 'framer-motion/client';

const COLOR = '#009086'

export default function BasicSelect({type, handlechange}) {

    return (
        <div className='w-2/3'>
            <Box >
                <FormControl fullWidth>
                    <InputLabel 
                    id="demo-simple-select-label"
                        sx={{
                            // color: '#ccc', // Default label color
                            '&.Mui-focused': {
                                color: COLOR, // Label color when focused
                            }
                        }}
                    >Event type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        name = 'type'
                        value={type}
                        label="Event Type"
                        required
                        onChange={handlechange}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ccc', // Default border color
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: COLOR, // Border color when focused
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: COLOR, // Border color on hover
                            },
                            '& .MuiSvgIcon-root': {
                                color: COLOR, // Icon color
                            },
                        }}
                    >
                        <MenuItem value={'Hackathon'}>Hackathon</MenuItem>
                        <MenuItem value={'Competitive Coding'}>Competitive Coding</MenuItem>
                        <MenuItem value={'Case Study'}>Case Study</MenuItem>
                        <MenuItem value={'Gaming'}>Gaming</MenuItem>
                        <MenuItem value={'Cultural'}>Cultural</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}