import { Checkbox } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const TableRow = ({user, id, friends}) => {

  const onChange = async (event, value) => {
    if (value) {
      friends.push(user?.email)
    } else {
      friends = friends.filter((friend) => friend !== user?.email)
    }
    try {
      await updateDoc(doc(db, 'users', id), {friends: friends})
    } catch (error){
      console.log(error.message)
    }
  }

  return (
    <div style={{height: 60, alignItems: 'center', padding: '0px 5px 0px 5px'}}>
      <div className="tableCells" id="firstItem">{user?.name + ' ' + user?.Lastname}</div>
      <div className="tableCells">{user?.age}</div>
      <div className="tableCells">{user?.countryClub}</div>
      <div className="tableCells">{user?.selfRating}</div>
      <div className="tableCells">{user?.location}</div>
      <div className="tableCells">{user?.gender}</div>
      <div className="tableCells">
      {friends?.includes(user?.email) ?  <Checkbox defaultChecked onChange={onChange}/> :  <Checkbox onChange={onChange}/>}
    </div>
  </div>
  );
}

export default TableRow
