import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";
import { getToken, removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { unSetUserToken } from "../features/authSlice";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";

function Dashboard() {

	const Navigate = useNavigate();
	const dispatch = useDispatch()
	const { access_token } = getToken()
	const { data, isSuccess } = useGetLoggedUserQuery(access_token)
	
	const [userData, setUserData] = useState({
		email: '',
		name: ''
	});

	// Store user Data in local state 
	useEffect(()=>{
		if( data && isSuccess){
			setUserData({
				email: data.email,
				name: data.name
			})
		}
	}, [data, isSuccess])

	// Store user data in redux store
	useEffect(()=>{
		if(data && isSuccess){
			dispatch(setUserInfo({email: data.email, name: data.name}))
		}
	}, [data, isSuccess, dispatch])
	

	const handleLogout = () => {
		removeToken()
		dispatch(unSetUserToken({access_token: null}))
		dispatch(unsetUserInfo({email: '', name: ''}))
		Navigate('/login');
	}

	return <>
		<CssBaseline />
		<Grid container sx={{p:5}}>
			<Grid item sm={4} sx={{backgroundColor:'gray', p:5, color:'white'}}>
				<Typography variant="h5" > Email: {userData.email}</Typography>
				<Typography variant="h6" > Name: {userData.name}</Typography>
				<Button variant="contained" color="warning" size='large' onClick={handleLogout}>Logout</Button>
			</Grid>
			<Grid item sm={8}>
				<ChangePassword />
			</Grid>
		</Grid>
	</>;
}

export default Dashboard;
