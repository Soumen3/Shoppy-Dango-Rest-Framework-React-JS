import React from "react";
import { TextField, Button, Box, Alert, FormControlLabel, Typography, Checkbox } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/LocalStorageService";


function Registration() {
	const [server_error, setServerError]= useState({})
	const Navigate = useNavigate();
	const [registerUser, {isLoading, isError, }] = useRegisterUserMutation()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData ={
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password2: data.get('password2'),
			tc : data.get('tc')
		}
		
		const res = await registerUser(actualData)
		if(res.error){
			setServerError(res.error.data.errors)
			// console.log(res.error.data.errors);
		}
		if(res.data){
			// console.log(res.data);
			storeToken(res.data.token)
			Navigate('/dashboard')
		}
		
	}
  	return <>
		<Box component='form' noValidate sx={{mt:2, p:5 }} id="registration-form" onSubmit={handleSubmit}>
			<TextField margin="normal" required fullWidth name="name" id="name" label='Name' autoFocus/>
			{server_error.name && <Typography variant='caption' color='error'>{server_error.name}</Typography>}

			<TextField margin="normal" required fullWidth name="email" id="email" label='Email Address'/>
			{server_error.email && <Typography variant='caption' color='error'>{server_error.email}</Typography>}

			<TextField margin="normal" required fullWidth name="password" id="password" label='Password' type="password" />
			{server_error.password && <Typography variant='caption' color='error'>{server_error.password}</Typography>}

			<TextField margin="normal" required fullWidth name="password2" id="password2" label='Confirm Password' type="password" />
			{server_error.password2 && <Typography variant='caption' color='error'>{server_error.password2}</Typography>}

			<FormControlLabel control={<Checkbox type='checkbox' value={true} color="primary" name="tc" id="tc" />} label="I agree to the terms and conditions"/>
			{server_error.tc && <span variant='caption' style={{color:'red', fontSize:12}}>{server_error.tc}</span>}
			
			<Box textAlign='center'>
				<Button type="submit" variant="contained" sx={{mt:3, mb:2}}>Register</Button>
			</Box>
			{
				server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors}</Alert>
			}
		</Box>
  	</>;
}

export default Registration;
