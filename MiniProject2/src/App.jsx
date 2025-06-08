
import "./App.css"
import Home from "./pages/Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import NewForm from "./pages/NewForm"
import CustomModal from "./pages/CustomModal"


const App = ()=>{
  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<SignUp/>
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      }, {
        path:"/newForm",
        element:<NewForm/>
      },
      {
        path:"/customModal",
        element:<CustomModal/>
      }
    ]
  )
  return (
    <RouterProvider router={router}/>
  )
}
export default App