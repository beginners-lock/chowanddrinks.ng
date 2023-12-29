import React from 'react';
import { theme } from '../theme';
import { url } from '../config';
import './HomePage.css';

export default function Home(props) {
    const menu = [
        {name:'Fried Rice', image:'friedrice.jpg', price:'500'}, {name:'Jollof Rice', image:'jollofrice.jpg', price:'500'}, {name:'Coconut Fried Rice', image:'coconutfriedrice.jpg', price:'500'},
        {name:'Beans & Rice (Jollof)', image:'beansandricejollof.jpg', price:'600'}, {name:'Jambalaya', image:'jambalaya.jpg', price:'500'}, {name:'Ofada Rice', image:'ofadarice.jpg', price:'600'},
        {name:'Eba', image:'eba.jpg', price:'400'}, {name:'Fufu', image:'fufu.jpg', price:'400'}, {name:'Amala', image:'amala.jpg', price:'400'},
        {name:'Pounded Yam', image:'poundedyam.jpg', price:'600'}, {name:'Semovita', image:'semovita.jpg', price:'400'}, {name:'Poundo', image:'poundo.jpg', price:'600'},
        {name:'Egusi', image:'egusi.jpeg', price:'500'}, {name:'Ogbono', image:'ogbono.jpg', price:'500'}, {name:'Afang', image:'afang.jpg', price:'500'},
        {name:'Oha', image:'oha.jpg', price:'500'}, {name:'Vegetable Soup - Ugwu', image:'ugwu.jpg', price:'500'}, {name:'Bitterleaf Soup', image:'bitterleaf.jpg', price:'500'},
        {name:'Fried Beef', image:'friedbeef.jpeg', price:'500'}, {name:'Croaker', image:'croaker.jpeg', price:'600'}, {name:'Fried Chicken', image:'friedchicken.jpeg', price:'700'},
        {name:'Asun', image:'asun.jpeg', price:'1000'}, {name:'Plain Spaghetti', image:'plainspaghetti.jpg', price:'500'}, {name:'Plain Yam', image:'plainyam.jpg', price:'300'}, {name:'Egg Sauce', image:'eggsauce.jpg', price:'500'}
    ]; 

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
                <img id="HR1right" /*style={{backgroundColor:theme.orange2}}*/ alt="homeimg" src="homeimg2.jpg"/>
            </div>


            <div id="Hrow2">
                <h5 id="HR2mini1" style={{color:theme.red1}}>WHAT WE SERVE</h5>
                <h2 id="HR2main2">The Best Choice For Food Delivery</h2>
                <div id="HR2children">
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img alt="order" src="order.jpg" style={{width:'100%', height:'auto'}}/>
                        </div>
                        <h4 className='HR2text1'>Easy To Order</h4>
                        <h5 className='HR2text2'>Just a few steps to get your order ready</h5>
                    </div>
            
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img alt="delivery" src="delivery.jpg" style={{width:'auto', height:'100%'}}/>
                        </div>
                        <h4 className='HR2text1'>Speedy Delivery</h4>
                        <h5 className='HR2text2'>Delivery that is not just on time but even faster</h5>
                    </div>
                    
                    <div className='HR2child'>
                        <div className='HR2img' style={{backgroundColor:theme.yellow1, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                            <img alt="quality" src="quality.jpg" style={{width:'100%', height:'auto'}}/>
                        </div>
                        <h4 className='HR2text1'>Top Notch Quality</h4>
                        <h5 className='HR2text2'>Even with the rush we still keep our quality</h5>
                    </div>
                </div>
            </div>

            <div id="Hrowmenu">
                <h5 id="HRmenumini1" style={{color:theme.red1}}>MENU</h5>
                <div id="HRmenubody">
                    {
                        menu.map((menu, index)=>{
                            return(
                                <div key={"HRmenuchild"+index} className="HRmenuchild" onClick={()=>{props.changeTab('order');}}>
                                    <div className='HRmenuimgdiv'>
                                        <img alt="menuimg" className="HRmenuimg" src={url+'/public/menu/'+menu.image}/>
                                    </div>
                                    <div className='HRmenutitle'>{menu.name}</div>
                                    <div className='HRmenuprice'>{'NGN '+menu.price}</div>
                                </div>
                            )
                        })
                    }
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
                        <img src="snacks.jpeg" alt="homesnacks" style={{height:'100%', width:'auto'}}/>
                    </div>

                    <div className="HR3Rchild">
                        <img src="drinks.jpeg" alt="homedrinks" style={{height:'100%', width:'auto'}}/>
                    </div>

                    <div className="HR3Rchild">
                        <img src="cakes.jpeg" alt="homecakes" style={{height:'100%', width:'auto'}}/>
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
                <img alt="homeimg1" id="HR4right" src="homeimg1.jpeg" style={{backgroundColor:theme.yellow2}}/>
            </div>

            <div id="footer">
                chowanddrinks.ng Copyright &copy; 2023
            </div>
        </div>
    )
}
