import React, { useEffect } from 'react';
import { Carousel as _Carousel, Image } from 'antd';
import './Carousel.scss'

const Carousel = ( props ) => {
  // console.log(props)

  const pic_width = 440



  return (
    <div className='carousel'>
         <_Carousel>
            <div className='carousel-image-container'>
                {/* <h3>1</h3> */}
                <Image.PreviewGroup
                  items={props.pics}
                >
                  <Image
                    src={props.pics[0]}
                    width={pic_width}
                  />
                </Image.PreviewGroup>
            </div>
            <div className='carousel-image-container'>
              <Image.PreviewGroup
                items={props.pics}
              >
                <Image
                  src={props.pics[1]}
                  width={pic_width}
                />
              </Image.PreviewGroup>
            </div>
            <div className='carousel-image-container'>
              <Image.PreviewGroup
                items={props.pics}
              >
                <Image
                  src={props.pics[2]}
                  width={pic_width}
                />
              </Image.PreviewGroup>
            </div>
            <div className='carousel-image-container'>
              <Image.PreviewGroup
                items={props.pics}
              >
                <Image
                  src={props.pics[3]}
                  width={pic_width}
                />
              </Image.PreviewGroup>
            </div>
        </_Carousel>
    </div>
   
  );
};

export default Carousel;