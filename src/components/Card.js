'use client'
import orderItems from '../data/list.json'
import { useState, useEffect, useRef } from 'react'
import {
  GiFastBackwardButton,
  GiFastForwardButton,
  GiReturnArrow,
} from 'react-icons/gi'
import * as motion from 'motion/react-client'

const Card = () => {
  const [index, setIndex] = useState(0)
  const [mouse, setMouse] = useState(false)
  const imgRef = useRef(null)

  const handleMouseOver = (e) => {
    setMouse(true)
  }

  useEffect(() => {
    imgRef.current.addEventListener('mouseover', handleMouseOver)
    return () => {
      imgRef.current.removeEventListener('mousever', handleMouseOver)
    }
  }, [])

  console.log(mouse)

  const slideLeft = () => {
    index === 0
      ? setIndex(orderItems.products.length - 1)
      : setIndex((index) => index - 1)
    setMouse(false)
  }

  const slideRight = () => {
    index === orderItems.products.length - 1
      ? setIndex(0)
      : setIndex((index) => index + 1)
    setMouse(false)
  }

  const slideReset = () => {
    setIndex(0)
    setMouse(true)
  }

  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'grey',
        borderRadius: 5,
      }}
      transition={{ duration: 2, ease: 'circInOut' }}
      animate={mouse ? { rotate: 360 } : { rotate: 0 }}
    >
      {orderItems.products
        .filter((itemx, i) => index === i)
        .map((item, i) => {
          return (
            <div key={i}>
              <img ref={imgRef} src={item.img} alt={item.title} />
              <p> {item.price}</p>
            </div>
          )
        })}
      <div className="container">
        <label>
          <GiFastBackwardButton onClick={slideLeft} />
          Geri
        </label>
        <label>
          <GiFastForwardButton onClick={slideRight} />
          İleri
        </label>
        <label>
          <GiReturnArrow onClick={slideReset} />
          En başa
        </label>
      </div>
    </motion.div>
  )
}
export default Card
