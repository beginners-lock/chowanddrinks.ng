import React, { useState } from 'react';
import './Order.css';
import OrderRow from './OrderRow';

export default function Order(props) {
    const [device, setDevice] = useState( (window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop' ); 
    const [showorderlist, setShoworderlist] = useState(true);
    const [selectedrow, setSelectedrow] = useState(0);
    //Format of each order row
    //{names: [], prices: [], plates: Int, total: Int}
    
    const [orderarray, setOrderarry] = useState([{names:[], prices:[], plates:10, total:0}]);

    const bookorder = (name, price) => {
        let arr = [...orderarray];
        if(!arr[selectedrow].names.includes(name)){
            arr[selectedrow].names.push(name);
            arr[selectedrow].prices.push(price);

            setOrderarry(arr);
        }
    }

    const neworder = () => {
        let arr = [...orderarray];
        arr.push({names:[], prices:[], plates:10, total:0});
        setOrderarry(arr);
        setSelectedrow(arr.length-1);
    }

    const delRow = (index) => {
        let arr = [...orderarray];
        arr.splice(index, 1);
        setOrderarry(arr);

        //If it was the last order that was deleted
        if(selectedrow>arr.length-1){
            setSelectedrow(arr.length-1);
        }
    }

    return (
        <div id="Order" style={{display:props.activetab==='order'?'flex':'none'}}>
            <div id="OrderMain">
                <div id="OrderCategories">
                    <div className='OCchild'>
                        <div className='OCimg'></div>
                        <div className='OCtext'>Food</div>
                    </div>
                    <div className='OCchild'>
                        <div className='OCimg'></div>
                        <div className='OCtext'>Snacks</div>
                    </div>
                    <div className='OCchild'>
                        <div className='OCimg'></div>
                        <div className='OCtext'>Drinks</div>
                    </div>
                    <div className='OCchild'>
                        <div className='OCimg'></div>
                        <div className='OCtext'>Cakes</div>
                    </div>
                    <div className='OCchild'>
                        <div className='OCimg'></div>
                        <div className='OCtext'>Events</div>
                    </div>
                </div>
                <div id="OrderDishes">
                    <h3 id="ODheader">Menu</h3>
                    <div id="ODparent">
                        <div className="ODchild" onClick={()=>{bookorder('Jollof Rice', 1500);}}>
                            <div className='ODimg'></div>
                            <div className='ODtitle'>Jollof Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild" onClick={()=>{bookorder('White Rice', 1500);}}>
                            <div className='ODimg'></div>
                            <div className='ODtitle'>White Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild" onClick={()=>{bookorder('Cocunut Rice', 1500);}}>
                            <div className='ODimg'></div>
                            <div className='ODtitle'>Coconut Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild" onClick={()=>{bookorder('Fried Rice', 1500);}}>
                            <div className='ODimg'></div>
                            <div className='ODtitle'>Fried Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="OrderRight" style={{right: device!=='laptop'? showorderlist ? 0 : -(window.innerWidth) : ''}}>
                <input id="OrderSearch" placeholder='Search your menu...'/>
                <div id="OrderList">
                    <h3 id="OLtitle">My order</h3>
                    <div id="OLparent">
                        <div className="OLchild" style={{padding:0}}>
                            <div className="OLname">Order</div>
                            <div className='OLqty'>Plates</div>
                            <div className='OLprice'>Price</div>                            
                            <div className='delOLchild' style={{visibility:'hidden'}}></div>
                        </div>
                        {
                            orderarray.length>0?
                                orderarray.map((order, index) => {
                                    return(
                                        <div key={"OLC"+index} className="OLchild" style={{backgroundColor:selectedrow===index?'rgba(220, 120, 120, 0.3)':'rgba(0,0,0,0)'}} onClick={()=>{ setSelectedrow(index); }}>
                                            <div className="OLname">{ order.names.join(' + ') }</div>
                                            <div className='OLqty'>{ order.plates}</div>
                                            <div className='OLprice'>{ order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) }</div>
                                            <div className='delOLchild' style={{display:orderarray.length===0?'none':'flex'}} onClick={()=>{delRow(index);}}></div>
                                        </div>
                                    )
                                })
                            :<div>No orders yet</div>
                        }
                        <div id='addneworder' style={{display:orderarray.length>0 ? orderarray[orderarray.length-1].names.length>0?'flex':'none':'flex'}} onClick={()=>{ neworder(); }}>
                            Add new order
                        </div>
                    </div>
                    <div id="OLtotal">
                        <h4 id="OLtotalL">Total</h4>
                        <h4 id="OLtotalR">NGN 12,000</h4>
                    </div>
                    <div id="orderpayment">Make Payment</div>
                </div>
            </div>
            <div id="ordertoggle" onClick={()=>{ setShoworderlist(!showorderlist); }}></div>
        </div>
    );
}
