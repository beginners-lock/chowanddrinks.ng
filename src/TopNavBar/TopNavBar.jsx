import React from 'react';
import './TopNavBar.css';
import { theme } from '../theme';

export default function TopNavBar(props) {

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

                <div className='TNBopts' onClick={()=>{props.changeTab('rentachef');}}>
                    <div style={{color:props.activetab==='rentachef'?theme.red1:theme.black1}}>Rent-a-chef</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='rentachef'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('history');}}>
                    <div style={{color:props.activetab==='history'?theme.red1:theme.black1}}>History</div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='history'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts' onClick={()=>{props.changeTab('notification');}}>
                    <div style={{color:props.activetab==='notification'?theme.red1:theme.black1, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>Notifications<div style={{width:'8px', height:'8px', backgroundColor:'#F00000', borderRadius:'50%', marginLeft:6}}></div></div>
                    <div className='TNBdivs' style={{backgroundColor:props.activetab==='notification'?theme.red1:theme.transparent}}></div>
                </div>
                
            </div>

            <div id="TNBright">
                <div id='TNBsignin'>Sign in</div>
                <div id="TNBaccountpic"></div>
            </div>

            <div id='TNBburger' onClick={()=>{ props.changeDropdown(!props.dropdown) }}>

            </div>
        </div>
    );
}