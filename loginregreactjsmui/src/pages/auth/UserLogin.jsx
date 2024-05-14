import React, { useEffect } from "react";
import { TextField, Button, Box, Alert, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/authSlice";

function UserLogin() {

	const [server_error, setServerError]= useState({})	
	const Navigate = useNavigate();
	const [loginUser, {isLoading, isError}] = useLoginUserMutation()
	const dispatch = useDispatch()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData ={
			email: data.get('email'),
			password: data.get('password')
		}
		
		const res = await loginUser(actualData)
		if(res.error){
			setServerError(res.error.data.error)
			// console.log(res.error.data.error);
		}
		if(res.data){
			storeToken(res.data.token)
			let { access_token } = getToken()
			dispatch(setUserToken({ access_token : access_token }))
			Navigate('/dashboard')
		}
	}
	let { access_token } = getToken()
	useEffect(()=>{
		dispatch(setUserToken({ access_token : access_token }))
	}, [ access_token , dispatch])

	return <>
		<Box component='form' noValidate sx={{mt:2, p:5 }} id="login-form" onSubmit={handleSubmit}>
			<TextField margin="normal" required fullWidth name="email" id="email" label='Email Address' autoFocus/>
			{server_error.email && <Typography variant='caption' color='error'>{server_error.email}</Typography>}

			<TextField margin="normal" required fullWidth name="password" id="password" label='Password' type="password" />
			{server_error.password && <Typography variant='caption' color='error'>{server_error.password}</Typography>}

			<Box textAlign='center'>
				{isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" sx={{mt:3, mb:2}}>Login</Button>}
			</Box>
			<NavLink to='/forgot-password'>Forgot Password ?</NavLink>
			{
				server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors}</Alert>
			}
			
		</Box>
	</>;
}

export default UserLogin;
