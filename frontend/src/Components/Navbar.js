import tennisball from '../assets/tennis.png'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const [isMenuShowing, setMenu] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loaded, setLoaded] = useState('');
    let navigate = useNavigate(); 

    const onClick = () => {
      return setMenu(!isMenuShowing)
    }

    const signOutClicked = async () => {
      await signOut(auth)
      navigate('/login')
    }

    useEffect(() => {
      if (!loaded) {
        onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            loadUserData();
          }
        })
      }
    }, [loaded])

    const loadUserData = async () => {
      try {
        if (auth.currentUser?.email) {
          const q = query(collection(db, 'users'), where("email", "==", auth.currentUser.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setName(doc.get('name') + ' ' + doc.get('Lastname'));
            setEmail(doc.get('email'));
          });
          setLoaded(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    
    return (
        <>
            <div id='navbar' style={{zIndex: 3}}>
                <div id='navbarLeft'>
                    <img src={ tennisball } alt='tennisball' id='logoNavbar'/> 
                    <Link to='/homepage' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
                      <div className='navLeftContainers'>Events</div>
                    </Link>
                    <Link to='/friends' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
                      <div className='navLeftContainers'>Friends</div>
                    </Link>
                </div>
                <div id='navbarRight' onClick={onClick}>
                    <div>Your Account</div>
                </div>
                <div id={isMenuShowing ? 'dropMenuShow' : 'dropMenu'}>
                    <div id='profile'>
                        <h1 id='userName'>{name}</h1>
                        <h2 id='userEmail'>{email}</h2>
                    </div>
                    <div id='dropdownInnerContents'>
                        <div className='dropdownItems'>
                            <Link to="#">My Profile</Link>
                        </div>
                        <div className='dropdownItems'>
                            <Link to="#">Account Settings</Link>
                        </div>
                        <div id='bottomNavbar'>
                            <IoCloseOutline id='navClose' onClick={onClick} />
                            <Link to="#" id='signout' onClick={signOutClicked}>Sign Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar