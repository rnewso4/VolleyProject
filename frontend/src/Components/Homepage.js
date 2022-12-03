import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";
import HomepageEvents from "./HomepageEvents";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";


const Homepage = () => {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [businessOwner, setBusinessOwner] = useState(false);
  const [organization, setOrganization] = useState('');
  const [loaded, setLoaded] = useState(false);
  let navigate = useNavigate(); 


  useEffect(() => {
    // if (!loaded) {
    //   onAuthStateChanged(auth, (currentUser) => {
    //     if (!currentUser) {
    //       navigate('/login')
    //     }
    //     loadUserData();
    //   })
    // }
  }, [loaded, navigate])

  const loadUserData = async () => {
    // try {
    //   if (auth.currentUser?.email) {
    //     const q = query(collection(db, 'users'), where("email", "==", auth.currentUser.email));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       setLocation(doc.get('location'));
    //       setBusinessOwner(doc.get('businessOwner'));
    //       setOrganization(doc.get('organization'));
    //     });
    //     setLoaded(true)
    //   }
    // } catch (error) {
    //   console.log(error.message)
    // }
  }

  const loadEvents = async () => {
    // const q = query(collection(db, 'events'), where("location", "==", location));
    // const querySnapshot = await getDocs(q);
    // const tempArray = []
    // querySnapshot.forEach((doc) => {
    //   tempArray.push(doc)
    // });
    // setEvents(tempArray)
  }

  const checkEditStatus = (data) => {
    // if (!organization || !businessOwner) return false;
    // if (organization === '*all') return true;
    // if (data.organization === organization) return true;
    // return false;
  }

  useEffect(() => {
    // if (location) loadEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className="mainContainer" style={{flexDirection: 'column'}}>
      <Navbar />
      <div id='homepageInnerDiv'>
        <div style={{marginTop: 20, justifyContent: 'space-between', padding: '0px 30px 0px 30px'}}>
          <span style={{fontWeight: 'bold', fontSize: '3em'}}>Let's Play!</span>
          <Link to='/eventmanagement' state={{ create: true, data: {}, id: 0 }}>
            <IoMdAdd style={{display: businessOwner ? 'block' : 'none', color: 'black'}} size={50}/>
          </Link>
        </div>
        <span style={{marginTop: 150, fontSize: '2em', padding: '0px 0px 20px 30px'}}>Events in {location}</span>
        <div style={{paddingLeft: 30, overflow: 'scroll'}}>
          {events.map((doc, index) => {
            if (index+1 === events.length) {
              return (
                  <HomepageEvents key={index} last={true} data={doc.data()} id={doc.id} canEdit={checkEditStatus(doc.data())}/>
              )
            }
            return (
              <HomepageEvents key={index} data={doc.data()} id={doc.id} canEdit={checkEditStatus(doc.data())}/>
            )
          })} 
        </div> 
      </div>
    </div>
  );
}

export default Homepage;