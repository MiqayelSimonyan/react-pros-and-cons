import React, { useEffect, useState, useCallback, memo, lazy } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import api from '../../services/api';
import Loader from '../common/loader';
const List = lazy(() => import(/* webpackChunkName: "pros-and-cons-content" */ './list'));

import './style.scss';

const ProsAndCons = ({ title }) => {
    const [loading, setLoading] = useState(true);
    const [groupId, setGroupId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [prosData, setProsData] = useState([]);
    const [consData, setConsData] = useState([]);

    useEffect(() => {
        (async () => {
            let response = await Promise.all([
                api('group/mikayel_simonyan').catch(err => err.message),
                api('user/mikayel_simonyan').catch(err => err)
            ]);

            if (response?.length && response[0]?.data && response[1]?.data) {
                const { data: { groupId } } = response[0];
                const { data: { userId } } = response[1];

                setGroupId(groupId);
                setUserId(userId);

                try {
                    let { data: { cons, pros } } = await api(`proscons/group/${groupId}/user/${userId}`);
                    if (pros && cons) {
                        setProsData(pros.map(item => ({ id: uuidv4(), value: item })));
                        setConsData(cons.map(item => ({ id: uuidv4(), value: item })));
                        setLoading(false);
                    };
                } catch (err) {
                    toast.error(err.message);
                };
            };
        })();
    }, []);

    const updateProsCons = async ({ pros, cons }) => {
        try {
            let { data } = await api.put(
                `proscons/group/${groupId}/user/${userId}`,
                {
                    pros: pros.map(item => item.value),
                    cons: cons.map(item => item.value)
                }
            );
            return data;
        } catch (err) {
            toast.error(err.message);
        };
    };

    const addData = async (value, type) => {
        let dataCopy = [];
        type === 'Pros' ? dataCopy = [...prosData] : dataCopy = [...consData];

        if (value) {
            let newItem = { id: uuidv4(), value };
            let prosCons = await updateProsCons({
                pros: type === 'Pros' ? [...dataCopy, newItem] : prosData,
                cons: type === 'Cons' ? [...dataCopy, newItem] : consData
            });

            if (prosCons) {
                if (type === 'Pros') {
                    setProsData([...dataCopy, newItem])
                } else {
                    setConsData([...dataCopy, newItem]);
                };
            };
        };
    };

    const updateData = async (id, value, type) => {
        let dataCopy = [];
        type === 'Pros' ? dataCopy = [...prosData] : dataCopy = [...consData];

        let foundedProsIndex = dataCopy.findIndex(data => data.id === id);

        if (foundedProsIndex !== -1 && dataCopy[foundedProsIndex].value !== value) {
            dataCopy[foundedProsIndex].value = value;

            let prosCons = await updateProsCons({
                pros: type === 'Pros' ? dataCopy : prosData,
                cons: type === 'Cons' ? dataCopy : consData
            });

            if (prosCons) type === 'Pros' ? setProsData(dataCopy) : setConsData(dataCopy);
        };
    };

    const removeData = async (id, type) => {
        let dataCopy = [];
        type === 'Pros' ? dataCopy = [...prosData] : dataCopy = [...consData];
        let foundedProsIndex = dataCopy.findIndex(data => data.id === id);

        if (foundedProsIndex !== -1) {
            dataCopy.splice(foundedProsIndex, 1);

            let prosCons = await updateProsCons({
                pros: type === 'Pros' ? dataCopy : prosData,
                cons: type === 'Cons' ? dataCopy : consData
            });

            if (prosCons) {
                type === 'Pros' ? setProsData(dataCopy) : setConsData(dataCopy);
            };
        };
    };

    return loading ? <Loader /> :
        <div className='pros-and-cons flex column'>
            <div className='title flex horizontal-center'>
                <h2>{title}</h2>
            </div>

            <div className='content flex'>
                <List
                    title='Pros'
                    data={prosData}
                    addData={addData}
                    updateData={updateData}
                    removeData={removeData}
                />
                <List
                    title='Cons'
                    data={consData}
                    addData={addData}
                    updateData={updateData}
                    removeData={removeData}
                />
            </div>
        </div>
};

export default memo(ProsAndCons);