import appRoutes from "./routes/Routes";
import { useRoutes } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUserAuth, setUserType } from "./slices/userSlice";
function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login", { replace: true })
      }
      else {
        dispatch(setUserType({
          type: user.displayName
        }))
        dispatch(setUserAuth({
          userAuth: {
            email: user.email,
            displayName: user.displayName,
            uid: user.uid
          }
        }))
      }
    })
    return () => unsubscribe
  }, [auth.currentUser])



  const routes = useRoutes(appRoutes)
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <Navbar />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
