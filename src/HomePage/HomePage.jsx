import React from 'react';
import { theme } from '../theme';
import './HomePage.css';

export default function Home(props) {
    return (
        <div id="Home" style={{display:props.activetab==='home'?'flex':'none'}}>
            <div id="Hrow1">
                <div id="HR1left">
                    <h5 className="special1" style={{color:theme.red1, padding:'8px 20px', borderRadius:'30px'}}>
                        For us it's more than just a delivery</h5>
                    <h1 id='HR1bigtext'>Enjoy food delivery at <em style={{color:theme.red1}}>amazing speed</em> but still keeping our professional <em style={{color:theme.red1}}>quality</em></h1>
                    
                    <h4 className='italictext1'>Our job is to deliver and yours is to be satisfied</h4>
                    <div className='redbtn1' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('order');}}>
                        What's on the menu?
                    </div>
                </div>
                <img id="HR1right" /*style={{backgroundColor:theme.orange2}}*/ alt="homeimg" src="homeimg4.webp"/>
            </div>


            <div id="Hrow2">
                <h5 id="HR2mini1" style={{color:theme.red1}}>WHAT WE SERVE</h5>
                <h2 id="HR2main2">The Best Choice For Food Delivery</h2>
                <div id="HR2children">
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img src="order.jpg" style={{width:'100%', height:'auto'}}/>
                        </div>
                        <h4 className='HR2text1'>Easy To Order</h4>
                        <h5 className='HR2text2'>Just a few steps to get your order ready</h5>
                    </div>
            
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img src="delivery.jpg" style={{width:'auto', height:'100%'}}/>
                        </div>
                        <h4 className='HR2text1'>Speedy Delivery</h4>
                        <h5 className='HR2text2'>Delivery that is not just on time but even faster</h5>
                    </div>
                    
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img src="quality.jpg" style={{width:'100%', height:'auto'}}/>
                        </div>
                        <h4 className='HR2text1'>Top Notch Quality</h4>
                        <h5 className='HR2text2'>Even with the rush we still keep our quality</h5>
                    </div>
                </div>
            </div>

            <div id="Hrow3">
                <div id="HR3left">
                    <div className='HR3Lchild' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('order');}}>
                        <div className='HR3Limg'></div>
                        Food
                    </div>
                    <div className='HR3Lchild' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('order');}}>
                        <div className='HR3Limg'></div>
                        Snacks
                    </div>
                    <div className='HR3Lchild' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('order');}}>
                        <div className='HR3Limg'></div>
                        Drinks
                    </div>
                    <div className='HR3Lchild' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('order');}}>
                        <div className='HR3Limg'></div>
                        Cakes
                    </div>
                </div>
                <div id="HR3right">
                    <div className="HR3Rchild">
                        <img src="food.jpeg" alt="homefood" style={{height:'100%', width:'auto'}}/>
                    </div>

                    <div className="HR3Rchild">
                        <img src="snacks.jpeg" alt="homefood" style={{height:'100%', width:'auto'}}/>
                    </div>

                    <div className="HR3Rchild">
                        <img src="drinks.jpeg" alt="homefood" style={{height:'100%', width:'auto'}}/>
                    </div>

                    <div className="HR3Rchild">
                        <img src="cakes.jpeg" alt="homefood" style={{height:'100%', width:'auto'}}/>
                    </div>
                </div>
            </div>

            <div id="Hrow4">
                <div id="HR4left">
                    <h5 id="HR4mini1" style={{color:theme.red1, margin:0}}>CREATE AN ACCOUNT</h5>
                    <h1 id="HR4main1">
                        Start ordering on chowanddrinks.ng today!
                    </h1>
                    <div className='redbtn1' style={{backgroundColor:theme.red1}} onClick={()=>{props.changeTab('authentication');}}>Sign up</div>
                </div>
                <img id="HR4right" src="homeimg1.jpeg" style={{backgroundColor:theme.yellow2}}/>
            </div>

            <div id="footer">
                chowanddrinks.ng Copyright &copy; 2023
            </div>
        </div>
    )
}
