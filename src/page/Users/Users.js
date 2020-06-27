import React, {useState, useEffect} from 'react'
import {Spinner, ButtonGroup, Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import {getFollowsApi} from "../../api/follow";
import {isEmpty, set} from "lodash";
import {useDebouncedCallback} from "use-debounce";

import ListUsers from "../../components/ListUsers";
import BasicLayout from "../../layout/BasicLayout";

import "./Users.scss";



function Users(props) {

    const {setRefreshCheckLogin, location, history} = props;
    const [users, setUsers] = useState(null);
    const params =  useUsersQuery(location);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [btnLoading, setBtnLoading] = useState(false);


    const [onSearch] = useDebouncedCallback(value => {
         setUsers(null);  
        history.push({search: queryString.stringify({
            ...params, search: value, page: 1      
            })})
    }, 200);


    const onChangeType = type => {
        setUsers(null);
        if(type === "new"){
            setTypeUser("new");
        } else {
            setTypeUser("follow");
        }

        history.push({
            search: queryString.stringify({type: type, page: 1, search:""})
        })
    }

    const moreData = () => {
        setBtnLoading(true);
        
        const newPage = parseInt(params.page) + 1;
        history.push({
            search: queryString.stringify({
                ...params, page: newPage
            })
        })
    }


    useEffect(() => {
         getFollowsApi(queryString.stringify(params))
        .then(response => {

            if(params.page == 1){
                if(isEmpty(response)){
                    setUsers([]);
                }else{
                    setUsers(response);
                }
            }else{
                if(!response){
                    setBtnLoading(0);
                }else{
                    setUsers([...users, ...response]);
                    setBtnLoading(false);
                }
            }

                

         
        }).catch(() => {
            setUsers([]);
        })
    }, [location])


    return (
       <BasicLayout title="Usuarios" className="users" setRefreshCheckLogin={setRefreshCheckLogin}>
            
        <div className="users__title">
            <h2>Usuarios</h2>
            <input
            onChange = {e => onSearch(e.target.value)} 
            type = "text" 
            placeholder="Busca un usuario..."/>
        </div>
        <ButtonGroup className="users__options">
        <Button
         className={typeUser === "follow" && "active"}
         onClick={() => onChangeType("follow")}>
            Siguiendo
        </Button>
        <Button 
        className={typeUser === "new" && "active"}
        onClick={() => onChangeType("new")}>
            Nuevos
        </Button>
        </ButtonGroup>
        {!users ? (
            <div className="users__loading">
                <Spinner animation="border" variant="info"/>
                Cargando Usuarios
           </div>
        ): <><ListUsers users={users}></ListUsers>
        <Button onClick={moreData} className="load-more">
        {!btnLoading ? (
            btnLoading !== 0 && "Cargar más usuarios"
        ):(
            <Spinner as="span" 
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            ></Spinner>
        )}
        </Button> </>}

       </BasicLayout>
    )
}


function useUsersQuery(location){

    const {page = 1, type = "follow", search = ""} = queryString.parse(location.search);
    

    return {
        page, type, search
    };

}




export default withRouter(Users);