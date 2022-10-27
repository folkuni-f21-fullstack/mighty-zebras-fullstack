import '../../styles/_account.scss';
import UserInformation from '../../components/UserInformation';
import Nav from '../../components/Nav';
import SearchUser from '../../components/SearchUser';
import UserOrders from '../../components/UserOrders';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { User, Order } from '../../models/types';
import { actions as orderActions } from '../../features/orderReducer';
import { actions as tempOrderActions } from '../../features/tempOrderReducer';
import { actions as cartActions } from '../../features/cartReducer';
import { actions as userActions } from '../../features/userReducer';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const tempOrder: Order | undefined =  useSelector((state: RootState) => state.tempOrder)[0];
  useEffect(() => {
    if(tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart())
    }
    const accountId: string | null = localStorage.getItem('accountId');
    
    if(accountId) {
      getOrder(accountId)
    } else {
      navigate('/');
    }
  }, [])

  async function getOrder(accountId:string) {
    setLoading(true)    
    const orderResponse = await fetch(`/api/order/user/${accountId}`);
    const orderData = await orderResponse.json();   
    
    if(user.name == '') {      
      const userResponse = await fetch(`/api/user/${accountId}`);
      const userData = await userResponse.json();      
      dispatch(userActions.setUser(userData))
    } 
    
    dispatch(orderActions.getOrders(orderData));        
    setLoading(false)
  }

  const handleLogout: () => void = () => {
      dispatch(userActions.logOut());
      localStorage.removeItem('accountId')
      navigate('/menu')
  }

 const user:User = useSelector((state: RootState) => state.user);
 const orders:Order[] = useSelector((state: RootState) => state.orders);

  return (
    <section className='account-page'>
      <Nav />
      {loading ? 
        <div className='loading'></div>
        : ''
      }
      <button className='btn-logout' onClick={handleLogout}>Logga ut</button>
      <div className="headline">
          <h1>Konto</h1>
      </div>
      <div className='account-top'>
        <UserInformation user={user} />
        <div className='divider'></div>
        <SearchUser orders={orders} />
      </div>
      <UserOrders orders={orders} />
    </section>
  )
}

export default Account