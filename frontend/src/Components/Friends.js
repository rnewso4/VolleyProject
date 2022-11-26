import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Navbar from "./Navbar"
import TableRow from "./TableRow";
const Friends = () => {

  const [button, setButton] = useState(1);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [id, setID] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [location, setLocation] = useState('');

  let navigate = useNavigate(); 

  const onButtonChange = (index) => {
    if (index !== button) {
      setButton(index)
    }
  }

  const loadUserData = async () => {
    try {
      if (auth.currentUser?.email) {
        const q = query(collection(db, 'users'), where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setFriends(doc.get('friends'));
          setLocation(doc.get('location'));
          setID(doc.id);
          setEmail(doc.get('email'))
        });
        setLoaded(true);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!loaded) {
      onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          navigate('/login')
        } else {
          loadUsers();
          loadUserData();
        }
      })
    }
  }, [loaded, navigate])

  const loadUsers = async () => {
    try {
      const data = await getDocs(collection(db, 'users'));
      const userData = []
      data.docs.forEach((doc) => {
        userData.push(doc.data())
      })
      setUsers(userData);
    } catch (error){
      console.log(error.message)
    }
  }

  const filterFn = (user) => {
    if (user?.email === email) return false;
    switch (button) {
      case 0: {
        if (user.location === location) return true
        return false
      }
      case 1: return true;
      case 2: {
        if (friends?.includes(user.email)) return true
        return false
      }
      default: return true;
    }
  }

  return (
    <div className="mainContainer">
      <Navbar />
      <div id='homepageInnerDiv'>
        <div style={{height: 125, alignItems: 'center'}}>
        <Button variant="text" style={{color: 'black', fontWeight: button === 0 ? 'bold' : 'normal'}} onClick={() => onButtonChange(0)}>Show only people in your area</Button>
        <Button variant="text" style={{color: 'black', fontWeight: button === 1 ? 'bold' : 'normal'}} onClick={() => onButtonChange(1)}>Show Everyone</Button>
        <Button variant="text" style={{color: 'black', fontWeight: button === 2 ? 'bold' : 'normal'}} onClick={() => onButtonChange(2)}>Show only your friends</Button>
        </div>
        <div style={{height: 60, alignItems: 'center', padding: '0px 5px 0px 5px'}}>
          <div className="headerCells" id="firstItem">Name</div>
          <div className="headerCells" >Age</div>
          <div className="headerCells">Country Club</div>
          <div className="headerCells">Self Rating</div>
          <div className="headerCells">Location</div>
          <div className="headerCells">Gender </div>
          <div className="headerCells">Friends?</div>
        </div>
        {users.filter(filterFn).map((user, index) => {
          return (<TableRow key={index} user={user} id={id} friends={friends}/>)
        })}
        
      </div>
    </div>
  )
}

export default Friends