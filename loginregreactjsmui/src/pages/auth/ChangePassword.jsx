import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useChangeUserPasswordMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

function ChangePassword() {
	
	const [server_error, setServerError] = useState({})
	const [server_msg, setServerMsg] = useState({});
	
	const [changeUserPassword] = useChangeUserPasswordMutation()
	const { access_token } = getToken()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData ={
			// current_password: data.get('current_password'),
			password: data.get('password'),
			password2: data.get('password2')
		}

		const res = await changeUserPassword({actualData, access_token})
		if (res.error){
			setServerError(res.error.data.errors)
			setServerMsg({})
			// console.log(res.error.data.errors);		
		}
		if (res.data){
			// console.log(res.data);
			setServerMsg(res.data)
			setServerError({})
			document.getElementById('password-change-form').reset();
		}
	}
	return <>
		<Box sx={{display:'flex', flexDirection:'coloum', flexWrap: 'wrap', maxWidth:600, mx:4}}>
			<h1>Change Password</h1>
			<Box  component='form' onSubmit={handleSubmit} noValidate sx={{mt:1}} id='password-change-form' >
				{/* <TextField margin="normal" required fullWidth name="current_password" id="current_password" label='Current Password' type="password" /> */}
				<TextField margin="normal" required fullWidth name="password" id="password" label='New Password' type="password" />
				{server_error.password && <Typography variant='caption' color='error'>{server_error.password}</Typography>}
				
				<TextField margin="normal" required fullWidth name="password2" id="password2" label='Confirm New Password' type="password" />
				{server_error.password2 && <Typography variant='caption' color='error'>{server_error.password2}</Typography>}
				
				<Box textAlign='center'>
					<Button type="submit" variant="contained" sx={{mt:3, mb:2}}>Change Password</Button>
				</Box>
				{
					server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>
				}
				{
					server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : null
				}
			</Box>

		</Box>
	</>;
}

export default ChangePassword;
