import React, {useEffect} from 'react';
import toast, {Toaster, useToaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import {RootState} from "../../store/reducers";

const StatusIndicator = () => {
    const status = useSelector((state: RootState) => state.userData.status);
    // @ts-ignore
    const {error, success, loading} = useToaster();

    // @ts-ignore
    useEffect(() => {
        switch (status) {
            case 'loading':
                toast.loading('Loading...');
                break;
            case 'succeeded':
                toast.success('Success!');
                break;
            case 'failed':
                toast.error('Error!');
                break;
            default:
                break;
        }
    }, [status, error, success, loading]);

    // Повертаємо null, оскільки цей компонент не відображає DOM
    return (
        <>
            <Toaster/>
        </>
    )
};

export default StatusIndicator;
