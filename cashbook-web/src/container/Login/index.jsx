import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import Captcha from "react-captcha-code"
import CustomIcon from '@/components/CustomIcon'
import {post} from '@/utils'

import s from './style.module.less'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [type, setType] = useState('login')

  const handleChange = useCallback((captcha) => {
    console.log('captcha', captcha)
    setCaptcha(captcha)
  }, []);

  const onSubmit = () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    if (type == 'login') {
      post('/api/user/login', {
        username,
        password
      }).then((res) => {
        localStorage.setItem('token', res.data.token);
        Toast.show('登录成功')
        navigate('/user')
      }).catch(err => {
        Toast.show(err.msg || '系统错误');
      })
    } else {
      if (!verify) {
        Toast.show('请输入验证码')
        return
      };
      if (verify != captcha) {
        Toast.show('验证码错误')
        return
      };
      post('/api/user/register', {
        username,
        password
      }).then(() => {
        Toast.show('注册成功');
        setType('login');
      }).catch(err => {
        Toast.show(err.msg || '系统错误');
      })
    }
  };

  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="icon-zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="icon-mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type == 'register' ? <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value) => setVerify(value)}
          />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell> : null
      }
    </div>
    <div className={s.operation}>
    {
      type == 'register' ? <div className={s.agree}>
        <Checkbox />
        <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
      </div> : null
    }
    <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
  </div>
  </div>
}

export default Login