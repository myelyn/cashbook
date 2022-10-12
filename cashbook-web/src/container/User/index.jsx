import React, { useEffect, useState } from "react";
import {get} from '@/utils'
import s from './style.module.less'

export default function User() {
  const [username, setUsername] = useState('')
  const getUserInfo = () => {
    get('/api/user/get_userinfo').then(res => {
      setUsername(res.data.username)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className={s.user}>
      welcome, {username}
    </div>
  )
}