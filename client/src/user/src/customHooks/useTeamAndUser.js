import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import adminTeamApi from '../api/AdminTeamApi';
import { setTeam } from '../redux/features/teamSlice';
import { setTeamUser } from '../redux/features/teamUserSlice';

const useTeamAndUser = () => {
    const [teamId, setTeamId] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const getTeamAndUser = async () => {
            try{
                const res = await adminTeamApi.getTeamAndUser({ teamId });
                dispatch(setTeam(res[0]));
                dispatch(setTeamUser(res[1]));

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        getTeamAndUser();
    }, []);
}

export default useTeamAndUser