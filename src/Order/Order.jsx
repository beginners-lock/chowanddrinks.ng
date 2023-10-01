import React, { useState } from 'react';
import './Order.css';

export default function Order(props) {
    const [device, setDevice] = useState( (window.innerWidth<=500)? 'mobile' : (window.innerWidth>=600 && window.innerWidth<=1100) ? 'tablet' : 'laptop' ); 
    const [showorderlist, setShoworderlist] = useState(false);

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
                        <div className="ODchild">
                            <div className='ODimg'></div>
                            <div className='ODtitle'>Jollof Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild">
                            <div className='ODimg'></div>
                            <div className='ODtitle'>White Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild">
                            <div className='ODimg'></div>
                            <div className='ODtitle'>Coconut Rice</div>
                            <div className='ODprice'>NGN 1500</div>
                        </div>
                        <div className="ODchild">
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
                        <div className="OLchild">
                            <div className="OLname">Jollof Rice</div>
                            <div className='OLqty'>5</div>
                            <div className='OLprice'>7500</div>
                            <div className='delOLchild'></div>
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
