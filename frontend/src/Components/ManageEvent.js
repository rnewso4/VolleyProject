import { Autocomplete, Box, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { BsFillArrowRightSquareFill, BsArrowLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const ManageEvent = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
	const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [placeOfEvent, setPlaceOfEvent] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const location = useLocation();
  const [create, setCreate] = useState(false);
  const [data, setData] = useState({});
  const [id, setID] = useState("");
  const [loaded, setLoaded] = useState(false);
  let navigate = useNavigate(); 

  useEffect(() => {
    if (location.state) {
      setCreate(location?.state.create)
      setData(location?.state.data)
      setID(location?.state.id)

      if (location?.state.create) {
        setID("0");
      }
    }
    setLoaded(true);
  }, [location.state])

  useEffect(() => {
    if (!id && loaded) {
      navigate('/homepage')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, id])

  const checkDBObject = () => {
    let tempObject = {}
    if (!create) {
      if (Description !== data.Description && Description.length) {
        tempObject['Description'] = Description;
      }
      if (organization !== data.organization && organization.length) {
        tempObject['organization'] = organization;
      }
      if (placeOfEvent !== data.placeOfEvent && placeOfEvent.length) {
        tempObject['placeOfEvent'] = placeOfEvent;
      }
      if (restrictions !== data.restrictions && restrictions.length) {
        tempObject['restrictions'] = restrictions;
      }
      if (title !== data.title && title.length) {
        tempObject['title'] = title;
      }
      if (date !== data.date && date.length) {
        tempObject['date'] = date;
      }
      if (startTime !== data.startTime && startTime.length) {
        tempObject['startTime'] = startTime;
      }
      if (endTime !== data.endTime && endTime.length) {
        tempObject['endTime'] = endTime;
      }
      if ((city !== data.location.split(',')[0] || state !== data.location.split(',')[1].trim()) && (city.length && state.length)) {
        tempObject['location'] = city + ', ' + state;
      }
    } else {
      tempObject = {
        Description: Description,
        organization: organization,
        placeOfEvent: placeOfEvent,
        restrictions: restrictions,
        date: date,
        startTime: startTime,
        endTime: endTime,
        title: title,
        location: city + ', ' + state
      }
   }
    return tempObject;
  }

  const states =['', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'RI', "SC", 'SD', 'TN', "TX", 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']; 
  const save = async () => {
    if (id.length) {
      const dbObject = checkDBObject();
      try {
        if (create) {
          await addDoc(collection(db, 'events'), dbObject)
        } else {
          await updateDoc(doc(db, 'events', id), dbObject)
        }
        navigate('/homepage');
      } catch (error) {
        console.log(error.message);
      }
    }
	}

  const deleteEvent = async() => {
    try {
      await deleteDoc(doc(db, 'events', id));
      navigate('/homepage');
    } catch (error) {
      console.log(error.warning)
    }
  }

  return (
    <>
    {id.length && (
         <div className="mainContainer" style={{backgroundColor: '#3C3C3C', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
         <Link to='/homepage'>
           <BsArrowLeft style={{position: 'absolute', top: 100, left: 515}} color='black' size={40}/>
         </Link>
         {!create && (
          <Link to='#' onClick={deleteEvent}>
           <MdDelete style={{position: 'absolute', top: 100, right: 515}} color='#ff3333' size={40}/>
         </Link>
         )}
         <form style={{backgroundColor: 'white', width: 500, height: 582, maxHeight: 582, justifyContent: 'center', overflowY: 'scroll'}}>
           <span style={{justifyContent: 'center', display: 'flex', marginTop: 30, fontWeight: 'bold', fontSize: '1.5em'}}>
             {create ? 'Create ' : 'Update'} an Event
           </span>
 
           <div style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
           <TextField
               style={{marginTop: 40, width: '75%'}}
               label="Description"
               autoComplete='off'
               defaultValue={data?.Description}
               type='text'
               variant="standard"
               onChange={(e) => {setDescription(e.target.value)}}
             />
             <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Organization"
               autoComplete='off'
               type='text'
               defaultValue={data?.organization}
               variant="standard"
               onChange={(e) => {setOrganization(e.target.value)}}
             />
             <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Where event will be held"
               autoComplete='off'
               type='text'
               defaultValue={data?.placeOfEvent}
               variant="standard"
               onChange={(e) => {setPlaceOfEvent(e.target.value)}}
             />
             <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Restrictions"
               autoComplete='off'
               type='text'
               defaultValue={data?.restrictions}
               variant="standard"
               onChange={(e) => {setRestrictions(e.target.value)}}
             />
              <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Date"
               autoComplete='off'
               type='text'
               defaultValue={data?.date}
               variant="standard"
               onChange={(e) => {setDate(e.target.value)}}
             />
              <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Start Time"
               autoComplete='off'
               type='text'
               defaultValue={data?.startTime}
               variant="standard"
               onChange={(e) => {setStartTime(e.target.value)}}
             />
              <TextField
               style={{marginTop: 30, width: '75%'}}
               label="End Time"
               autoComplete='off'
               type='text'
               defaultValue={data?.endTime}
               variant="standard"
               onChange={(e) => {setEndTime(e.target.value)}}
             /> 
             <TextField
               style={{marginTop: 30, width: '75%'}}
               label="Title"
               autoComplete='off'
               type='text'
               defaultValue={data?.title}
               variant="standard"
               onChange={(e) => {setTitle(e.target.value)}}
             />
             <TextField
               style={{marginTop: 30, width: '75%'}}
               label="City"
               autoComplete='off'
               defaultValue={data?.location ? data.location.split(',')[0] : ''}
               type='text'
               variant="standard"
               onChange={(e) => {setCity(e.target.value)}}
             />
 
             <Autocomplete
               style={{marginTop: 30, width: '75%'}}
               disablePortal
               id="combo-box-demo"
               options={states}
               defaultValue={data?.location ? data.location.split(',')[1].trim() : ''}
               onChange={(e, val) => {setState(val)}}
               renderInput={(params) => <TextField {...params} label="States" />}
             />
           </div>
           <Box height={20}/>
         </form>
         <Link to='#' onClick={save}>
           <div style={{position: 'absolute', right: 300, alignItems: 'center'}}>
             <span style={{color: '#CCFF00',  fontWeight: 'bold', fontSize: '3em'}}>Save</span>
             <BsFillArrowRightSquareFill style={{color: '#CCFF00', marginLeft: 15}} size={40}/>
           </div>
         </Link>
       </div>
    )}
    </>
  )
}

export default ManageEvent