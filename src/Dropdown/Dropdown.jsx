import React, { useState } from 'react'
import './Dropdown.css';

export default function Dropdown(props) {
    const [device, setDevice] = useState( (window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop' ); 

    return (
        <div id="Dropdown" style={{right: props.dropdown && device!=='laptop' ? device==='mobile'? '10px' : '35px' : -(window.innerWidth*0.7)  }}>
            <div className='Dopts' onClick={()=>{props.changeTab('home'); props.changeDropdown(false);}}>Home</div>
            <div className='Dopts' onClick={()=>{props.changeTab('order'); props.changeDropdown(false);}}>Order</div>
            <div className='Dopts' onClick={()=>{props.changeTab('rentachef'); props.changeDropdown(false);}}>Rent-a-chef</div>
            <div className='Dopts' onClick={()=>{props.changeTab('history'); props.changeDropdown(false);}}>History</div>
            <div className='Dopts' style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}} onClick={()=>{props.changeTab('notification'); props.changeDropdown(false);}}>Notifications<div style={{width:'8px', height:'8px', backgroundColor:'#F00000', borderRadius:'50%', marginLeft:6}}></div></div>
            <div id='Dbtm'>
                <div id='Dsignin'>Sigin</div>
                <div id='Daccount'></div>
            </div>
        </div>
    )
}
