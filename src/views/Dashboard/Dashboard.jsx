import React from 'react'

import ProfileDashboard from './myProfile/ProfileDashboard'
import GroupsDashboard from './myGroups/GroupsDashboard'
import ActivitiesDashboard from './myActivities/ActivitiesDashboard';

import './Dashboard.css'


const Dashboard = () => {
  return (
    <div className='stea-dashboard-contenedor'>
      <ActivitiesDashboard />
      <GroupsDashboard/>
      <ProfileDashboard/>
    </div>
  )
}

export default Dashboard