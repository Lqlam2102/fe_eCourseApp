import { useRef, useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import Apis, { endpoints } from "../configs/Apis";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getParent,toast } from "../reducers/function.js"
import ReCAPTCHA from "react-google-recaptcha";




export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [captchaResult, setCaptchaResult] = useState()
    const [eye, setEye] = useState(<FontAwesomeIcon icon={faEye} id = "toggler" className="hidden"/>)
    const [eyeConfirm, setEyeConfirm] = useState(<FontAwesomeIcon icon={faEye} id = "toggler-confirm" className="hidden"/>)
    const avatar = useRef()
    const history = useHistory()
    
    let handleClickToLogin = (e)=> {
        e.preventDefault();
        if (username === '' && password === '' && email === '') {
            history.push("/login")
        }
        else{
            if (window.confirm("Bạn đang nhập dữ liệu đăng ký, bạn có chắc muốn chuyển sang chế độ đăng nhập") === true) {
                history.push("/login")
            }
        }
    }
    const handleRecaptcha = (value) => {
       fetch('http://127.0.0.1:8000/recaptcha/', {
         method: 'POST',
         body: JSON.stringify({ 'captcha_value': value }),
         headers: { 'Content-Type': 'application/json' }
       })
        .then(res => res.json())
        .then(data => {
          console.log(data.captcha.success)
          setCaptchaResult(data.captcha.success)
        }) 
     }
    
    useEffect (() => {
        const usernameElement = document.getElementById("username")
        const emailElement = document.getElementById("email")
        const passwordElement = document.getElementById("password")
        const confirmPasswordElement = document.getElementById("confirm-password")
        const loadingElement = document.querySelector(".loading-check-exist-user")
        
        const togglerElement = document.getElementById("toggler")
        const showHidePassword = (e) => {
            e.stopImmediatePropagation();
            if (passwordElement.type === 'password') {
              passwordElement.setAttribute('type', 'text');
              setEye(<FontAwesomeIcon icon = {faEyeSlash} id = "toggler"/>)
            } else {
              setEye(<FontAwesomeIcon icon = {faEye} id = "toggler"/>)
              passwordElement.setAttribute('type', 'password');
            }
          };
        togglerElement.addEventListener('click', showHidePassword);
        const eyeConfirmElement = document.querySelector('#toggler-confirm');
        const showHidePasswordConfirm = (e) => {
            e.stopImmediatePropagation();
            if (confirmPasswordElement.type === 'password') {
                confirmPasswordElement.setAttribute('type', 'text');
                setEyeConfirm(<FontAwesomeIcon icon = {faEyeSlash} id = "toggler-confirm"/>)
            } else {
                setEyeConfirm(<FontAwesomeIcon icon = {faEye} id = "toggler-confirm"/>)
              confirmPasswordElement.setAttribute('type', 'password');
            }
          };
          eyeConfirmElement.addEventListener('click', showHidePasswordConfirm);
        async function checkExistUsername(){
            try {
                loadingElement.classList.remove("hidden")
                let res = await Apis.get(endpoints["check-exist-user"], {
                    headers: {
                        "username": username
                    }
                })
                console.log(res.data);
                loadingElement.classList.add("hidden")
                if (res.data  === "exist") {
                    return "exist";
                }
                else{
                    return "not exist";
                }

            } catch (err) {
                console.error(err)
                loadingElement.classList.add("hidden")
                return "error"
            }
        }
        usernameElement.onblur = async () =>{
            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            let messageError = ''
            const parentElement = getParent(usernameElement,".form-group")
            const messageElement = parentElement.querySelector(".form-message")
           if(username.length === 0) {
                parentElement.classList.add("invalid")
                messageError = "Vui lòng nhập tên đăng nhập!"
           }
           else if(format.test(username)){
                parentElement.classList.add("invalid")
                messageError = "Tên đăng nhập không được phép chứa ký tự đặc biệt!"
            }
            else if(username.length <=6){
                parentElement.classList.add("invalid")
                messageError = "Tên đăng nhập phải chứa ít nhất 6 ký tự!"
            }
            else {
                let checkExist = await checkExistUsername()
                if (checkExist === "exist"){
                    parentElement.classList.add("invalid")
                    messageError = "Tên đăng nhập đã tồn tại!"
                }
                else if (checkExist === "error"){
                    messageError = "Đã có lỗi từ phía máy chủ!"
                }
            }
        messageElement.innerText = messageError
    }
        emailElement.onblur = () =>{
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                const parentElement = getParent(emailElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Email không hợp lệ!"       
           }
        }
        passwordElement.onblur = () =>{
            const parentElement = getParent(passwordElement,".form-group")
            // eyeElement.classList.add("hidden")
            if (password.length < 6) {
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Mật khẩu phải lớn hơn 6 ký tự!"       
           }
        }
        confirmPasswordElement.onblur = () =>{
            const parentElement = getParent(confirmPasswordElement,".form-group")
            const messageElement = parentElement.querySelector(".form-message")
            let messageError = ''
            if (confirmPassword !== password) {
                parentElement.classList.add("invalid")
                messageError = "Mật khẩu nhập lại không chính xác!"       
           }
           else if (confirmPassword.length === 0) {
                messageError = "Không được phép bỏ trống!"
                parentElement.classList.add("invalid")
           }
           messageElement.innerText = messageError
        }

    })
    //TODO: TOAST

      
    const register = (event) => {
        event.preventDefault()
        const usernameElement = document.getElementById("username")
        const emailElement = document.getElementById("email")
        const passwordElement = document.getElementById("password")
        const confirmPasswordElement = document.getElementById("confirm-password")
        
        let registerUser = async () => {
            const formData = new FormData()
            formData.append("email", email)
            formData.append("password", password)
            formData.append("username", username)
            formData.append("avatar", avatar.current.files[0])
            

            try {
                let res = await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(res);
                toast({
                    title: "Thành công!",
                    message: "Bạn đã đăng ký thành công tài khoản tại EcourseApp.",
                    type: "success",
                    duration: 5000
                  });
                history.push("/login")
            } catch (err) {
                console.error(err)
                window.c = err
                if(err.message === 'Network Error'){
                    alert("Máy chủ không phản hồi")
                }
                else if (err.message === 'Request failed with status code 429'){

                }
                toast({
                    title: "Thất bại!",
                    message: "Có lỗi xảy ra, vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000
                  });
            }
            
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ||
        username.length <=6||
        password.length <6||
        confirmPassword !== password||
        confirmPassword.length ===0 || 
        !captchaResult
        ){
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                const parentElement = getParent(emailElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Email không hợp lệ!"
            }
            if (username.length ===0){
                const parentElement = getParent(usernameElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Vui lòng nhập tên đăng nhập!"
            }
            if (username.length <=6){
                const parentElement = getParent(usernameElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Tên đăng nhập phải chứa ít nhất 6 ký tự!"
            }
            
            if (password.length <6){
                const parentElement = getParent(passwordElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")            
                messageElement.innerText = "Mật khẩu phải lớn hơn 6 ký tự!" 
            }
            if (confirmPassword !== password){
                const parentElement = getParent(confirmPasswordElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Mật khẩu nhập lại không chính xác!"
            }
            if (confirmPassword.length === 0){
                const parentElement = getParent(confirmPasswordElement,".form-group")
                parentElement.classList.add("invalid")
                const messageElement = parentElement.querySelector(".form-message")
                messageElement.innerText = "Không được phép bỏ trống!"
            }
            if (!captchaResult){
                toast({
                    title: "Thông báo!",
                    message: "Vui lòng xác nhận captcha!",
                    type: "error",
                    duration: 5000
                  });
            }
            else{
                toast({
                    title: "Cảnh báo!",
                    message: "Thông tin thiếu hoặc chưa chính xác!",
                    type: "warning",
                    duration: 5000
                  });
            }
        }
        else{
            registerUser()
        }
    }


  
    return (
        <>
         <div className="signUp-body" style ={{ minHeight: "800px"}} onSubmit={register}>
            <form className="signUp">
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
                    <Spinner className="loading-check-exist-user hidden" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                
                <div className="form-group">
                    <input id = "email" type="email" placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        const parentElement = getParent(event.target,".form-group")
                        parentElement.classList.remove("invalid")
                        const messageElement = parentElement.querySelector(".form-message")
                        messageElement.innerText = ""     
                    }}
                    className="form-control"
                    />
                    <span className="form-message"></span>
                </div>

                <div className="form-group password-field">
                    <input id = "password" type="password" placeholder="Password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        const parentElement = getParent(event.target,".form-group")
                        parentElement.classList.remove("invalid")
                        const messageElement = parentElement.querySelector(".form-message")
                        messageElement.innerText = ""
                        const eyeElement = parentElement.querySelector('#toggler')
                        if (event.target.value.length > 0) {
                            eyeElement.classList.remove("hidden")
                        }
                        else {
                            eyeElement.classList.add("hidden")
                        }
                        if (event.target.value === confirmPassword){
                            const parentElement = getParent(document.getElementById('confirm-password'),".form-group")
                            parentElement.classList.remove("invalid")
                            const messageElement = parentElement.querySelector(".form-message")
                            messageElement.innerText = ""
                        }
                    }}
                    
                    className="form-control"
                    />
                    <span className="form-message"></span>
                    <span>{eye}</span>
                </div>


                <div className="form-group password-field">
                    <input id = "confirm-password" type="password" placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        const parentElement = getParent(event.target,".form-group")
                        parentElement.classList.remove("invalid")
                        const messageElement = parentElement.querySelector(".form-message")
                        messageElement.innerText = ""
                        const eyeElement = parentElement.querySelector('#toggler-confirm')
                        if (event.target.value.length > 0) {
                            eyeElement.classList.remove("hidden")
                        }
                        else {
                            eyeElement.classList.add("hidden")
                        }
                    }}
                 
                    className="form-control"
                    />
                    <span className="form-message"></span>
                    <span>{eyeConfirm}</span>

                </div>


                <div className="form-group">
                    <input id = "avatar" type="file" 
                    ref = {avatar}
                    />

                </div>
              
                <div className="cta" style = {{margin: "1rem 0 1rem -.5rem"}}>
                    <ReCAPTCHA
                        sitekey="6Ldir2IgAAAAAD2HDuEoQhlOLn0lHc-zbroRwo64"
                        onChange={handleRecaptcha}
                    />
                </div>
                
                <button id = "button-login" onClick={handleClickToLogin} style={{marginRight: "1rem"}}>Login</button>
                <button  type="submit" id = "button-signUp" >Sign Up</button>
                {/* <button  type="submit" id = "button-signUp">Sign Up</button> */}
                

            </form>
        </div>
        </>
    )

}
