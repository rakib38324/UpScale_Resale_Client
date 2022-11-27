import React, { useContext } from 'react';
import ChooseBrand from '../Banner/ChooseBrand';
import Banner from '../Banner/Banner';
import Brand from '../Brand/Brand';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const Home = () => {

    const {loading} = useContext(AuthContext)

    if(loading){
        <Loading></Loading>
    }

    return (
        <div>
            <Banner></Banner>
            <ChooseBrand></ChooseBrand>
        </div>
    );
};

export default Home;