import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)


    useEffect(() => {
        // TODO: Make it easier

        // if(authStatus === true){
        //     navigate('/');
        // } else if(authStatus === false){
        //     navigate('/login');
        // }

        if(authentication && authStatus !== authentication){
            navigate('/login')
        } else if(!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [navigate, authStatus, authentication])

  return loader? <h1>Loading...</h1> : <>{children}</>
}
