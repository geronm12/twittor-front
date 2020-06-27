import React,{useState, useEffect} from 'react';
import {getUserApi} from "../../api/user";
import {Media, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_HOST} from "../../utils/constant";
import AvatarNoFound from "../../assets/png/no-img.png";

export default function User(props) {
    
    const {user} = props;
    
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if(user?.id){
            getUserApi(user.id).then(response => {
                setUserInfo(response);
            }).catch(err => {
                setUserInfo(null);
            })
        }

    }, [user])


    return (
      <Media as = {Link} to={`/${user.id}`} className="list-users__user">
          <Image width={64} height={64} roundedCircle className="mr-3"
            src={ userInfo?.avatar 
                ?   `${API_HOST}/obtenerAvatar?id=${user.id}` :
                AvatarNoFound
            }

            alt={`${user.nombre} ${user.apellidos}`}
          />

          <Media.Body>
              <h5>
                {user.nombre} {user.apellidos}
              </h5>
              <p>
                  {userInfo?.biografia}
              </p>
          </Media.Body>
      </Media>
    )
}
