const HomepageEvents = ({last}) => {
  return (
    <div className='eventBox' style={{marginRight: last ? 30 : 100}}>
      <div className="headerBox">
        <html id='headerStyle'>Gbreta</html>
      </div>
      <div style={{height: 174, marginTop: 80, flexDirection: 'column', width: '100%'}}>
        <html style={{paddingTop: 30, textAlign: 'center'}}>Round Robin</html>
        <html style={{padding: '40px 0px 0px 10px'}}><b>Description:</b> Round Robin, benefitting the Food Bank</html>
        <html style={{padding: '20px 0px 0px 10px'}}><b>Location:</b> BREC's Highland Park Tennis Center</html>
        <html style={{padding: '20px 0px 0px 10px'}}><b>Date:</b> Saturday, November 19, 2022</html>
        <html style={{padding: '20px 0px 0px 10px'}}><b>Time:</b> 8:00 AM - 12:00 PM</html>
      </div>
    </div>
  )
}
export default HomepageEvents