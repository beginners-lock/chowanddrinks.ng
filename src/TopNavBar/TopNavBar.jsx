import React, { useState } from 'react';
import './TopNavBar.css';
import { theme } from '../theme';

export default function () {
	const [activetab, setActivetab] = useState('Home');

    return (
        <div id="TopNavBar">
            <div id="TNBleft">
                <div id="TNBlogo"></div>
                chowanddrinks.ng
            </div>

            <div id="TNBmiddle">
                <div className='TNBopts'>
                    <div style={{color:activetab==='Home'?theme.red1:theme.black1}}>Home</div>
                    <div className='TNBdivs' style={{backgroundColor:activetab==='Home'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts'>
                    <div style={{color:activetab==='Order'?theme.red1:theme.black1}}>Order</div>
                    <div className='TNBdivs' style={{backgroundColor:activetab==='Order'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts'>
                    <div style={{color:activetab==='Rent-a-chef'?theme.red1:theme.black1}}>Rent-a-chef</div>
                    <div className='TNBdivs' style={{backgroundColor:activetab==='Rent-a-chef'?theme.red1:theme.transparent}}></div>
                </div>

                <div className='TNBopts'>
                    <div style={{color:activetab==='History'?theme.red1:theme.black1}}>History</div>
                    <div className='TNBdivs' style={{backgroundColor:activetab==='History'?theme.red1:theme.transparent}}></div>
                </div>
                
            </div>

            <div id="TNBright">
                <div id='TNBsignin'>Sign in</div>
                <div id="TNBaccountpic"></div>
            </div>

            <div id='TNBburger'>

            </div>
        </div>
    );
}

/**
 * 
 * <div style={{color:activetab==='Order'?theme.red1:theme.black1}} className='TNBopts'>
                    Order
                    <div style={{borderBottomColor:activetab==='Home'?theme.red1:theme.transparent, width:activetab==='Home'?'100%':'0px', height:'5px'}}></div>
                </div>
                <div style={{color:activetab==='Rent'?theme.red1:theme.black1}} className='TNBopts'>
                    Rent-a-chef
                    <div style={{borderBottomColor:activetab==='Home'?theme.red1:theme.transparent, width:activetab==='Home'?'100%':'0px', height:'5px'}}></div>
                </div>
                <div style={{color:activetab==='History'?theme.red1:theme.black1}} className='TNBopts'>
                    History
                    <div style={{borderBottomColor:activetab==='Home'?theme.red1:theme.transparent, width:activetab==='Home'?'100%':'0px', height:'5px'}}></div>
                </div>
 */