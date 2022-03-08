import TinderCard from 'react-tinder-card';
import './card.css';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { purple } from '@material-ui/core/colors';
import app from './firebase';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import AllProfileDetails from './components/DetailedProfile'

import AcUnitIcon from '@material-ui/icons/AcUnit';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './function.css';

// import { Element, scroller, animateScroll as scroll } from 'react-scroll'

const Card = (props) => {

    const { currentUser } = useAuth();
    const [rightUsers, setRightUsers] = useState();

    const [currentUserData, setCurrentUserData] = useState({
        currentCity: "",
        age: "",
        description: "",
        gender: "",
        name: "",
        pic: ""
    })


    function userSelf() {

        let returned = 'block';
        props.leftSwiped.forEach(left => {
            if (left === props.id) {
                returned = 'none'
            }
            else {
                left += 1;
            }
        })

        props.rightSwiped.forEach(right => {
            if (right === props.id) {
                returned = 'none'
            }
            else {
                right += 1;
            }
        })

        if (props.id == 'VipwkVqctLPiv3h8q6k0CPucWsI3') {
            returned = 'none'
        }


        if (currentUser.uid === props.id) {
            returned = 'none'
        }

        return returned;

    }

    useEffect(() => {
        app.firestore().collection('people').doc(currentUser.uid).onSnapshot(snapshot => {
            const userData = snapshot.data()
            // console.log(userData)
            setCurrentUserData(userData)
        })
    }, [])
    // console.log(props.id)
    // console.log(currentUserData)

    const onSwipe = (direction) => {

        console.log(props.name + ' swiped ' + direction)
        if (direction === 'left') {

            app.firestore().collection('people').doc(currentUser.uid).collection('leftBucket').add({
                uid: props.id,
                name: props.name
            })
        }
        else if (direction === 'right') {

            app.firestore().collection('people').doc(currentUser.uid).collection('rightBucket').add({
                uid: props.id,
                name: props.name
            })


            app.firestore().collection('people').doc(props.id).collection('rightBucket').onSnapshot(snapshot => {
                let rightSwipesAnother = snapshot.docs.map(doc => doc.data().uid)

                // let updateUserMatches = {}
                // let updateAnotherMatches = {}

                for (let i = 0; i < rightSwipesAnother.length; i++) {
                    let element = rightSwipesAnother[i];
                    if (element === currentUser.uid) {

                        // updateUserMatches = {
                        //     uid: props.id,
                        //     name: props.name,
                        //     description: props.description,
                        //     age: props.age,
                        //     pic: props.pic
                        // }

                        // updateAnotherMatches = {
                        //     uid: currentUser.uid,
                        //     name: currentUserData.name,
                        //     description: currentUserData.description,
                        //     age: currentUserData.age,
                        //     pic: currentUserData.pic
                        // }

                        // console.log(updateUserMatches)
                        // console.log(updateAnotherMatches)

                        app.firestore().collection('people').doc(currentUser.uid).collection('matches').add({
                        uid: props.id,
                        name: props.name,
                        description: props.description,
                        age: props.age,
                        pic: props.pic
                        })

                        app.firestore().collection('people').doc(props.id).collection('matches').add({
                        uid: currentUser.uid,
                        name: currentUserData.name,
                        description: currentUserData.description,
                        age: currentUserData.age,
                        pic: currentUserData.pic
                        })

                    }
                    else {
                        i += 1;
                    }

                }

            })
        }
    }

    const [profileStylesManager, setProfileSttylesManager] = useState(false)

    function managerHandler() {
        if (profileStylesManager == true) {
            setProfileSttylesManager(false)
        }
        else {
            setProfileSttylesManager(true)
        }
    }

    let profileStyles = {}
    let buttonStyles = {
        tag: ''
    }
    let profileDetailsStyles = {}

    if (profileStylesManager == false) {
        profileStyles = {
            overflowY: 'hidden'
        }
        buttonStyles = {
            display: userSelf(),
            bottom: '22%',
            tag: 'VIEW PROFILE',
            width: '140px',
            outline:'none' ,
            height: '40px',
            borderRadius: '4px',
            left: '50%',
            transform: 'translate(-50%, 0)'
        }
        profileDetailsStyles = {
            marginTop: '30px',
            minHeight: '70vh',
            display: 'none'
        }
    }
    else {
        profileStyles = {
            overflowY: 'scroll',
        }
        buttonStyles = {
            display: userSelf(),
            bottom: '1%',
            tag: <ArrowBackIosIcon />,
            opacity: '0.9',
            outline: 'none' ,
            width: '60px',
            height: '60px',
            borderRadius: '70px',
            right: '3%'
        }
        profileDetailsStyles = {
            marginTop: '30px',
            minHeight: '70vh'
        }
    }


    return (<div style={{ display: userSelf() }} className="swiper">

        <button onClick={managerHandler} style={buttonStyles} className="viewButton"><h7>{buttonStyles.tag}</h7></button>

        <TinderCard onSwipe={onSwipe} preventSwipe={["up", "down"]}>

            <div className="displayCard" style={profileStyles}>
                <div className="imgContainer" style={{ backgroundImage: `url(${props.pic})` }}>
                    <h1 className="ageCard">{props.age}</h1>
                    {/* <button onClick={styleControl} className="viewButton"><h7>VIEW PROFILE</h7></button> */}
                </div>
                <div align="center" className="profileDes">
                    <h1>{props.name}</h1>
                    <h5 style={{ maxWidth: '95%', color: '#727273' }}>{props.description}</h5>
                </div>
                <div style={profileDetailsStyles}>
                    <AllProfileDetails />
                </div>
            </div>

        </TinderCard>

        <div style={{marginTop:'15px'}} className="funk">
            <div style={{ padding: 4, display: 'flex', justifyContent: 'space-evenly' }}>
                <IconButton onClick={() => onSwipe("left")} className="swipeLeft"><CloseIcon fontSize='medium' /></IconButton>
                <IconButton onClick={props.refresh} className="swipeSuper"><AcUnitIcon fontSize='medium' /></IconButton>
                {/* <IconButton className="swipeSuper"><StarIcon fontSize='medium' /></IconButton> */}
                <IconButton onClick={() => onSwipe('right')} className="swipeRight"><FavoriteBorderIcon fontSize='medium' /></IconButton>
            </div>
        </div>
    </div>

    );
}

export default Card;