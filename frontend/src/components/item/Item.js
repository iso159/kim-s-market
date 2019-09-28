import React from 'react'
import Slider from 'react-slick'

const Item = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        slideToScroll: 1 
    }

    return (
        <div>
            <Slider {...settings}>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
            </Slider>
        </div>
    );
}

export default Item;