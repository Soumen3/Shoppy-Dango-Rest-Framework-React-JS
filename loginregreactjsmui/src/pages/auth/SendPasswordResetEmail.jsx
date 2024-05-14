import React from "react";
import { Grid, TextField, Button, Box, Alert, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";

function SendPasswordResetEmail() {
	const [server_error, setServerError] = useState({});
	const [server_msg, setServerMsg] = useState({});
	const [ sendPasswordResetEmail, {isLoading}] = useSendPasswordResetEmailMutation()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData ={
			email: data.get('email')
		}

		const res = await sendPasswordResetEmail(actualData)
		if (res.error){
			setServerMsg({})
			setServerError(res.error.data.errors)
			console.log(res);
			
			document.getElementById('paswword-reset-email-form').reset()
		}
		if (res.data){
			setServerError({})
			setServerMsg(res.data)
			document.getElementById('paswword-reset-email-form').reset()
		}
		
	}
	return <>
		<Grid container justifyContent="center">
			<Grid item sm={6} xs={12}>
				<h1>Send Password Reset Email</h1>
				<Box component='form' noValidate sx={{mt:2, p:5 }} id="paswword-reset-email-form" onSubmit={handleSubmit}>
					<TextField margin="normal" required fullWidth name="email" id="email" label='Email Address' autoFocus/>
					{server_error.email && <Typography variant='caption' color='error'>{server_error.email}</Typography>}	
					
					<Box textAlign='center'>
						{ isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" sx={{mt:3, mb:2}}>Send</Button>}
					</Box>
				</Box>
				{server_error.non_field_errors && <Alert severity='error'>{server_error.non_field_errors}</Alert>}
				{server_msg.msg && <Alert severity="success">{server_msg.msg}</Alert>}
			</Grid>
		</Grid>
	</>;
}

export default SendPasswordResetEmail;
