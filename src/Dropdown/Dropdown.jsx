import React, { useState } from 'react'
import './Dropdown.css';

export default function Dropdown(props) {
    const [device, setDevice] = useState(''); 

    const signin = () => {
        //Set thte initial width of the device
        setDevice((window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop');
        
        if(props.activeuser===null){
            props.changeDropdown(false);
            props.changeTab('authentication');
        }
    }

    const logout = () => {
        sessionStorage.removeItem('cadnguser');
        //Clear order too
        //....
        props.changeDropdown(false);
        props.unsetUser();
    }

    return (
        <div id="Dropdown" style={{top: props.dropdown? device==='mobile'? '55px' : '90px' : -(window.innerHeight) }}>
            <div className='Dopts' onClick={()=>{props.changeTab('home'); props.changeDropdown(false);}} style={{color:props.activetab==='home'?'red':'black'}}>Home</div>
            <div className='Dopts' onClick={()=>{props.changeTab('order'); props.changeDropdown(false);}} style={{color:props.activetab==='order'?'red':'black'}}>Order</div>
            <div className='Dopts' onClick={()=>{props.changeTab('rentachef'); props.changeDropdown(false);}} style={{color:props.activetab==='rentachef'?'red':'black'}}>Rent-a-chef</div>
            <div className='Dopts' onClick={()=>{props.changeTab('history'); props.changeDropdown(false);}} style={{color:props.activetab==='history'?'red':'black'}}>History</div>
            <div className='Dopts' style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', color:props.activetab==='notification'?'red':'black'}} onClick={()=>{props.changeTab('notification'); props.changeDropdown(false);}}>
                Notifications
                <div style={{display:props.newnotifics?'flex':'none', width:'8px', height:'8px', backgroundColor:'#F00000', borderRadius:'50%', marginLeft:6}}></div>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', boxSizing:'border-box'}}>
                <div id='Dbtm'  onClick={()=>{signin();}} 
                    style={
                        props.activeuser===null? 
                            device==='mobile'?
                                {backgroundColor:'red', color:'white', padding:'8px 0px', borderRadius:'8px'}
                            :   {backgroundColor:'red', color:'white', padding:'15px 0px', borderRadius:'10px'}
                        :   device==='mobile'?
                                {backgroundColor:'white', border:'1px red solid', color:'red', borderRadius:'30px', padding:'5px' }
                            :   {backgroundColor:'white', border:'1px red solid', color:'red', borderRadius:'30px', padding:'10px 8px' }}>
                    <div id='Daccount' style={{display:props.activeuser===null?'none':'flex'}} >{props.activeuser!==null?props.activeuser.email[0].toUpperCase():''}</div>
                    <div id='Dsignin'>
                        {props.activeuser===null ? 'Sign in' : props.activeuser.email.length>25?props.activeuser.email.slice(0, 25)+'...':props.activeuser.email}
                    </div>
                </div>
                <div id="dropdownspecial" style={{display:props.activeuser!==null?'flex':'none'}} onClick={()=>{props.changeDropdown(false); props.changeTab('changepassword');}}>Change password</div>
                <div id="dropdownspecial" style={{display:props.activeuser!==null?'flex':'none',  color:'red'}} onClick={()=>{logout();}}>Logout</div>
            </div>
        </div>
    )
}
