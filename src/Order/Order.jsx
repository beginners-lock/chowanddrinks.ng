import React, { useState, useEffect } from 'react';
import { url } from '../config';
import './Order.css';
import LoadingSpinner from '../Spinner/Spinner';

export default function Order(props) {
    const majors = ['Beans', 'Nigerian Staples', 'Pasta', 'Rice', 'Tubers'];
    const drinks = ['Malt']

    const [device, setDevice] = useState(''); 
    const [showorderlist, setShoworderlist] = useState(false);
    const [selectedrow, setSelectedrow] = useState(0);
    const [unseenorder, setUnseenorder] = useState(false);
    
    const [categories, setCategories] = useState([]);
    const [activecategory, setActivecategory] = useState('');
    const [menu, setMenu] = useState([]);
    const [loadingmenu, setLoadingmenu] = useState(false);

    const [paymentwarning, setPaymentwarning] = useState('');
    const [paymentloading, setPaymentloading] = useState(false);

    const [dockdelivery, setDockdelivery] = useState(true);
    const [address, setAddress] = useState('');

    const theme = {
        'active': {
            lightbgcolor: 'rgba(180,0,0,0.2)',
            darkbgcolor: 'red'
        },

        'inactive': {
            lightbgcolor: 'lightgrey',
            darkbgcolor: 'grey'
        }
    }
    
    //Format of each order row
    //{names: [], prices: [], plates: Int, total: Int}
    
    const [orderarray, setOrderarry] = useState([{names:[], prices:[], plates:10, total:0}]);

    useEffect(()=>{
        setDevice((window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop');
        setLoadingmenu(true);

        try{
            fetch(url+'/loadcategories', {
                method:'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({})
            }).then(response => {
                return response.json();
            }).then(response => {
                if(response.msg==='success'){
                    setCategories(response.categories);
    
                    //Check the cadngorder on LocalStorage if anything's there
                    let savedorder = localStorage.getItem('cadngorder');
                    
                    if(savedorder && JSON.parse(savedorder).length>0){
                        savedorder = JSON.parse(savedorder);
                        console.log(savedorder);
                        setOrderarry(savedorder);

                        if(savedorder[0]?.names?.length>0){
                            let index = 1;
                            let cat = 'Finger Foods';

                            if ( !savedorder[0].drinks ){
                                index = 1;
                                cat = 'Finger Foods';
                            }else{ 
                                index = response.categories.indexOf('Malt'); 
                                cat = 'Malt';
                            }

                            fetch(url+'/loadcategorymenu', {
                                method:'POST',
                                headers: { "Content-Type": "application/json"},
                                body: JSON.stringify({category: cat})
                            }).then(response => {
                                return response.json();
                            }).then(response => {
                                if(response.msg==='success'){
                                    setMenu(response.menu);
                                    setActivecategory(index);
                                    setLoadingmenu(false);
                                }
                            });
                        }else{
                            setMenu(response.menu);
                            setActivecategory(0);
                            setLoadingmenu(false);
                        }

                    }else{
                        setMenu(response.menu);
                        setActivecategory(0);
                        setLoadingmenu(false);
                    }
                }else{
                    props.changeTab('errorpage');
                    setLoadingmenu(false);
                }   
            });
        }catch(e){
            console.log('An error occured in Order useEffect: '+e);
            props.changeTab('errorpage');
        }
    }, [props]);

    const updateLS = (arr) => {
        localStorage.setItem('cadngorder', JSON.stringify(arr));
    }

    const bookorder = (name, price) => {
        let arr = [...orderarray];
        if(!arr[selectedrow]?.names.includes(name)){
            arr[selectedrow]?.names.push(name);
            arr[selectedrow].prices.push(price);

            //If it is a drink
            if(drinks.includes(categories[activecategory])){
                arr[selectedrow].drinks = true;
                arr[selectedrow].plates = 5
            }else{
                arr[selectedrow].plates = 10
            }

            setOrderarry(arr);
            updateLS(arr);
            
            //Set the unseenorders to true only if orderlist pane is not visible (only for tab and mobile view)
            if(!showorderlist){setUnseenorder(true);}
            
            //Check if it was a new major or drink added and if yes change the category
            if(majors.includes(categories[activecategory])){
                //Sets it to Finger Food
                changeCategory(1);
            }
        }else{
            //Remove it from the list
            let pos = arr[selectedrow]?.names.indexOf(name);
            arr[selectedrow]?.names.splice(pos, 1);
            arr[selectedrow].prices.splice(pos, 1);

            //If it is a drink and there is nothing on the names again set drinks to false
            if(drinks.includes(categories[activecategory]) && arr[selectedrow]?.names.length===0){
                arr[selectedrow].drinks = false;
                arr[selectedrow].plates = 10;
            }

            setOrderarry(arr);
            updateLS(arr);
        }
    }

    const neworder = () => {
        let arr = [...orderarray];
        arr.push({names:[], prices:[], plates:10, total:0});
        setOrderarry(arr);
        updateLS(arr);
        setSelectedrow(arr.length-1);
        
        //Set the unseenorders to true only if orderlist pane is not visible (only for tab and mobile view)
        if(!showorderlist){setUnseenorder(true);}
    }

    const delRow = (index) => {
        let arr = [...orderarray];

        //If it was the last order that was deleted
        if(selectedrow===arr.length-1){
            if(arr.length-2>=0){
                setSelectedrow(arr.length-2);
            }else{
                setSelectedrow(null);
            }
        }

        arr.splice(index, 1);
        setOrderarry(arr);
        updateLS(arr);
        //Set the unseenorders to true only if orderlist pane is not visible (only for tab and mobile view)
        if(!showorderlist){setUnseenorder(true);}
    }

    const changeCategory = (index) => {
        console.log('cc');
        if(index!==activecategory){
            setLoadingmenu(true);

            try{
                fetch(url+'/loadcategorymenu', {
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({category: categories[index]})
                }).then(response => {
                    return response.json();
                }).then(response => {
                    if(response.msg==='success'){
                        setMenu(response.menu);
                        setActivecategory(index);
                    }
                    setLoadingmenu(false);
                }); 
            }catch(e){
                console.log('An error occured in changeCategory(): '+e);
                props.changeTab('errorpage');
            }       
        }
    }

    const editPlates = (index, plates) => {
        let arr = [...orderarray];
        if(plates<10){
            arr[index].plates = 10;
            document.getElementsByClassName('OLqty')[index].value = 10;
        }else{
            arr[index].plates = plates;
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

    const majorOrdrink = (category) => {
        if( majors.includes(category) || drinks.includes(category) ){
            return true;
        }else{
            return false;
        }
    }

    const selectRowFunction = (index) => {
        setSelectedrow(index);

        if( orderarray[index]?.names.length>0){
            if ( !orderarray[index].drinks ){ 
                if(majorOrdrink(categories[activecategory])){
                    changeCategory(categories.indexOf('Finger Foods')); 
                }
            }else{
                if(!drinks.includes(categories[activecategory])){
                    changeCategory(categories.indexOf('Malt'));
                }
            }
        }
    }

    return (
        <div id="Order" style={{display:props.activetab==='order'?'flex':'none'}}>
            <script src="https://js.paystack.co/v1/inline.js"></script>
            <div id="OrderMain">
                <div id="OrderCategories">
                    {
                        categories.length>0?
                            categories.map((category, index)=>{
                                return(
                                    <div key={"OCchild"+index} className='OCchild' style={{backgroundColor: orderarray[selectedrow]?.names.length>0 ? !orderarray[selectedrow].drinks ? majorOrdrink(category) ? theme.inactive.lightbgcolor : theme.active.lightbgcolor : drinks.includes(category) ? theme.active.lightbgcolor : theme.inactive.lightbgcolor : theme.active.lightbgcolor, border:activecategory===index?'2px red solid':'none'}} 
                                        onClick={()=>{ 
                                            if( orderarray[selectedrow]?.names.length>0){
                                                if ( !orderarray[selectedrow].drinks ){
                                                    if( majorOrdrink(category) ){ 
                                                        
                                                    }else{  
                                                        changeCategory(index); 
                                                    }
                                                }else{   
                                                    if( drinks.includes(category) ){ 
                                                        changeCategory(index);
                                                    }else{  
                                                        
                                                    } 
                                                }
                                            }else{
                                                changeCategory(index);
                                            }   
                                            
                                        }}>
                                        
                                        
                                        <div className='OCimg' style={{backgroundColor: orderarray[selectedrow]?.names.length>0 ? !orderarray[selectedrow].drinks ? majorOrdrink(category) ? theme.inactive.darkbgcolor : theme.active.darkbgcolor : drinks.includes(category) ? theme.active.darkbgcolor : theme.inactive.darkbgcolor : theme.active.darkbgcolor }}></div>
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
                                        <div key={"OLC"+index} className="OLchild" style={{backgroundColor:selectedrow===index?'rgba(220, 120, 120, 0.3)':'rgba(0,0,0,0)'}} onClick={(e)=>{ e.stopPropagation(); selectRowFunction(index); }}>
                                            <div className="OLname">{ order?.names.join(' + ') }</div>
                                            <input className='OLqty' type='number' min={order.drinks?"5":"10"} value={order.plates} onChange={(e)=>{ editPlates(index, e.target.value); }}/>
                                            <div className='OLprice'>{ ( order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) )*order.plates }</div>
                                            <img alt="delete" className='delOLchild' style={{display:orderarray.length===0?'none':'flex'}} src="delete.png" onClick={(e)=>{ e.stopPropagation();  delRow(index);}}/>
                                        </div>
                                    )
                                })
                            :<div style={{margin:'10px 0px', fontSize:'14px'}}>No orders yet</div>
                        }
                        <div id='addneworder' style={{display:orderarray.length>0 ? orderarray[orderarray.length-1]?.names.length>0?'flex':'none':'flex'}} onClick={()=>{ neworder(); }}>
                            Add new order
                        </div>
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