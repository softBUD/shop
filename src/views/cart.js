import React from 'react';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            <table>
                <tr>
                    <td></td>
                    <td>제품명</td>
                    <td>수량</td>
                    <td>변경</td>
                    <td>가격</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>{ props.state[0].name }</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}


function CartState(state){
    return {
        state:state
    }
}
export default connect(CartState)(Cart);