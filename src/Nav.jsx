import './nav.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Link } from "react-router-dom";

const Nav = () => {


    return (<div className="navi">

            <Link to="/profile"><IconButton ><AccountCircleIcon fontSize='medium' /></IconButton></Link>
            <Link to="/home"><IconButton><HomeIcon fontSize='medium'/></IconButton></Link>
            <Link to="/matches"><IconButton><WhatshotIcon fontSize='medium'/></IconButton></Link>
            {/* <Link to="/chats"><IconButton><ForumIcon fontSize='medium'/></IconButton></Link> */}

    </div>);
}

export default Nav;