import React, { useState } from 'react'
import ButtonGroup from './ButtonGroup'
import Counter from './Counter'

function Parent() {

    const [ counter , setCounter] = useState(0)
    const [limit , setLimit] = useState(false)
    
    const increaseValue = () =>{
        if(counter < 20) {
            const newCount = counter +1
            setCounter(newCount)
            if(20 === newCount){
                setLimit(true)
            }
        }
        
    }
    const decreaseValue = () => {
        if (counter > -20) {
          const newCount = counter - 1
          setCounter(newCount)
          if(20 === newCount) {
            setLimit(true)
          }
        }
    }
    const resetValue = () => {
      setCounter(0)
      setLimit(false)
    }
  return (
    <div>
      <Counter
      counterValue={counter}
      limit={limit}

      />
      <ButtonGroup
      addValue={increaseValue}
      removeValue={decreaseValue}
      resetValue={resetValue}
      limit={limit}
      />

    </div>
  )
}

export default Parent
