import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Capcha() {


  const [captchaResult, setCaptchaResult] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Handle form submission here

  }

     const handleRecaptcha = (value) => {
        console.log(value);
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

  return (
    <div className="container">

      <form onSubmit= {handleSubmit}>

        <div className="cta">
          <ReCAPTCHA
            sitekey="6Ldir2IgAAAAAD2HDuEoQhlOLn0lHc-zbroRwo64"
            onChange={handleRecaptcha}
          />
          {/* <div class="g-recaptcha" data-sitekey="{{key}}" data-callback="correctCaptcha"></div> */}
          {
             captchaResult && <button type='submit'>Submit</button>
          }
        </div>
  </form>
</div>
  );
}
