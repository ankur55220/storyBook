import React, { useEffect, useState } from 'react';
import styled1 from 'styled-components';
import { styled,alpha} from '@mui/material/styles';
import axios from 'axios';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchCard from '../SearchCard/SearchCard';
import LogoutIcon from '@mui/icons-material/Logout';
import NotesIcon from '@mui/icons-material/Notes';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMyPublished, getMyPosts, getMyFav } from '../../store/user-slice';
import { changeActive } from '../../store/editor-slice';
import { getFalse } from '../../store/editor-slice';
import UseLocalStorage from '../../hooks/UseLocalStorage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../firebaseConfig';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { uploadImg } from '../../store/user-slice';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { url } from '../../url';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '20ch'
    },
  },
}));

const ProfilePic = ({ user }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '1.2rem'
  };

  const right_profile = {
    marginLeft: '1.5rem'
  };

  const pro_i = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const img_pro = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    console.log(user, 'kjkjjlkljl');
  }, [user]);
  return (
    <div className="profile" style={style}>
      <div className="left_profile">
        <img style={img_pro} src={user?.img} alt="" className="img_pro" />
      </div>
      <div className="right_profile" style={right_profile}>
        <div className="pro_name">{user?.username}</div>
        <div className="pro_i" style={pro_i}>
          <div className="info" style={{ width: '50%', fontSize: '0.5rem' }}>
            Published&nbsp;&nbsp;{user?.count}
          </div>
          <div className="info" style={{ width: '50%', fontSize: '0.5rem', whiteSpace: 'nowrap' }}>
            Joined&nbsp;&nbsp;{new Date(user?.joined).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};



const Btn = styled1.button`
display: inline-block;
padding: 0.5rem 2rem;
outline: none;
border: none;
background-color: #${(props) => props.theme.colors.btn_bg_light};
color: #${(props) => props.theme.colors.btn_clr_light};
font-size: 1rem;
letter-spacing: 2px;
border-radius: 5px;
display: flex;
align-items: center;
margin-right: 1.2rem;
cursor:pointer;
&hover:background-color:red;
`;

const SideBar = styled1.div`
  background-color: #1976d2;
  color: #ffff;

  font-size: 1rem;
  font-weight: bold;
  height: 90vh;
  width: 20%;
  position: sticky;
  top: 0;
  left: 0;
  z-index:20;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SideBarBody = styled1.div`
  width: 80%;
  margin: auto;
  height: 100%;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const MenuItem = styled1.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const FirstMenuItem = styled1(MenuItem)`
  margin-bottom: 1rem;
`;

const Footer = styled1.div`
  paddingleft: 7%;
  display: flex;
  justify-content: flex-start;
  alignitems: center;
  cursor: pointer;
`;

const SearchBlock=styled1.div`

position:relative;
padding:0;


`

const SearchedPeople=styled1.div`

position:absolute;
width:100%;
padding:${(props)=>props.textlen==0?"0px":"1rem 2rem"};
height:${(props)=>props.textlen== 0?"0px":props.cond==0?"3rem":props.cond>0?"auto":"auto"};

background-color:#ffffff;
background-color:${(props)=>{console.log(props.textlen,"jjjjj000")}};
border-radius:0 0 10px 10px;
top:100%;
left:0;


transition:all 1s;

;
`

const ProfileMenu = ({ typeOf, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [proType, setProtype] = useState('fav');
  const [file, setFile] = useState();
  const [percent, setPercentage] = useState(0);
  const [url, setUrl] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setPercentage(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const comm = useSelector((item) => item.editor);

  const clickHandler = (type) => {
    setProtype(type);

    console.log(type, '====================');
    const dummy = {
      dummy: 'dummy'
    };
    if (type == 'write') {
      return navigate('/edit');
    } else if (type == 'published') {
      dispatch(getMyPublished(dummy))
        .then(() => dispatch(getFalse()))
        .then(() => dispatch(changeActive('scripts')));
    } else if (type == 'fav') {
      dispatch(getMyFav(dummy))
        .then(() => dispatch(getFalse()))
        .then(() => dispatch(changeActive('scripts')));
    } else if (type == 'save') {
      dispatch(getMyPosts(dummy))
        .then(() => dispatch(getFalse()))
        .then(() => dispatch(changeActive('scripts')));
    }
  };

  const upload = () => {
    if (!file) {
      alert('no files to upload');
    }

    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state-changed',
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setPercentage(percentage);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          dispatch(uploadImg({ url, id }));

          const np = new Promise((resolve, reject) => {
            setTimeout(() => {
              clickHandler(proType);

              resolve('maybe working');
            }, 1000);
          });

          np.then(() => {
            console.log('hello');
          });
        });
      }
    );
  };

  return (
    <>
      {typeOf == 'Othersprofile' ? (
        <>
        <MenuItem
          onClick={() => {
            clickHandler('published');
          }}>
          <PublishedWithChangesIcon />
          &nbsp;&nbsp;&nbsp;published posts
        </MenuItem>
        {/* <Btn>follow</Btn> */}
        </>
      ) : (
        <>
          <button
            onClick={handleClickOpen}
            style={{
              marginBottom: '0.8rem',
              padding: '0.4rem 1.2rem',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: 'teal',
              color: 'white',
              cursor: 'pointer'
            }}>
            Profile pic
          </button>
          <FirstMenuItem
            onClick={() => {
              clickHandler('write');
            }}>
            <NotesIcon />
            &nbsp;&nbsp;&nbsp;Write Scriptoo
          </FirstMenuItem>
          <MenuItem
            onClick={() => {
              clickHandler('published');
            }}>
            <PublishedWithChangesIcon />
            &nbsp;&nbsp;&nbsp;published posts
          </MenuItem>
          <MenuItem
            onClick={() => {
              clickHandler('fav');
            }}>
            <FavoriteIcon />
            &nbsp;&nbsp;&nbsp;Favourite posts
          </MenuItem>
          <MenuItem
            onClick={() => {
              clickHandler('save');
            }}>
            <BookIcon />
            &nbsp;&nbsp;&nbsp;My posts
          </MenuItem>
        </>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{'Update your profile pic'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              name="file"
              id=""
              onClick={() => {
                setPercentage(0);
              }}
            />
            <CircularProgress variant="determinate" value={percent} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>back</Button>
          <Button onClick={upload}>upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
function Sidebar({ type, loading, error, user }) {
  const navigate = useNavigate();

  const {getLoggedInUser}=UseLocalStorage()
  const { logoutUser } = useLocation();
  const location=useSelector((state)=>state.users.activePage)
  const [text,setText]=useState("")
  const [userData,setUserData]=useState([])
  const [cuurLoading,setCurrloading]=useState(false)
  useEffect(() => {
    console.log(loading, error, user, 'pppppppp');
  }, [loading, error, user]);

  const travel = () => {
    console.log('jjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkk');
    return navigate('/profile');
  };


  async function handleChange(){
    setCurrloading(true)
    const token=getLoggedInUser()
     const response= await axios.post(`${url}/searchUser`,{text},{

      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
     })

     console.log(response.data)
     setUserData(response.data.AllUsers)

     setCurrloading(false)
  }


  useEffect(()=>{

    if(text.length==0){
      setUserData([])
    }
let timeout=setTimeout(()=>{
  if(text.length>0){
    handleChange()

  }

},800)

   return ()=>clearTimeout(timeout)
    
  },[text])
  const logout = () => {
    navigate('/');
  };
  return (
    <SideBar>
      <button onClick={()=>{console.log(userData.length,text.length)}}>click hereeee</button>
      <SideBarBody>
        <div className="upper_bar">
          {type && loading ? (
            <CircularProgress />
          ) : type && !loading ? (
            <ProfilePic user={user} />
          ) : null}

          {type ? (
            <ProfileMenu typeOf={type} id={user?.email} />
          ) : (
            <>
              <FirstMenuItem onClick={travel}>
                <AccountBoxIcon />
                &nbsp;&nbsp;&nbsp;My Profile
              </FirstMenuItem>
       {
        location && location=="home"? <SearchBlock  >
        <Search onChange={(e)=>{setText(e.target.value)}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search users"
            inputProps={{ 'aria-label': 'search ' }}
          />
        </Search>

        <SearchedPeople cond={userData.length?userData.length:0} textlen={text.length} >
          {
            cuurLoading?"loading...":

            userData.length==0 && text.length>0?<h8 style={{color:"black"}}>no such user found</h8>:
           userData.length>0? userData.map((item)=>{
              return <SearchCard name={item.username} image={item.profilePic} id={item._id}/>
            })
             :null

            
          }
          {/* <SearchCard name="sarah" image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1376&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
        </SearchedPeople>
      </SearchBlock>:null
       }
             
            </>
          )}
        </div>

        <Footer>
          <LogoutIcon />
          &nbsp;&nbsp;&nbsp;Logout
        </Footer>
      </SideBarBody>
    </SideBar>
  );
}

export default Sidebar;
