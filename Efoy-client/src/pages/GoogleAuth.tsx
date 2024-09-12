import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setAuth } from "../redux/slices/authSlice"

const GoogleAuth = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        const username = searchParams.get('username');
        const role = searchParams.get('role');

        if(username && role){
            dispatch(setAuth({username, role}))
            navigate('/dashboard')
        }

        // if()

    }, [])
  return (
    <div>

    </div>
  )
}

export default GoogleAuth