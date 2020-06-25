import React, {useState, useEffect} from 'react';
import {Button, Spinner} from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import {withRouter} from "react-router-dom";
import {getUserApi} from "../../api/user";
import {toast} from "react-toastify";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import useAuth from "../../hooks/useAuth";

import "./User.scss";

 function User(props) {
    
    const {match} = props;
    const [user, setUser] = useState(null);
    const {params} = match;
    const loggedUser = useAuth();

    useEffect(() => {
       getUserApi(params.id).then(response => {
           setUser(response);
           if(!response) toast.error("El usuario que has visitado no existe");
       }).catch(() => {
        toast.error("El usuario que has visitado no existe");
       });
    }, [params])



    return (
        <BasicLayout className="user">
          <div className="user__title">
          <h2>
              {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
          </h2>
          </div>  
          <div>
          <BannerAvatar user={user} loggedUser={loggedUser}/>
          </div>
          <InfoUser user={user}/>
          <div className="user__tweets">
              Lista de Tweets
          </div>
        </BasicLayout>
    )
}


export default withRouter(User);