import React,{useEffect,useState,useRef} from 'react';
import InputBase from '@mui/material/InputBase';
import styledcom from '@emotion/styled';
import { styled,alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getMyId ,setActivePage} from '../../store/user-slice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,Navigate } from 'react-router-dom';
import { changeSeen } from '../../store/editor-slice';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SearchIcon from '@mui/icons-material/Search';


const pages = ["home","profile"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];






function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [trigger,setTrigger]=useState(false)
  
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const myref=useRef()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {

    console.log("jjjjjjjjjjjjjjjjjjjjj")
    setTrigger(!trigger)
  

  };



  useEffect(()=>{


    

    
    const locArray=window.location.href.split("/")
    dispatch(getMyId())
    dispatch(setActivePage(locArray[locArray.length-1]))
    
    

  },[window.location.href])

  const handleCloseNavMenu = (pages) => {
    setAnchorElNav(null);

    if(pages!=""){
    
      navigate(`/${pages}`)

    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const editor=useSelector(state=>state.editor)


 


  useEffect(()=>{

    let handler=(e)=>{
     
      if(trigger && !myref.current.contains(e.target)){

        setTrigger(false)
      }

    }

    document.addEventListener("mousedown",handler)


    return document.removeEventListener("mousedown",()=>{})

  },[trigger])





  

 
  const info=useSelector(state=>state.users)
  const clickHandler=(postid,format,audid,index)=>{
  // dispatch(changeSeen({postId:postid,index}))
// dispatch(getMyId())
    if(format=="audios" || format=="audiosNoti"){
      return navigate(`/Audio/${audid}`,{state:{index}})
    }else if(format=="scripts"){
      return navigate(`/Post/${postid}`,{state:{index}})
    }

  }


  
  return (
    <AppBar position="sticky" sx={{zIndex:"4",
    boxShadow: "0px 2px rgba(0,0,0,0.2",
    borderBottom:"1px solid #23395d"
    
    
    
    }}>
      <Container maxWidth="xl">
        
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StoryBook
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{handleCloseNavMenu(page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}


           
            </Menu>
            
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexShrink: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            STORYBOOK
          </Typography>

        
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

{
  info.loading?"loading....":<div className="notification" style={{position:"relative"}}>

  <div  className="notCount" style={{backgroundColor:"red",color
:"white",position:"absolute",top:"0",zIndex:"2"}}>{info.userId.notiCount!=0?info.userId.notiCount:null}</div>
<Tooltip title="Open settings">
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
      <CircleNotificationsIcon  fontSize='large'/>
    </IconButton>
  </Tooltip>


{
  trigger? <div ref={myref}  className="notiMenu" style={{padding:"0.5rem",backgroundColor:"white",width:"300%",position:"absolute",left:"-200%",bottom:"-500%",height:"12rem",border:"1px solid yellow",overflowY:"scroll"}}>
  {
    info.loading?"no new notifications":
   info.userId && info.userId.notifications && info.userId.notifications.length>0? info.userId.notifications.slice(0,11).map((item,index)=>{


      console.log(item)

      return <div onClick={()=>{clickHandler(item.postid,item.format,item.audid,item._id)}} style={{color:item.seen=="no"?"black":"#d3d3d3",cursor:"pointer",marginBottom:"0.3rem"}}>{
        item.format=="audiofill" && item.by?`${item.by} has filled your script`:
        item.format=="audiosNoti" && item.by? `${item.by} posted new audio`:
        item.format=="scripts" && item.by?`${item.by} has posted new script`:
        "you have been tagged"}</div>
    }):"no new notifications"
  }
</div>:null
}
 



</div>
}

        
          
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
