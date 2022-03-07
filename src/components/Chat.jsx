import '../chat.css';
import { useAuth } from '../context/AuthContext';

const Chat = (props) => {

    const { currentUser } = useAuth();

    let customStyle = {

        backgroundColor: '#693FB6',
        right:'3px',
        marginLeft : 'auto', 
        marginRight: 0,
        marginTop: 4

    } 

    if(props.id !== currentUser.uid){

        customStyle = {

            backgroundColor: '#202020',
            right:'3px'
    
        } 
    }

    // chat self color #693FB6

    return ( <div className="chatOne"  style={customStyle} >

        <p style={{color:'white'}}>{props.text}<p style={{color:'#D8D8D8', fontSize:'10px'}} >{props.time}</p></p>

    </div> );
}

export default Chat;