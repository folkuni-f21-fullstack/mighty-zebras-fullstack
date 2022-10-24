import React from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/_landing.scss';

import { useEffect } from 'react';
import { Order } from '../models/types';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { actions as tempOrderActions } from '../features/tempOrderReducer';
import { actions as cartActions } from '../features/cartReducer';


type Props = {}

const LandingView = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tempOrder: Order | undefined =  useSelector((state: RootState) => state.tempOrder)[0];
  useEffect(() => {
    if(tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart())
    }
  }, [])

  function goToMenu() {
    navigate('/Menu')
  }

  return (
    <main className='landing'>
      <Nav />
      <section className='hero'>
        <button onClick={goToMenu}>MENY</button>
      </section>

      <section className='about-us'>
        <div className='border'>
          <h3>Om oss</h3>
        </div>

        <p>Rocksalt grundades av Christian Johnsson år 2022 med idén om att personer ska kunna få god och vällagad restaurangmat utan besväret att behöva sitta på en restaurang.</p>
      </section>
      <figure className='about-us-img'></figure>

      <figure className='our-food-img'></figure>
      <section className='our-food'>
        <div className='border'>
          <h3>Vår mat</h3>
        </div>
        <p>Alla våra råvaror är lokalproducerade. Vi samarbetar med ett gäng glada bönder i Värmland! Våra kockar arbetar ständigt med att komponera nya, spännande, smakrika rätter! Dagliga kontroller genomförs för att säkerställa att vår mat håller den allra högsta standarden.</p>
      </section>

      <section className='our-goal'>
        <div className='border'>
          <h3>Vårt mål</h3>
        </div>
        <p>Vår grundare Christian Johnsson har som mål att alla i hela världen ska få äta bra mat, även om man inte kan ta sig till en restaurang.</p>
      </section>
      <figure className='our-goal-img'></figure>

      <section className='map'>
        <div>
          <h4>Hitta till oss</h4>
        </div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.132788853451!2d13.520668944233146!3d59.369957206767886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb19d87d4c3c7%3A0x300ad4aa5764fa28!2sLambergskajen%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1665738091678!5m2!1ssv!2sse" loading="lazy" ></iframe>
        <p>Lambergskajen</p>
        <p>652 21 Karlstad</p>
        </section>

    </main>
  )
}

export default LandingView