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
                These all are the test profiles so, the dosen't have much information.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla possimus eos iure nam,
                 molestias perferendis quisquam ducimus quam aliquam repellendus.
                 Eaque quos cumque quas earum veritatis minus repellendus nobis architecto.
            </p>
        </div>
    </div> );
}
 
export default AllProfileDetails;