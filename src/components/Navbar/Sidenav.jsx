import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdEmojiEvents, MdOutlineMiscellaneousServices } from 'react-icons/md';
import { IoMenu, IoLogOutOutline } from 'react-icons/io5';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SiCmake } from "react-icons/si";
import { CgProfile } from "react-icons/cg";


export default function Sidenav({ handleLogout }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const items = [
        {
            page: 'Home',
            icon: FaHome,
            link: '/'
        },
        {
            page: 'Events',
            icon: MdEmojiEvents,
            link: `/events/by_type/${'all'}/${'all'}`
        },
        {
            page: 'Event Map',
            icon: FaMapMarkerAlt,
            link: '/EventMap'
        },
        {
            page: 'About Us',
            icon: MdOutlineMiscellaneousServices,
            link: '/About'
        },

    ]

    const items2 = [
        {
            page: 'Host Event',
            icon: SiCmake,
            link: '/host'
        },
        {
            page: 'Profile',
            icon: CgProfile,
            link: '/Profile'
        },
        {
            page: 'Logout',
            icon: IoLogOutOutline,
            link: '/Login'
        },
    ]

    const DrawerList = (
        <Box sx={{ width: 250, color: 'black' }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {items.map((item, index) => (
                    <Link to={item.link}>
                        <ListItem key={index} disablePadding>
                            <ListItemButton className='hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out'>
                                <ListItemIcon>
                                    <item.icon className='size-6' />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.page}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {items2.map((item, index) => (
                    <Link to={item.link}>
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                            onClick={item.page === 'Logout' ? handleLogout : null}
                            className='hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out'
                            >
                                <ListItemIcon>
                                    <item.icon className='size-6' />
                                </ListItemIcon>
                                <ListItemText primary={item.page} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return (
        <div className='p-1 relative flex items-center justify-center md:hidden'>
            <div onClick={toggleDrawer(true)}><IoMenu className='size-8 absolute left-3 top-2' /></div>
            <img src="/images/logo.png" alt="" className='w-[20%]'/>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
