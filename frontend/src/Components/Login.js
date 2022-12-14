import { Link, useNavigate } from 'react-router-dom'
import tennisGirl from '../assets/tennisGirl.svg'
import TextField from '@mui/material/TextField';
import tennisball from '../assets/tennis.png'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

const Login = () => {

	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
	const [helperText, setText] = useState('');
	const [password, setPassword] = useState("");
	let navigate = useNavigate(); 

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError(false);
			setText('');
			navigate('/homepage');
		} catch (error) {
			setError(true)
			setText(error.message)
			console.log(error.message);
		}
	}
	return (
		<div className='mainContainer' style={{flexDirection: 'row'}}>
			<div style={{ flexDirection: 'column', width: '50%'}}>
				<div className="LogoText" id='VOL'>
					VOL
				</div>
				<div style={{justifyContent: 'end'}}>
					<div style={{marginTop: 90, justifyContent: 'end', paddingRight: 80, width: 265, flexDirection: 'column'}}>
						<span style={{fontSize: '1.7em', lineHeight: 1.225, textAlign: 'center'}}>
						Find your new tennis partner within minutes
						</span>
						<Link to='/register' style={{color: 'black', fontWeight: 'bold', fontSize: '1.6em', textAlign: 'center', marginTop: 40}}>
								Register here
						</Link>
					</div>
				</div>
				<img src={tennisGirl} id='tennisGirl' alt='Woman holding racket and tennis ball'/>
			</div>
			<div style={{width: '50%', backgroundColor: '#3C3C3C', flexDirection: 'column'}}>
				<div className="LogoText" id='LEY'>
					LEY
				</div>
				<div style={{height: '100%', justifyContent: 'center'}}>
					<div id='loginSquare'>
						<img src={tennisball} alt='tennis ball icon' id='tennisBall'/>
						<form style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
							<TextField 
								style={{marginTop: 80, width: '75%'}}
								error={error}
								helperText={helperText}
								label="Email" 
								autoComplete='email'
								type='email' 
								variant="standard"
								onChange={(e) => {setEmail(e.target.value)}}
							/>

							<TextField 
								style={{marginTop: 40, width: '75%'}}
								label="Password" 
								autoComplete='current-password'
								type='password' 
								variant="standard" 
								onChange={(e) => {setPassword(e.target.value)}}
							/>
						</form>

						<div style={{width: '100%', justifyContent: 'end', paddingRight: 94.5}}>
							<Link to='/register' style={{color: 'black', fontWeight: 'bold', fontSize: '1em', textAlign: 'center', marginTop: 20}}>
									Forgot password?
							</Link>
						</div>

						<Link to='#' style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.3em', color: 'black', marginTop: 50}} onClick={login}>
							<div style={{backgroundColor: '#D6E826', width: 180, height: 44, borderRadius: 60, justifyContent: 'center', alignItems: 'center'}}>
								LOGIN
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login