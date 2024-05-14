import React from "react";
import { Grid, TextField, Button, Box, Alert, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/userAuthApi";

function ResetPassword() {
	const [server_error, setServerError] = useState({});
	const [server_msg, setServerMsg] = useState({});
	const [ resetPassword, {isLoading}] = useResetPasswordMutation()
	const {id, token} = useParams();
	const Navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData ={
			password: data.get('password'),
			password2: data.get('password-confirmation')
		}
		
		const res = await resetPassword({ actualData, id, token })
		if (res.error){
			setServerMsg({})
			setServerError(res.error.data.errors)
			document.getElementById('paswword-reset-form').reset()
		}
		if (res.data){
			setServerError({})
			setServerMsg(res.data)
			document.getElementById('paswword-reset-form').reset()
			setTimeout(()=>{
				Navigate('/login')
			}, 3000)
		}
	}
	return <>
		<Grid container justifyContent="center">
			<Grid item sm={6} xs={12}>
				<h1>Reset Password</h1>
				<Box component='form' noValidate sx={{mt:2, p:5 }} id="paswword-reset-form" onSubmit={handleSubmit}>
					<TextField margin="normal" required fullWidth name="password" id="password" label='New Password' type="password" />
					{server_error.password && <Typography variant='caption' color='error'>{server_error.password}</Typography>}	

					<TextField margin="normal" required  fullWidth name="password-confirmation" id="password2" label='Confirm New Password' type="password" />
					{server_error.password2 && <Typography variant='caption' color='error'>{server_error.password2}</Typography>}	
			
					<Box textAlign='center'>
						{isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" sx={{mt:3, mb:2}}>Save</Button>}
					</Box>

					{server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors}</Alert>}
					{server_msg.msg && <Alert severity="success">{server_msg.msg}</Alert>}
				</Box>
			</Grid>
		</Grid>
	</>;
}

export default ResetPassword;
