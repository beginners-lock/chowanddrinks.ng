import React, { useState, useEffect } from 'react';
import { url } from '../config';
import './Order.css';
import LoadingSpinner from '../Spinner/Spinner';

export default function Order(props) {
    const drinks = ['Malt']

    const [device, setDevice] = useState(''); 
    const [showorderlist, setShoworderlist] = useState(false);
    const [unseenorder, setUnseenorder] = useState(false);
    
    const [activetype, setActiveType] = useState('Food');
    const [types, setTypes] = useState({
        'Food':['Beans', 'Finger Foods', 'Nigerian Soups', 'Nigerian Staples', 'Pasta', 'Proteins', 'Rice', 'Side Dish', 'Stew & Sauce', 'Tubers'], 
        'Drinks':['Malt'], 
        'Snacks':[]
    });
    const [activecategory, setActivecategory] = useState(0);
    const [menu, setMenu] = useState([]);
    const [loadingmenu, setLoadingmenu] = useState(false);

    const [paymentwarning, setPaymentwarning] = useState('');
    const [paymentloading, setPaymentloading] = useState(false);

    const [dockdelivery, setDockdelivery] = useState(true);
    const [address, setAddress] = useState('');
    
    //Format of each order row
    //{names: [], prices: [], plates: Int, total: Int}
    
    const [orderarray, setOrderarry] = useState([]);

    useEffect(()=>{
        setDevice((window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop');
        console.log('eff');

        if(types[activetype].length>0){
            setLoadingmenu(true);
            
            if(types[activetype][activecategory]===undefined){
                setActivecategory(0);
            }

            try{
                fetch(url+'/loadcategorymenu', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({category: types[activetype][activecategory]})
                }).then(response => {
                    return response.json();
                }).then(response => {
                    if(response.msg==='success'){
                        setMenu(response.menu);
                        setLoadingmenu(false);
                    }
                });
            }catch(e){
                console.log('An error occured in Order useEffect: '+e);
                props.changeTab('errorpage');
            }
        }else{
            setMenu([]);
        }

    }, [props, activecategory, activetype, types]);

    const updateLS = (arr) => {
        localStorage.setItem('cadngorder', JSON.stringify(arr));
    }

    const bookorder = (name, price) => {
        let arr = [...orderarray];
        arr.push({names:[], prices:[], plates:10, total:0});

        arr[arr.length-1]?.names.push(name);
        arr[arr.length-1]?.prices.push(price);
        if(drinks.includes(types[activetype])){
            arr[arr.length-1].drinks = true;
            arr[arr.length-1].plates = 5
        }else{
            arr[arr.length-1].plates = 10
        }

        setOrderarry(arr); updateLS(arr);

        //Set the unseenorders to true only if orderlist pane is not visible (only for tab and mobile view)
        if(!showorderlist){setUnseenorder(true);}
    }

    const delRow = (index) => {
        let arr = [...orderarray];

        arr.splice(index, 1);
        
        setOrderarry(arr);
        updateLS(arr);
        //Set the unseenorders to true only if orderlist pane is not visible (only for tab and mobile view)
        if(!showorderlist){setUnseenorder(true);}
    }

    const editPlates = (index, plates) => {
        let arr = [...orderarray];
        
        if(arr[index].drinks){
            if(plates<5){
                arr[index].plates = 5;
                document.getElementsByClassName('OLqty')[index].value = 5;
            }else{
                arr[index].plates = plates;
            }
        }else{
            if(plates<10){
                arr[index].plates = 10;
                document.getElementsByClassName('OLqty')[index].value = 10;
            }else{
                arr[index].plates = plates;
            }
        }
        setOrderarry(arr);
        updateLS(arr);
    }

    const makePayment = () => {
        localStorage.setItem('cadngorder', JSON.stringify(orderarray));

        if(props.activeuser!==null){ 
            let amount = parseInt( orderarray.reduce( (acc, order)=>{ return acc + (order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }, 0));

            setPaymentwarning(''); setPaymentloading(true);
            
            try{
                fetch(url+'/makepayment', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        userid: props.activeuser.userid, email: props.activeuser.email, amount: amount,
                        list: JSON.stringify(orderarray)
                    })
                }).then(response => {
                    return response.json();
                }).then(response => {
                    if(response.msg==='success'){
                        if(response.data.status===true){
                            window.location.href = response.data.data.authorization_url;
                        }else{
                            setPaymentwarning('An error occured, please try again later');
                        }
                    }else{
                        setPaymentwarning('An error occured, please try again later');
                    }
                    setPaymentloading(false);
                });
            }catch(e){
                console.log('An error occured in makePayment(): '+e);
                props.changeTab('errorpage');
            }
        }else{
            props.changeTab('authentication');
        }
    }

    /*const delivery = () => {
        let total = parseInt( orderarray.reduce( (acc, order)=>{ return acc + (order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }, 0));
        if(total>0){
            setDockdelivery(false);
        }
    }*/

    return (
        <div id="Order" style={{display:props.activetab==='order'?'flex':'none'}}>
            <script src="https://js.paystack.co/v1/inline.js"></script>
            <div id="OrderMain">
                <div id="OrderTypes">
                    {
                        Object.keys(types).map((type, index)=>{
                            return(<div key={'type'+index} style={{color:activetype===type?'red':'grey'}} onClick={()=>{ setActiveType(type); }}>{type}</div>)
                        })
                    }
                </div>
                <div id="OrderCategories">
                    {
                        types[activetype].length>0?
                            types[activetype].map((category, index)=>{
                                return(
                                    <div key={"OCchild"+index} className='OCchild' style={{backgroundColor:activecategory===index?'rgba(180,0,0,0.2)':'lightgrey', border:activecategory===index?'2px red solid':'none'}} 
                                        onClick={()=>{ setActivecategory(index); }}>
                                        <div className='OCimg' style={{backgroundColor:activecategory===index?'red':'grey'}}></div>
                                        <div className='OCtext'>{category.length>13 ? category.slice(0, 13)+'...' : category}</div>
                                    </div>
                                );
                            })
                        :''
                    }
                </div>
                <div id="OrderDishes">
                    <h3 id="ODheader">Menu</h3>
                    <div id="ODparent">
                        <LoadingSpinner
                            width={'15px'}
                            height={'15px'}
                            loading={loadingmenu}
                            borderColor={'#FE7240'}
                            borderTopColor={'red'}
                        />
                        {
                            menu.length>0?
                                menu.map((menu, index) => {
                                    return(
                                        <div key={"ODchild"+index} className="ODchild" style={{display:loadingmenu?'none':'flex'}} onClick={()=>{bookorder(menu.name, menu.price);}}>
                                            <div className='ODimgdiv'>
                                                <img alt="menuimg" className="ODimg" src={url+'/public/menu/'+menu.image}/>
                                            </div>
                                            <div className='ODtitle'>{menu.name}</div>
                                            <div className='ODprice'>{'NGN '+menu.price}</div>
                                        </div>
                                    );
                                })
                            :''
                        }
                    </div>
                </div>
            </div>
            <div id="OrderRight" style={{right: device!=='laptop'? showorderlist ? 0 : -(window.innerWidth) : ''}}>                <div id="OrderList">
                    <h3 id="OLtitle">My order</h3>
                    <div id="OLparent">
                        <div className="OLchild" style={{padding:0}}>
                            <div className="OLname">Order</div>
                            <div className='OLqty'>Qty</div>
                            <div className='OLprice'>Price</div>                            
                            <div className='delOLchild' style={{visibility:'hidden'}}></div>
                        </div>
                        {
                            orderarray.length>0?
                                orderarray.map((order, index) => {
                                    return(
                                        <div key={"OLC"+index} className="OLchild">
                                            <div className="OLname">{ order?.names.join(' + ') }</div>
                                            <input className='OLqty' type='number' min={order.drinks?"5":"10"} value={order.plates} onChange={(e)=>{ editPlates(index, e.target.value); }}/>
                                            <div className='OLprice'>{ ( order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }</div>
                                            <img alt="delete" className='delOLchild' style={{display:orderarray.length===0?'none':'flex'}} src="delete.png" onClick={(e)=>{ e.stopPropagation();  delRow(index);}}/>
                                        </div>
                                    )
                                })
                            :<div style={{margin:'10px 0px', fontSize:'14px'}}>No orders yet</div>
                        }
                    </div>
                    <div id="OLtotal">
                        <h4 id="OLtotalL">Total</h4>
                        <h4 id="OLtotalR">
                            {
                                Array.isArray(orderarray)?
                                orderarray.reduce( (acc, order)=>{ return acc + (order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }, 0)
                                :''
                            }
                        </h4>
                    </div>
                    <div id="paymentwarning">{paymentwarning}</div>
                    <div id="bookorder" onClick={()=>{ if( props.activeuser!==null ){ setDockdelivery(false); }else{ props.changeTab('authentication'); } }}>    
                        Order Destination
                    </div>
                </div>
            </div>
            <div id="ordertoggle" onClick={()=>{ /*If you are unveiling the orders pane set the unseenorder to false*/if(showorderlist===false){setUnseenorder(false);} setShoworderlist(!showorderlist); }}>
                <img id="menuicon" src="menu.png" alt="menu"/>
                <div id="togglealert" style={{display:unseenorder?'flex':'none'}}></div>
            </div>
            <div id="deliverypage" style={{right:dockdelivery?-window.innerWidth:0}}>
                <img id="DPdocker" alt="dock" src="rightarrow.png" onClick={()=>{setDockdelivery(true);}}/>
                <div id="DPtext1">NOTE: Delivery is only available within Lagos</div>
                <div id="DPmain">
                    <div id="DPleft">
                        <input className="DPinput" type='text' placeholder='Address' onChange={(e)=>{setAddress(e.target.value);}}/>
                        <div id="DPtext2">Ensure you input an accurate location in Lagos</div>
                        <div id="makepayment"  onClick={()=>{ if(!paymentloading){ if(address!==''){ makePayment(); } } }}>
                            {
                                !paymentloading?        
                                    'Make Payment'
                                :    <LoadingSpinner
                                        width={'10px'}
                                        height={'10px'}
                                        loading={paymentloading}
                                        borderColor={'white'}
                                        borderTopColor={'#FE7240'}
                                    />
                            }
                        </div>
                    </div>
                    <div id="DPright">
                        <div className="DPOchild" style={{padding:0}}>
                            <div className="DPOname">Order</div>
                            <div className='DPOqty'>Plates</div>
                            <div className='DPOprice'>Price</div>
                        </div>
                        {
                            orderarray.length>0?
                                orderarray.map((order, index) => {
                                    return(
                                        <div key={"DPOC"+index} className="DPOchild">
                                            <div className="DPOname">{ order?.names.join(' + ') }</div>
                                            <div className='DPOqty'>{order.plates}</div>
                                            <div className='DPOprice'>{ ( order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }</div>
                                        </div>
                                    )
                                })
                            :<div style={{margin:'10px 0px', fontSize:'14px'}}>No orders yet</div>
                        }
                        <div id="DPOtotal">
                            <h4 id="DPOtotalL">Total</h4>
                            <h4 id="DPOtotalR">
                                {
                                    Array.isArray(orderarray)?
                                        orderarray.reduce( (acc, order)=>{ return acc + (order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }, 0)
                                    :''
                                }
                            </h4>
                        </div>
                        <div id="DPOtotal">
                            <h4 id="DPOtotalL">Delivery fee</h4>
                            <h4 id="DPOtotalR">2000</h4>
                        </div>
                        <div id="DPOspecial">
                            <h4 id="DPOspecialL">Total fee</h4>
                            <h4 id="DPOspecialR">
                            {
                                Array.isArray(orderarray)?
                                    orderarray.reduce( (acc, order)=>{ return acc + (order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }, 0)+2000
                                :''    
                            }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


//<input id="OrderSearch" placeholder='Search your menu...'/>