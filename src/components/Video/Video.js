import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import BarcodeInputField from '../BarcodeInput';
import VideoSkeleton from './VideoLayout';
import '../../styles/components/Video.css';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const Video = () => {
  const navigate = useNavigate();

  const [ videoInit, setVideoInit ] = useState(false);
  const [ videoError, setVideoError ] = useState(false);
  const [ attempts, setAttempts ] = useState(0);
  const [ barcode, setBarcode ] = useState(null);
  const toComponentB=()=>{
    navigate('/create',{state:{id:barcode}});
      }


  const onProductFound = () => {
      alert(barcode);
      setBarcode(barcode); 
  }

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    fetch(`https://world.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`)
      .then(res => res.json())
      .then(res => onInfoFetched(res));
  }

  const onInfoFetched = (res) => {
    const { status, code } = res;
    setBarcode(code);
    setAttempts(prevState => prevState + 1);

    if (status === 1) {
      onProductFound();
    } else {
      Quagga.onDetected(onDetected);
    }
  }

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          outerHeight: window.innerWidth,
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder : {
          readers : ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
          if (err) {
            setVideoError(true);
            return;
          }
          onInitSuccess();
      });
      Quagga.onDetected(onDetected);
      return () => Quagga.stop();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (attempts > 3) {
      onProductFound();
    }
  }, [attempts]);

  return (
    <div>
      <div className="video__explanation">
        <p>Scan Inventory Item</p>
      </div>
      <div className="video__container">
        {videoError ?
          <div className="skeleton__unsopported">
            <div>
              <p>Your device does not support camera access or something went wrong <span role="img" aria-label="thinking-face">🤔</span></p>
              <p>You can enter the barcode below</p>
              <BarcodeInputField />
            </div>
          </div>
          :
          <div>
            <div className="video" id="video" />
            {videoInit ? '' : <VideoSkeleton />}
          </div>
        }
        <button className='useBarcode' onClick={() => {toComponentB()}}>Use this Barcode / Input Barcode Manually</button>
      </div>
    </div>
    );
}

export default withRouter(Video);