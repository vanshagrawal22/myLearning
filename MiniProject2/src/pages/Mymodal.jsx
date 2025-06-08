import { useEffect } from "react";
import ReactDOM from "react-dom"
const Mymodal = ({ children, onClose }) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{
            // clean up function
            document.body.style.overflowY="scroll"
        }
    },[])
    return ReactDOM.createPortal(
      <div className="modal-backdrop">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  };
export default Mymodal