import { useEffect, useState } from "react";
import { Container, Form, FormControl, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import cookies from "react-cookies"
import { logoutUser } from "../ActionCreators/UserCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router"


export default function Header() {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const history = useHistory()
    const [pathName, setPathName] = useState('/')
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const location = useLocation()

    const hiddenInfo = () => {
      const infoElement = document.getElementById('info')
      const coursesElement = document.getElementById('courses')
      const waveElement = document.querySelector('.animation-wave')
      if (!!infoElement && !!waveElement && !!coursesElement && !infoElement.classList.contains('hidden')){
        infoElement.classList.add('hidden');
        waveElement.classList.add('hidden');        
      }
    }
    const unHiddenInfo = () => {
      const infoElement = document.getElementById('info')
      const coursesElement = document.getElementById('courses')
      const waveElement = document.querySelector('.animation-wave')
      if (!!infoElement && !!waveElement && !!coursesElement && infoElement.classList.contains('hidden')){
        infoElement.classList.remove('hidden');
        waveElement.classList.remove('hidden');
      }
    }

    useEffect(() => {
      var animateButton = function(e) {
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },2000);
      };
      
      var bubblyButtons = document.getElementsByClassName("bubbly-button");
      
      for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
      }
        const loadCategories = async () => {
            let res = await Apis.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
        // pageElement.scrollLeft = 0;
        // pageElement.scrollTop = 0;
    }, [])
    useEffect(()=>{
      setPathName(location.pathname)
    },[location.pathname]);

    const search = (event) => {
        event.preventDefault()
        history.push(`/?q=${q}`)
        if (q){
          hiddenInfo()
        }
    }
    
    const logout = (event) => {
      event.preventDefault()
      cookies.remove("access_token")
      cookies.remove("user")
      dispatch(logoutUser())
    }

    let path = <>
      <Link className="bubbly-button" to= {`/login?continue=${pathName}`}>Đăng nhập</Link>
      <div className="vr" />
      <Link className="bubbly-button" to="/register">Đăng ký</Link>
    </>
    if (user !== null && user !== undefined) {
      path = <>
        <Image className="avatar" src={user.avatar} roundedCircle fluid alt ="avatar"/>
        <Link className="nav-link text-white" to="#">{user.username}</Link>
        <div className="vr" />
        <Link className="bubbly-button"to ="#" onClick={logout}>Đăng xuất</Link>
        </>
    }
      
    return (
      <>
              <div id="toast">
                  
                    </div>
      <div id = "home" style = {{minHeight:"96px"}}></div>
       <Navbar id = "navbar" variant="dark" expand = "lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img id = "logo-vnuf"
            alt="logo"
            src="/img/logo.png"
            width="55"
            height="55"
            className="d-inline-block align-tod-inline-block align-to float"
            onClick={unHiddenInfo}
          />{' '}

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link float text-nav" to="/" style={{fontWeight: '700' ,fontSize:'20px', marginRight:'19px' , lineHeight:'20px'}}>Trang chủ</Link>
                
                {categories.map(c => {
                  let path = `/?category_id=${c.id}`
                  return <Link className="nav-link float text-nav" style={{fontWeight: '400'}} onClick={hiddenInfo} to={path} key = {c.id}>{c.name}</Link>
                })
                }

              </Nav>
                <Form className="d-flex from-search" onSubmit={search}>
                  <div><FormControl
                      type="search"
                      placeholder="Search..."
                      className="mr-3"
                      aria-label="Search"
                      value={q}
                      onChange={(event) => setQ(event.target.value)}
                  /></div>
                  <button type="submit" className = "button-search"><FontAwesomeIcon icon={faSearch}/></button>
                </Form>
              <a href="https://www.facebook.com/lq.lam21/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} id="icon-nav"/></a>
              <a href="https://github.com/Lqlam2102" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} id="icon-nav"/></a>

              {path}
            </Navbar.Collapse>
            
      </Container>
    </Navbar>
      </>
    )
    
}