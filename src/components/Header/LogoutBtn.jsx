import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { Button } from "@/components/ui/button"

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <Button
    className='flex ml-auto inline-bock px-6 py-2 duration-200 hover:text-red-500 square-full '
    onClick={logoutHandler}
    >Logout</Button>
  )
}

export default LogoutBtn