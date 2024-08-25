import React ,{useEffect,useState,createContext}from 'react';

export const UserContext = createContext();

export const UserContextProvider =(props)=>{
     const [current,setCurrent] = useState("");
     useEffect(()=>{
        async function getUserinfo(){
            const url = 'http://localhost:8000/register/getinfo';
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include',
            });
            const json = await response.json();
            setCurrent(json);
        }
        getUserinfo();
     },[])
    return(
        <UserContext.Provider value={{current}}>
            {props.children}
        </UserContext.Provider>
    )
}