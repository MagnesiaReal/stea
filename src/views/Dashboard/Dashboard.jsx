import React from 'react'

import ProfileDashboard from './myProfile/ProfileDashboard'
import GroupsDashboard from './myGroups/GroupsDashboard'
import ActivitiesDashboard from './myActivities/ActivitiesDashboard';

const Dashboard = () => {
  return (
    <div>
      <GroupsDashboard/>
      <ProfileDashboard/>
      <ActivitiesDashboard />
    </div>
  )
}

export default Dashboard