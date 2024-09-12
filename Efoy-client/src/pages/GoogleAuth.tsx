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


    }, [])
  return (
    <div className="flex justify-center items-center">
        <h1 className="text-red text-3xl font-medium">Error signing you in with google</h1>

    </div>
  )
}

export default GoogleAuth