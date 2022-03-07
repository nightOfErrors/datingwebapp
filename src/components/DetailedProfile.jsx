import '../detailedProfile.css'

const AllProfileDetails = () => {



    return ( <div>
        <h5 style={{marginLeft:'7px', marginTop:'10px'}}>My Basic Info</h5>
        <div style={{padding:'5px', display:'flex'}} >
            <div className='aboutMe'>Active</div>
            <div className='aboutMe'>Never</div>
        </div>
        <h5 style={{marginLeft:'7px', marginTop:'10px'}}>My Intrests</h5>
        <div style={{padding:'5px', display:'flex', flexWrap:'wrap'}} >
            <div className='intrests'>Swimming</div>
            <div className='intrests'>Programming</div>
            <div className='intrests'>Programming core</div>
            <div className='intrests'>Lorean</div>
        </div>
        <h5 style={{marginLeft:'7px', marginTop:'15px'}}>About Me</h5>
        <div style={{padding:'5px'}}>
            <p style={{color:'#727273'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Recusandae sit earum accusamus itaque a, molestiae quia, maxime laboriosam doloribus quaerat 
                ipsam voluptates! Ipsa dolores consectetur minus veritatis unde nulla ullam.
            </p>
        </div>
    </div> );
}
 
export default AllProfileDetails;