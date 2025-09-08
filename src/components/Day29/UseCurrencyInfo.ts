import { useEffect, useState } from "react"

let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${`usd`}.json`

function UseCurrencyInfo() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch(url)
            .then((response) => response)
            .then((data) => data.json())
            .then((data) => setData(data))

    }, [])
    console.log(data)
    return (
    data
  )
}

export default UseCurrencyInfo
