
import {API_HOST, TOKEN} from "../utils/constant";
import jwtDeecode from "jwt-decode";
import JwtDecode from "jwt-decode";
import { identity } from "lodash";

export function signUpApi(user){

    const url = `${API_HOST}/registro`;
    
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: new Date()
    }

    delete userTemp.repeatPassword;
    
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(userTemp)
    };

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300){
            return response.json();
        }

        return {
            code: 404,
            mensaje: "Email en uso"
        }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })

}


export function signInApi(user){
    
    const url = `${API_HOST}/login`;
    
    const data = {
        ...user,
        email: user.email.toLowerCase()
    };

    const params = {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    
    return fetch(url, params).then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json()
        }
    
        return {
            mensaje: "Usuario o contraseña incorrectos"
        }
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    })

        



}

export function setTokenApi(token){
   localStorage.setItem(TOKEN, token);
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}


export function isUserLogedApi(){
    const token = getTokenApi();

    if (!token){
        return null;
    }

    if(isExpired(token)){
        logoutApi();
    }

    return JwtDecode(token);
    
}


function isExpired(token){
    const {exp} = JwtDecode(token);
    const expire = exp*1000;
    const timeout = expire - Date.now();

    if(timeout < 0){
        return true;
    }else{
        return false;
    }
}





    
    

