import { useRouteError, Link } from 'react-router';
import useStatus from '../../hooks/statushook/useStatus';
import Offline from "../Offline/Offline";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setResLoading } from '../../redux/slices/res/resSlice';
import "./Error.css"
import errorImgUrl from "url:../../assets/images/error.png";

const Error = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onlineStatus = useStatus();
    const pageError = useRouteError();
    dispatch(setResLoading(true));

    if (onlineStatus === false) {
        return <Offline />;
    }

    return (
        <div className='errorPage'>
            <div className='error-1'>
                <img src={errorImgUrl} alt="Error" />
            </div>
            <div className='error-2'>
                <h1>{pageError?.status}</h1>
                <h2>Oops, the page you are looking for is {(pageError?.statusText)?.toLowerCase()}</h2>
                <h3>{(pageError?.error?.message)?.slice(0, 50)}</h3>
                <button className='homebtn' onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Error;