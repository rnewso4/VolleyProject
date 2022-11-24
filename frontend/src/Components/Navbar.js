import tennisball from '../assets/tennis.png'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

const Navbar = ({ isDarkMode, setDarkMode }) => {
    const [isMenuShowing, setMenu] = useState(false)
    const onClick = () => {
        return setMenu(!isMenuShowing)
    }
    
    return (
        <>
            <div id='navbar'>
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
                        <h1 id='userName'>Bobby Newsome</h1>
                        <h2 id='userEmail'>rnewso4@lsu.edu</h2>
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
                            <Link to="/login" id='signout'>Sign Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar