import { Autocomplete, TextField } from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { BsFillArrowRightSquareFill, BsArrowLeft } from "react-icons/bs";

const Register = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  let navigate = useNavigate(); 
  

  const states =['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'RI', "SC", 'SD', 'TN', "TX", 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']; 
  const register = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {email: email, name: name, Lastname: Lastname, location: city + ', ' + state})
			navigate('/homepage');
		} catch (error) {
			console.log(error.message);
		}
	}

  return (
    <div className="mainContainer" style={{backgroundColor: '#3C3C3C', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
      <Link to='/login'>
        <BsArrowLeft style={{position: 'absolute', top: 100, left: 515}} color='black' size={40}/>
      </Link>
      <form style={{backgroundColor: 'white', width: 500, height: '75%', justifyContent: 'center',}}>
        <span style={{justifyContent: 'center', display: 'flex', marginTop: 30, fontWeight: 'bold', fontSize: '1.5em'}}>
          Register Your Account Below
        </span>

        <div style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
        <TextField
            style={{marginTop: 40, width: '75%'}}
            label="First Name"
            autoComplete='off'
            type='text'
            variant="standard"
            onChange={(e) => {setName(e.target.value)}}
          />
          <TextField
            style={{marginTop: 30, width: '75%'}}
            label="Last Name"
            autoComplete='off'
            type='text'
            variant="standard"
            onChange={(e) => {setLastName(e.target.value)}}
          />
          <TextField
            style={{marginTop: 30, width: '75%'}}
            label="Email"
            autoComplete='off'
            type='email'
            variant="standard"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <TextField
            style={{marginTop: 30, width: '75%'}}
            label="Password"
            autoComplete='new-password'
            type='password'
            variant="standard"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <TextField
            style={{marginTop: 30, width: '75%'}}
            label="City"
            autoComplete='off'
            type='text'
            variant="standard"
            onChange={(e) => {setCity(e.target.value)}}
          />

          <Autocomplete
            style={{marginTop: 30, width: '75%'}}
            disablePortal
            id="combo-box-demo"
            options={states}
            onChange={(e, val) => {setState(val)}}
            renderInput={(params) => <TextField {...params} label="States" />}
          />
        </div>
      </form>
      <Link to='#' onClick={register}>
        <div style={{position: 'absolute', right: 300, alignItems: 'center'}}>
          <span style={{color: '#CCFF00',  fontWeight: 'bold', fontSize: '3em'}}>Enter</span>
          <BsFillArrowRightSquareFill style={{color: '#CCFF00', marginLeft: 15}} size={40}/>
        </div>
      </Link>

    </div>
  )
}

export default Register