import React from 'react'
import Carousel from 'react-material-ui-carousel'

function Carousel_hero() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "./images/car1.png"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: "https://cdn.vectorstock.com/i/1000v/27/09/hackathon-signs-round-design-template-thin-line-vector-28032709.jpg"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "./images/car3.jpeg"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "./images/car4.jpeg"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "https://i.pinimg.com/736x/e1/e8/a9/e1e8a9b4e434e432931582bfc76490b6.jpg"
        },
    ]

    return (
        <Carousel
            autoPlay="false"
            animation='slide'
            interval={3000}
            duration={1000}
            
            className='w-80'
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item({ item }) {
    return (
        <div className='h-96 w-80 rounded-lg p-2'>
            <img src={item.img} alt="" className='h-full rounded-lg'/>
            {/* <div className='absolute bottom-0 left-0 text-white p-4'>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>   */}
        </div>
    )
}

export default Carousel_hero