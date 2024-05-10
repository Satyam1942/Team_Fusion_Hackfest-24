import { useEffect, useState } from "react";
import bg1 from "./images/bg-1.png";
import bg2 from "./images/bg-2.jpg";
import bg3 from "./images/bg-3.jpg";
import bg4 from "./images/bg-4.jpg";
// import bg6 from "./assets/bg6.jpg";


function BackgroundSlideshow(){

    const [currentImageIndex, setCurrentIndex] = useState(0);
    const backgroundImageList = [bg1,bg2,bg3,bg4];
    const time = 5000;
    const transitionDuration = 500; 

    const [nextBackgroundImageLoaded, setNextBackgroundImageLoaded] = useState(false);

    useEffect(()=>{
        const slideShowInterval = setInterval(()=>{
                setCurrentIndex((currentImageIndex)=>currentImageIndex = (currentImageIndex+1)%backgroundImageList.length)
              // console.log(backgroundImageList[currentImageIndex])
        },time);

        return ()=>clearInterval(slideShowInterval);
    },[backgroundImageList]);

    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImageList[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        transition: `opacity ${transitionDuration/1000}s ease`,
        opacity: nextBackgroundImageLoaded? 1:0
      };

      useEffect(() => {
        const imagePreload = new Image();
        const nextIndex = (currentImageIndex + 1) % backgroundImageList.length;
        imagePreload.src = backgroundImageList[nextIndex];
        imagePreload.onload = ()=>{
          setNextBackgroundImageLoaded(true);
        }
      
        return () => {
          imagePreload.onload = null; // Clean up
        };
      }, [currentImageIndex,backgroundImageList]);

      return (
      <div style={backgroundImageStyle}></div>
      );
}
export default BackgroundSlideshow;