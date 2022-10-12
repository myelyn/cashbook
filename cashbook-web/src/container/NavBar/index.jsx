import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { TabBar } from "zarm";
import PropTypes from 'prop-types'
import CustomIcon from '@/components/CustomIcon'
import s from './style.module.less'

const NavBar = ({ showNav }) => {
  const [activityKey, setActivityKey] = useState('/')
  const navigateTo = useNavigate()
  const changeTab = (path) => {
    setActivityKey(path)
    navigateTo(path)
  }
  return (
    <TabBar visible={showNav} className={s.tab} activeKey={activityKey} onChange={changeTab}>
      <TabBar.Item 
        itemKey={'/'}
        title="账单"
        icon={<CustomIcon type="icon-zhangdan1" />}
      />
      <TabBar.Item 
        itemKey={'/data'}
        title="统计"
        icon={<CustomIcon type="icon-tongji" />}
      />
      <TabBar.Item 
        itemKey={'/user'}
        title="我的"
        icon={<CustomIcon type="icon-wodewo" />}
      />
    </TabBar>
  )
}

NavBar.propTypes = {
  showNav: PropTypes.bool
}

export default NavBar