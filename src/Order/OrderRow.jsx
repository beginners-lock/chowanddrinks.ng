import React from 'react'

const OrderRow = (props) => {
    return (
        <div className="OLchild">
            <div className="OLname">{ props.order.names.join(' + ') }</div>
            <div className='OLqty'>{ props.order.plates}</div>
            <div className='OLprice'>{ props.order.prices.reduce((acc, val)=>{return acc+parseInt(val) ;}, 0) }</div>
            <div className='delOLchild'></div>
        </div>
    )
}

export default OrderRow