import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Zoombanner from'../Images/Zoombanner.jpg';
import {API_ASSIGNMENT_NOTIFICATION_URL,API_STUDENT_ATTEND_CLASS_URL,API_STUDENT_HOMEWORK_LIVECLASS_URL,API_LIVECLASS_ORAL_URL,API_LIVECLASS_HOME_ORAL_URL,API_STUDENT_ATTENDANCE_URL} from '../Services/api'
import { useLocation, useParams } from 'react-router-dom';
import Waitingclass from '../Components/Classmodules/Waitingclass';
import axios from 'axios';

import Stuedentclassworks from '../Components/Classmodules/Stuedentclassworks';
import Liveoral from '../Components/Classmodules/Liveoral';
import Liveclass from '../Components/Liveclass/Liveclass';
export default function Livetreaming() {
  

    const {id}=useParams();
    const user_id = localStorage.getItem('user_id');
    const assignmentIdFromStorage = localStorage.getItem('assignmentId');


  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const studentattendsetclassqry = await axios.get(`${API_STUDENT_ATTEND_CLASS_URL}/${user_id}/${id}`);
         console.log("attendance", studentattendsetclassqry.data.response);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData(); 
  
    }, []);


    const [stdorlafetch, setstdorlafetch]=useState([]);

    const assignolfech= async()=>{
     try{
      const assignolfechdet= await axios.get(`${API_LIVECLASS_ORAL_URL}/${user_id}/${id}`);
      setstdorlafetch(assignolfechdet.data.response);
    
     }catch(error){
      console.log(error);
     }

    }

    useEffect(()=>{
      assignolfech();
    },[])

    const[ oralds,setoralds]=useState("");
    const assignoralID=(oralID)=>{
      setoralds(oralID);
    //  alert(oralds);
    }

    const oraldatasend={ user_id, oralds};

     const [assignnotif,setAssignnotif]=useState([]);
    
     const assignmentNotification = async() => {
      Setcompodisplay("Stuedentclassworks");
        try {
          const assignmentNotificationresponse = await axios.get(`${API_ASSIGNMENT_NOTIFICATION_URL}/${user_id}/${id}`);
          setAssignnotif(assignmentNotificationresponse.data.response);
       //  console.log(assignmentNotificationresponse.data.response);
        } catch (error) {
          console.error(error);
        }
      }


      const [assignmentidd,Setassignmentidd]=useState("");

       const assignmentId=async(assid)=>{
        localStorage.removeItem("assignmentId");
        Setassignmentidd(assid)
        
      //  localStorage.setItem('assignmetId' ,assid);
       }

       const dataToSend = { user_id, assignmentidd};

       const [compodisplay,Setcompodisplay]=useState(null);
       const [studnethww,setstudnethww]=useState([]);
       const studentHW=async()=>{
      
        try{
        const studentHWqry=await axios.get(`${API_STUDENT_HOMEWORK_LIVECLASS_URL}/${user_id}/${id}`);
        setstudnethww(studentHWqry.data.response);
       
        //console.log(studnethww)
      }catch(error){
        console.error(error);
      }
      }

      // API_LIVECLASS_HOME_ORAL_URL

      const [hworal,sethworal]=useState();

      const studenthworal=async()=>{
        try{
        const  studenthworalqry=await axios.get(`${API_LIVECLASS_HOME_ORAL_URL}/${user_id}/${id}`);
        sethworal(studenthworalqry.data.response);
        console.log(hworal);
      }catch(error){
        console.log(error);
      }
      }

    
 //student attendance api

//  const [attendcls, setAttendcls] = useState([]);

//   const stdattendance = async () => {
//     try {
//       const response = await axios.get(`${API_STUDENT_ATTENDANCE_URL}/${user_id}/${id}`);
//       setAttendcls(response.data.res);
//       console.log(attendcls); // Log the state value directly
//     }catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     stdattendance();
//   }, []);

//Student attendance api 
const [attendcls, setAttendcls] = useState([]);
const [playlistID, setPlaylistID] = useState(null);
const location = useLocation();

useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const plid = searchParams.get('plid');
  if (plid) {
    setPlaylistID(plid); // Set playlistID state variable
  }
}, [location.search]);

useEffect(() => {
  const stdattendance = async () => {
    try {
      if (playlistID) {
        const response = await axios.get(`${API_STUDENT_ATTENDANCE_URL}/${id}/${user_id}/${playlistID}`);
        setAttendcls(response.data.res);
        console.log(`${API_STUDENT_ATTENDANCE_URL}/${id}/${user_id}/${playlistID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  stdattendance(); // Call stdattendance inside useEffect that depends on playlistID
}, [playlistID,attendcls]); // Trigger stdattendance when playlistID changes




  return (
    
    <>
   
       <Wrapper className='section section2'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-5 h-100'>
                <div className='jigsawlivesteaming'>
                {/* <img src={Zoombanner}></img> */}
                <Liveclass/>
               </div>
                </div>

                <div className="col-lg-7">
                {/*class assignmnet  compntens add}*/}
                {/* {compodisplay === null && assignmentIdFromStorage === null ? <Waitingclass/> : <Stuedentclassworks classworkdata={dataToSend}/>}
                 {assignmentIdFromStorage? null : compodisplay==="Stuedentclassworks" ? <Stuedentclassworks classworkdata={dataToSend}/>:null}
                {compodisplay==="Liveoral" ? <Liveoral/>:null} */}
                {/* {assignmentIdFromStorage? null:compodisplay === null  ? <Waitingclass/> : null } */}
                {/* {compodisplay==="Stuedentclassworks" ?  <Stuedentclassworks classworkdata={dataToSend}/>: assignmentIdFromStorage? <Stuedentclassworks classworkdata={dataToSend}/>:<Waitingclass/>} */}
                 {compodisplay==="Stuedentclassworks" ?  <Stuedentclassworks classworkdata={dataToSend}/>: <null/>}
                {compodisplay==="Liveoral" ? <Liveoral   Classoraldata={oraldatasend}/>:null}
            </div>


            <div className="col-md-12 my-4">
          <div className="row">
        <div className="col-md-12 shadow ">
          <ul className="nav nav-pills mb-2 bg-white border" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true" onClick={assignmentNotification}>
                Class Work
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false"  onClick={() => {Setcompodisplay('Liveoral')}}>
               Class Work Oral
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="pills-homeWork-tab" data-bs-toggle="pill" href="#pills-homeWork" role="tab" aria-controls="pills-homeWork" aria-selected="false" onClick={studentHW} >
              Home Work
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="pills-hworal-tab" data-bs-toggle="pill" href="#pills-hworal" role="tab" aria-controls="pills-hworal" aria-selected="false" onClick={studenthworal}>
                Home Work Oral
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" href="#pills-paper" role="tab" aria-controls="pills-paper" aria-selected="false">
                Student Paper
              </a>
            </li>
            {/* <li className="nav-item" role="presentation">
              <a className="nav-link" id="pills-contact-tab"  role="button"  aria-selected="false" onClick={stdattendance}>
                Student Attendance
              </a>
            </li> */}
           
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div className="row">
                <div className="col-md-12">
                  <div className="assign_assignment_table">
                    <form>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '150px' }}>Class Work Assignment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ width: '250px' }}>
                            <ul>
                            {assignnotif?.assignment_id?.map((assnote, index)=>{
                             return(
                                <li key={index}  onClick={() => assignmentId(assnote._id)} style={{cursor:"pointer"}}>
                                   <p>{index + 1}. {assnote.name}</p> 
                                  </li>
                              )
                            })}
                           </ul>
                              

                            </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="row">
                <div className="col-md-12">
                  <div className="assign_assignment_table">
                    <form>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '150px' }}>Class Work Oral</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ width: '250px' }}>
                            <ul>
                            {stdorlafetch?.assignment_id?.map((assnote, index)=>{
                            return(
                                <li key={index}  onClick={() => assignoralID(assnote._id)} style={{cursor:"pointer"}}>
                                   <p>{index + 1}. {assnote.name}</p> 
                                  </li>
                              )
                            })}
                           </ul>
                              

                            </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>

            </div>
            <div className="tab-pane fade" id="pills-homeWork" role="tabpanel" aria-labelledby="pills-homeWork-tab">
                            
            <div className="row">
                <div className="col-md-12">
                  <div className="assign_assignment_table">
                    <form>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '150px' }}>Student Home Work</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ width: '250px' }}>
                            <ul>
                            {studnethww?.assignment_id?.map((studnetass, index)=>{

                           
                              return(
                                <li key={index} >
                                   <p>{index + 1}. {studnetass.name}</p> 
                                  </li>
                              )
                            })}
                           </ul>
                              

                            </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
           
            </div>
            <div className="tab-pane fade" id="pills-hworal" role="tabpanel" aria-labelledby="pills-hworal-tab">
             
            <div className="row">
                <div className="col-md-12">
                  <div className="assign_assignment_table">
                    <form>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '150px' }}> Home Work Oral</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ width: '250px' }}>
                            <ul>
                            {hworal?.assignment_id?.map((studnhomeoralass, index)=>{

                          
                              return(
                                <li key={index} >
                                   <p>{index + 1}. {studnhomeoralass.name}</p> 
                                  </li>
                              )
                            })}
                           </ul>
                              
                            </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
           

            </div>
            <div className="tab-pane fade" id="pills-paper" role="tabpanel" aria-labelledby="pills-paper-tab">
              {/* Content for the 'Student Paper' tab */}
            </div>
          </div>
        </div>
      </div>
    </div>









            </div>
        </div>
    </Wrapper>


    
    
    </>
  )
}

const Wrapper=styled.section`
position:relative;
width:100%;
height:auto;

.jigsawlivesteaming{
   position:relative;
   width:100%;
   height:auto;
   overflow:hidden;
}

.iaformtable1 {
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    border: 1px solid #d0d2d4;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
     
    tr{
        background-color: #aae1fa;
  font-weight: bold;
    }
    td{
        text-align: center;
  width: 50px;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #aae1fa;
  font-weight: bold;
    }
  }

  .iaformtable2 {
    width: 100%;
    margin-top: 7px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin-left: auto;
    margin-right: auto;

    tr{
        background-color: #ededee;
    }
     td {
        text-align: center;
        padding-top: 7px;
        padding-bottom: 7px;
        width: 50px;
        border: 2px solid #fff !important;
      }
  }

  
    .iaformtable3 {
        width: 100%;
        margin-top: 7px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        height: 50px;

       tr td{
            text-align: center;
      width: 50px;
      padding: 0px;
      
      .canswer.textboxblur {
        width: 55px;
        height: 20px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        border: 1px solid #cccccc;
      }
         }
          
      }
    
  

.fw-small {
  font-weight: 600;

}
.jigsawlivesteaming img{
width:100%;
height:auto;
border-radius:5px;
}
.studentsteamingtask{
    position:relative;
    width:100%;
    height:auto;
    overflow:hidden;
    background:#e8e8e8;
    padding:10px 10px;
    border-radius:5px;
}
.iaformtable2 {
    width: 100%;
    margin-top: 7px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin-left: auto;
    margin-right: auto;
  }
.studentestemingoral{
    position:relative;
    background-color:#fff;
    padding: 5px;
p{
    font-weight:600;
}
}

`
