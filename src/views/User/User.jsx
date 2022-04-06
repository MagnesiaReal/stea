import {useEffect, useState} from 'react';

import ProfileDashboard from '../Dashboard/myProfile/ProfileDashboard';
import GroupsDashboard from '../Dashboard/myGroups/GroupsDashboard';
import ActivitiesDashboard from '../Dashboard/myActivities/ActivitiesDashboard';

import AXIOS from '../../components/http-axios'


export default function User (props) {
  
  
  return(
    <div className='stea-dashboard-contenedor'>
      <ProfileDashboard/>
      <GroupsDashboard/>
      <ActivitiesDashboard />
    </div>
  );
  
}
