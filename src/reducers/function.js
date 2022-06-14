import { faCheckCircle,faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCheckCircle, faExclamationCircle, faTimes)

export function getParent(element, selector) {
    let i = 0;
    while (element.parentElement && i<=5) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        i++;
        element = element.parentElement;
    }
    return element
}

export function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "check-circle",
        warning: "exclamation-circle",
        error: "exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast-custom", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
      ReactDOM.render(
          <>
           <div className="toast__icon">
                          <FontAwesomeIcon icon={icon}/>
                      </div>
                      <div className="toast__body">
                          <h3 className="toast__title">{title}</h3>
                          <p className="toast__msg">{message}</p>
                      </div>
                      <div className="toast__close">
                        <FontAwesomeIcon icon="times"/>
                      </div>
          </>,
          toast
    );
      main.appendChild(toast);
    }
  }