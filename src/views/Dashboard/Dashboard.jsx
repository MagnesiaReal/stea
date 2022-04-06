import {useEffect, useState} from 'react'

import ProfileDashboard from './myProfile/ProfileDashboard'
import GroupsDashboard from './myGroups/GroupsDashboard'
import ActivitiesDashboard from './myActivities/ActivitiesDashboard';

import AXIOS from '../../components/http-axios'

import './Dashboard.css'

import Cookies from 'universal-cookie';


const Dashboard = () => {



  return (
    <div className='stea-dashboard-contenedor'>
      <ProfileDashboard/>
      <GroupsDashboard/>
      <ActivitiesDashboard />
    </div>
  )
}

export default Dashboard
