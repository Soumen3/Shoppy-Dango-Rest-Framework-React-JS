import React from "react";
import {AppBar, Toolbar, Typography, Box, Button} from "@mui/material";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";

function Navbar() {

	const { access_token } = getToken();

	return <>
		<Box sx={{flexGrow:1}}>
			<AppBar position="static" color="secondary">
				<Toolbar>
					<Typography variant ='h5' component="div" sx={{flexGrow:1}}>
						Shoppy
					</Typography>
					<Button component={NavLink} to='/' sx={{color:'white', }}  style={({isActive})=>{
						return isActive ? {
							color: 'white',
							backgroundColor: '#6d1b7b'
						} : {
							color: 'black',
						}
					}}>Home</Button>
					<Button component={NavLink} to='/contact' sx={{color:'white', }} style={({isActive})=>{
						return isActive ? {
							color: 'white',
							backgroundColor: '#6d1b7b'
						} : {
							color: 'black',
						}
					}}>Contact</Button>

					{access_token ? <Button component={NavLink} to='/dashboard' sx={{color:'white', }} style={({isActive})=>{
						return isActive ? {
							color: 'white',
							backgroundColor: '#6d1b7b'
						} : {
							color: 'black',
						}
					}}>Dashboard</Button> : <Button component={NavLink} to='/login' sx={{color:'white', }} style={({isActive})=>{
						return isActive ? {
							color: 'white',
							backgroundColor: '#6d1b7b'
						} : {
							color: 'black',
						}
					}}>Login/Registration</Button> }
					
				</Toolbar>
			</AppBar>
		</Box>
	</>;
}

export default Navbar;
