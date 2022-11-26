import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const HomepageEvents = ({last, data, id, canEdit}) => {
  const restrictions = data.restrictions !== 'none';
  return (
    <div className='eventBox' style={{marginRight: last ? 30 : 100}}>
      <div className="headerBox">
        <Link to='/eventmanagement' state={{ create: false, data: data, id: id }} style={{display: canEdit ? 'block' : 'none', color: 'black'}}>
          <MdEdit size={25} style={{position: 'absolute', right: 15, top: 15}}/>
        </Link>
        <span id='headerStyle'>{data.organization}</span>
      </div>
      <div style={{height: 315, marginTop: 80, flexDirection: 'column', width: '100%', overflowY: 'scroll'}}>
        <span style={{paddingTop: 20, textAlign: 'center'}}>{data.title}</span>
        <span style={{padding: '30px 0px 0px 10px'}}><b>Description:</b> {data.Description}</span>
        <span style={{padding: '20px 0px 0px 10px'}}><b>Location:</b> {data.placeOfEvent}</span>
        <span style={{padding: '20px 0px 0px 10px'}}><b>Date:</b> {data.date}</span>
        <span style={{padding: '20px 0px 0px 10px'}}><b>Time:</b> {data.startTime} - {data.endTime}</span>
        <span style={{padding: '20px 0px 10px 10px', display: restrictions ? 'block' : 'none'}}><b>Restrictions:</b> {data.restrictions}</span>
      </div>
    </div>
  )
}
export default HomepageEvents