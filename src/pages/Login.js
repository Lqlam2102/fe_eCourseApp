import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginUser } from "../ActionCreators/UserCreators";
import Apis, { endpoints } from "../configs/Apis";
import cookies from 'react-cookies'
import { useLocation } from "react-router"
import { Link } from "react-router-dom";
import { getParent,toast } from "../reducers/function.js"
import ReCAPTCHA from "react-google-recaptcha";

// import { Spinner } from "react-bootstrap";
// import Body from './../layouts/Body';



export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [lockLogin, setLockLogin] = useState(false)
    const [captchaValue,setCaptchaValue] = useState('')
    
    // var loginc = 0;
    const login = async (event) => {
            event.preventDefault()
            const usernameElement = document.getElementById('username')
            const passwordElement = document.getElementById('password')
    
            if(username.length === 0 || password.length ===0){
                // alert("Cần nhập đầy đủ cả Username và Password")
                if (username.length ===0){
                    const parentElement = getParent(usernameElement,".form-group")
                    parentElement.classList.add("invalid")
                    const messageElement = parentElement.querySelector(".form-message")
                    messageElement.innerText = "Vui lòng nhập tên đăng nhập!"
                }
                if (password.length ===0){
                    const parentElement = getParent(passwordElement,".form-group")
                    parentElement.classList.add("invalid")
                    const messageElement = parentElement.querySelector(".form-message")            
                    messageElement.innerText = "Vui lòng điền mật khẩu!" 
                }
                toast({
                    title: "Cảnh báo!",
                    message: "Bạn không được phép bỏ trống thông tin!",
                    type: "warning",
                    duration: 5000
                  });
            }
            // else if (lockLogin){
            //     toast({
            //         title: "Cảnh báo!",
            //         message: "Bạn không thể đăng nhập trong vài phút!",
            //         type: "warning",
            //         duration: 5000
            //       });
            // }
            else{
                const inputs = document.querySelectorAll('.login input')
    
            let pathContinue = location.search.split('?continue=')[1]

            if (pathContinue === '/register' || pathContinue === undefined) {
                pathContinue = '/'
            }
            // if (username === preUsername && loginCount == 3) {
            //     alert("Hãy thử đăng nhập lại sau 5 phút")
            // }
            // else{
                try {
                    inputs.forEach((input) => {
                        input.disabled = true;
                    })
                    let info = await Apis.get(endpoints['oauth2-info'])

                    let logout = await Apis.post(endpoints['check-log-out'],{
                            "username": username,
                            "recaptcha": captchaValue
                        });
                    console.log(logout.status);
                    
                    let res = await Apis.post(endpoints['login'],{
                        "client_id": info.data.client_id,
                        "client_secret": info.data.client_secret,
                        "username": username,
                        "password": password,
                        "grant_type": "password"
                    })
        
                    cookies.save("access_token", res.data.access_token)
        
                    let user = await Apis.get(endpoints['current-user'], {
                        headers: {
                            'Authorization': `Bearer ${cookies.load("access_token")}`
                        }
                    })
        
                    
                    cookies.save("user", user.data)
        
                    dispatch(loginUser(user.data)) 
                    
                    history.push(pathContinue)
                } catch(err) {
                    // console.error(err)
                    console.log(err.message);
                    window.c = err
                    if(err.message === 'Network Error'){
                        toast({
                            title: "Thất bại!",
                            message: "Có lỗi xảy ra, vui lòng thử lại sau.",
                            type: "error",
                            duration: 5000
                          });
                    }
                    else if(err.message === 'Request failed with status code 429'){
                        setLockLogin(true)
                            toast({
                            title: "Phát hiện đăng nhập bất thường!",
                            message: "Bạn không thể đăng nhập trong vài phút! Hoặc bạn có thể nhập captcha để tiếp tục đăng nhập.",
                            type: "warning",
                            duration: 5000
                  });
                    }
                    else{
                        // setPreUsername(username)
                        toast({
                            title: "Thất bại!",
                            message: "Tài khoản hoặc mật khẩu không chính xác.",
                            type: "error",
                            duration: 5000
                          });
                    }
                }
            // }
            inputs.forEach((input) => {
                input.disabled = false;
            })
            }
        }


    return(
        <>
        <div className="login-body" style ={{ minHeight: "800px"}}>
            <form className="login" onSubmit={login}>
                <div className="form-group">
                    <input id = "username" type="text" placeholder="Username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value)
                        const parentElement = getParent(event.target,".form-group")
                        parentElement.classList.remove("invalid")
                        const messageElement = parentElement.querySelector(".form-message")
                        messageElement.innerText = ""     
                    }}
                    className="form-control"
                    />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input id = "password" type="password" placeholder="Password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        const parentElement = getParent(event.target,".form-group")
                        parentElement.classList.remove("invalid")
                        const messageElement = parentElement.querySelector(".form-message")
                        messageElement.innerText = ""
                    }}
                    className="form-control"
                    />
                    <span className="form-message"></span>
                </div>
                {lockLogin &&<div className="cta">
                    <ReCAPTCHA
                        sitekey="6Ldir2IgAAAAAD2HDuEoQhlOLn0lHc-zbroRwo64"
                        onChange={(c)=>{setCaptchaValue(c)}}
                    />
                </div>}
                <button  type="submit" id = "button-login">Login</button>
                
                {/* {/* <span>Bạn chưa có tài khoản?</span>
                <br/> */}
                <Link to="/register" style={{marginLeft: "1rem"}}>
                    <button id = "button-signUp">Sign up</button>
                    </Link>
                {/* <Link to="/register">Đăng ký</Link> */}
            </form>

        </div>
        </>
    )
}