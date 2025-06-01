import { useState } from "react"

const useCounter = (initialVal = 0) => {
    const [counter, setCounter] = useState<number>(initialVal)

    const plus = () => {
        setCounter(counter + 1)
    }

    function minus() {
        setCounter(counter - 1)
    }

    function reset() {
        setCounter(initialVal)
    }
    return { counter, plus, minus, reset }
}
export default useCounter
