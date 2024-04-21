import { useEffect, useState } from 'react';
import History from "../components/history/History";
import Dialog from "../components/dialog/Dialog";
import styles from './homeview.module.scss';
import api from '../api/api';

export default function HomeView(){
    const [userData, setUserData] = useState({ remainingRequests: 0 });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/retrieve');
                setUserData({ remainingRequests: response.data.remaining_requests });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return(
        <section className={`${styles.section} ${styles.content__container}`}>
            <History />
            <Dialog remainingRequests={userData.remainingRequests} />
        </section>
    );
}
