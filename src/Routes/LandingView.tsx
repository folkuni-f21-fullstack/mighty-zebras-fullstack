import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/_landing.scss";
import { useEffect, useState, useRef } from "react";
import { Order } from "../models/types";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { actions as tempOrderActions } from "../features/tempOrderReducer";
import { actions as cartActions } from "../features/cartReducer";
import heroVideo from '../assets/hero-video.mp4';
import logoLight from "../assets/logoLight.svg";
import chefCooking from "../assets/chef-cooking.jpg"
import foodImg from "../assets/food.jpg"
import quoteImg from "../assets/our-goal.jpg"
import vector from '../assets/menu/white-vector.svg';

const LandingView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [offset, setOffset] = useState<number>(0);
  const [navCSS, setNavCSS] = useState<boolean>(false)
  const setScroll = () => {
    setOffset(window.scrollY);
  };

  const handleLink: (id: string) => void = (id) => {
    const elemendId: Element | null = document.querySelector(`#${id}`);
    if (elemendId) {
      const y = elemendId.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const navElem: HTMLElement | null = document.querySelector('header');
    const scrollHeight:number = window.pageYOffset;
    if(navElem) {
      let navHeight:number = navElem.getBoundingClientRect().height;
      if(scrollHeight < navHeight) {
        setNavCSS(true)
        videoRef.current && videoRef.current.play();
      } else {
        setNavCSS(false)
        videoRef.current && videoRef.current.pause();
      }
    }

    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  }, [offset]);

  const tempOrder: Order | undefined = useSelector(
    (state: RootState) => state.tempOrder
  )[0];
  
  useEffect(() => {
    const root:any = document.querySelector('#root');
    root.scrollIntoView({
    behavior: 'instant'
  });
    if (tempOrder) {
      dispatch(tempOrderActions.clearTempOrder());
      dispatch(cartActions.clearCart());
    }
  }, []);

  function goToMenu() {
    navigate("/Menu");
  }

  return (
    <main className="landing">
      <Nav scrollTop={navCSS} />
      <section className="hero" >
        <video className="video-container" ref={videoRef} muted playsInline autoPlay loop  >
            <source src={heroVideo} type="video/mp4"/> 
        </video>
        <div className="logo-container">
          <div className="logo-text">
            <h2>Rocksalt</h2>
            <p>take-away</p>

          </div>
          
          <img src={logoLight} alt="rocksalt logo" className="logo" />
        </div>
        <p className="open-text">??ppet dygnet runt!</p>


        
        <button onClick={goToMenu}>Meny</button>
        <figure className="arrows"  onClick={() => handleLink("about-us")}>
          <img src={vector} alt="" className="small-arrow"/>
          <img src={vector} alt="" className="big-arrow"/>
        </figure>
      </section>
      <section className="about-page">
        <section className="about-us">
          <div className="border" id="about-us">
            <h3>Om oss</h3>
          </div>
          <p>
            Rocksalt take-away grundades av John Christiansson, h??sten 2021. Efter ??r av
            pandemi f??ddes id??n om att alla ska kunna f?? njuta av v??llagad restaurangmat
            utan att beh??va sitta och tr??ngas p?? en restaurang.
          </p>
        </section>
        <figure className="about-us-img" style={{ backgroundImage: `url(${chefCooking})`}}></figure>

        <figure className="our-food-img" style={{ backgroundImage: `url(${foodImg})`}}></figure>
        <section className="our-food">
          <div className="border">
            <h3>V??r mat</h3>
          </div>
          <p>
            Alla v??ra r??varor ??r lokalproducerade. Vi samarbetar med ett g??ng
            glada b??nder i V??rmland! V??ra kockar arbetar st??ndigt med att
            komponera nya, sp??nnande, smakrika r??tter! Dagliga kontroller
            genomf??rs f??r att s??kerst??lla att v??r mat h??ller den allra h??gsta
            standarden.
          </p>
        </section>

        <section className="quote-container">
          <p className="quote">"Rocksalt har den b??sta take-away maten i hela Sverige!"</p>
          <p>
           - New York Times, 2022
          </p>
        </section>
        <figure className="quote-img" style={{ backgroundImage: `url(${quoteImg})`}}></figure>


      <section className="map">
        <div className="info-where">
          <h4>Hitta till oss</h4>
          <div className="adress">
          <p>Lambergskajen 56</p>
          <p>652 21 Karlstad</p>
          <p className="open-text">Vi har ??ppet dygnet runt!</p>
          </div>
        </div>
        
    
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2032.774306644913!2d13.527552816657577!3d59.37010558167321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb17627d78491%3A0xe07a4122ee00218d!2sLambergskajen%2056%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1667916416392!5m2!1ssv!2sse" loading="lazy"></iframe>

      </section>
      </section>
    </main>
  );
};

export default LandingView;
