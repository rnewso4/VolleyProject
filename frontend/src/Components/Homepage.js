import Navbar from "./Navbar";
import { BsChatText } from "react-icons/bs";
import HomepageEvents from "./HomepageEvents";


const Homepage = () => {
  return (
    <div className="mainContainer" style={{flexDirection: 'column'}}>
      <Navbar />
      <div id='homepageInnerDiv'>
        <div style={{marginTop: 20, justifyContent: 'space-between', padding: '0px 30px 0px 30px'}}>
          <html style={{fontWeight: 'bold', fontSize: '3em'}}>Let's Play!</html>
          <BsChatText size={50}/>
        </div>
        <html style={{marginTop: 150, fontSize: '2em', padding: '0px 0px 20px 30px'}}>Events in Baton Rouge, LA</html>
        <div style={{paddingLeft: 30, overflow: 'scroll'}}>
          <HomepageEvents/>
        </div> 
      </div>
    </div>
  );
}

export default Homepage;