import React, { useState, useContext, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import './NewHome.css';
import Chat from "../Chat";
import Search from "../Components/Search";
import { SocketContext } from '../context/SocketContext';
import { UserContext } from "../context/UserContext";
import Chatlog from "../Components/Chatlog";
import useWindowDimensions from "../Components/Dimensions";
import Default from "./Default";
import Input from "../Input";
import NewInput from "../Components/NewInput";
export default function NewHome() {
  const [user, setUser] = useState()
  const [room, setRoom] = useState("")
  const  {current} = useContext(UserContext);
  const Navigate = useNavigate();
   const  dimension = useWindowDimensions();
  const [message, setMessage] = useState([]);
  
  const { socket } = useContext(SocketContext);
  let min = new Date().getMinutes();
  let hr = new Date().getHours();
  const [data, setdata] = useState(null);
  const [users1, setusers] = useState();
 
  useEffect(() => {
    const url = `http://localhost:8000/register/contacts`;
    const fetchdata = async () => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.status === 200){
        const json = await response.json();
        console.log(json);
         setdata(json);
      }else{
        const json = await response.json();
        console.log(json);
            Navigate("/signin");
      }
     
    }
    fetchdata();
  }, [])
  useEffect(() => {
    setusers(data);
  }, [data])
  if (min < 10) {
    min = "0" + min;
  }

  const onClickChat=(d)=>{
    document.getElementById("main").style.display = "block";
  }

  useEffect(() => {
    
    if (room) {
      socket.emit("join_chat", { room: room, user: current.username });
    }
  }, [room])
  
  
  return (
    <div className="home">

      <section className="main-view">

        <aside className="chat-rooms">
          <Search />
          <div className="logs">
            {// document.getElementById("main").style.display = "block";
              Array.isArray(users1) && users1.map((d) => {
                return (
                  <Chatlog data={d} setRoom={setRoom} setUser={setUser} onClick={(d)=>onClickChat(d)} />
                )
              })
            }
          </div>

        </aside>
    {dimension.width >600 ? <> {user? 
      <>
    <main className="chat" id="main">
          <Chat message={message} setMessage={setMessage} user={user} room={room} />
          
        </main>
        <NewInput setMessage={setMessage} room={room} user={user}/>
        </>
        :<Default/>} </>  : 
        <>
        <main className="chat" id="main">
        <Chat message={message} setMessage={setMessage} user={user} room={room} />
      </main>
         <NewInput setMessage={setMessage} room={room} user={user}/>
      </>}
        
      </section>
    </div>
  )
  //finally grid laggayi yay
}