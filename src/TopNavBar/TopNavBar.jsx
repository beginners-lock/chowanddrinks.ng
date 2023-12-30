import React, {useState} from 'react';
import './TopNavBar.css';
import { theme } from '../theme';

export default function TopNavBar(props) {
    const [docked, setDocked] = useState(true);

    const logout = () => {
        sessionStorage.removeItem('cadnguser');
        //Clear order too
        //....
        setDocked(true);
        props.unsetUser();
    }
    
    return (
        <div id="TopNavBar">
            <div id="TNBleft">
                <div id="TNBlogo"></div>
                chowanddrinks.ng
            </div>

            <div id="TNBmiddle">
                <div className='TNBopts' onClick={()=>{props.changeTab('home');}}>
                    <div style={{color: props.activetab==='home'?theme.red1:theme.black1}}>Home</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='home'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('order');}}>
                    <div style={{color:props.activetab==='order'?theme.red1:theme.black1}}>Order</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='order'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('aboutus');}}>
                    <div style={{color:props.activetab==='aboutus'?theme.red1:theme.black1}}>About Us</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='aboutus'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('history');}}>
                    <div style={{color:props.activetab==='history'?theme.red1:theme.black1}}>History</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='history'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('notification');}}>
                    <div style={{color:props.activetab==='notification'?theme.red1:theme.black1, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        Notifications
                        <div style={{display:props.newnotifics?'flex':'none', width:'8px', height:'8px', backgroundColor:'#F00000', borderRadius:'50%', marginLeft:6}}></div>
                    </div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='notification'?theme.red1:theme.transparent}}></div>
                </div>
                
            </div>

            <div id="TNBright" style={props.activeuser===null?{backgroundColor:'red', color:'white', padding:'10px 25px', borderRadius:'20px'} : {backgroundColor:'white', border:'1px red solid', color:'red', borderRadius:'40px', padding:'5px' }} onClick={()=>{props.activeuser===null?props.changeTab('authentication'):setDocked(!docked);}}>
                <div id="TNBaccountpic" style={{display:props.activeuser===null?'none':'flex'}}>
                    {props.activeuser!==null?props.activeuser.email[0].toUpperCase():''}
                </div>
                <div id='TNBsignin'>{props.activeuser===null ? 'Sign in' : props.activeuser.email.length>15?props.activeuser.email.slice(0, 15)+'...':props.activeuser.email}</div>
            </div>

            <div id="TNBdocker" style={{display:props.activeuser!==null && window.innerWidth>=1200 ?'flex':'none', right:!docked?'45px':-window.innerWidth*0.5}}>
                <div onClick={()=>{ setDocked(true); props.changeTab('changepassword');}}>Change password</div>
                <div style={{color:'red'}} onClick={()=>{logout();}}>Logout</div>
            </div>

            <div id='TNBburger' onClick={()=>{ props.changeDropdown(!props.dropdown) }}>
                <img id="burgericon" src="burger.png" alt="burger"/>
                <div id='burgeralert' style={{display:props.newnotifics?'flex':'none'}}></div>
            </div>
        </div>
    );
}