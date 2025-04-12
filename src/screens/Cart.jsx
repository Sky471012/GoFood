import React from 'react'
import { useDispatchCart, useCart } from "../components/ContextReducer";
import Delete from '@mui/icons-material/Delete';


export default function Cart() {

    let dispatch = useDispatchCart();
    let data = useCart();
    if(data.length === 0){
        return(
            <div className="m-5 w-100 text-center fs-3">
                The Cart is empty.
            </div>
        )
    }
    
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className='fs-4'>
            <tr>
              <th className='text-success' scope='col ' >#</th>
              <th className='text-success' scope='col' >Name</th>
              <th className='text-success' scope='col' >Quantity</th>
              <th className='text-success' scope='col' >Option</th>
              <th className='text-success' scope='col' >Amount</th>
              <th className='text-success' scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' className='text-white' >{index + 1}</th>
                <td className='text-white' >{food.name}</td>
                <td className='text-white' >{food.qty}</td>
                <td className='text-white' >{food.size}</td>
                <td className='text-white' >{food.price}</td>
                <td className='text-white' ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className="fs-2">Total Price: ₹ {totalPrice}/-</h1></div>
        <div><button className='btn bg-success mt-5 fw-bold'>Check Out</button></div>
      </div>
    </div>
  )
}
