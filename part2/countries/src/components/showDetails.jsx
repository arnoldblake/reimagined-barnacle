import {useState} from 'react'
import CountryDetail from './countryDetail'

const ShowDetails = ({country}) => {
    const [toggle, setToggle] = useState(true)

    const onClick = () => {
        setToggle(toggle ? false : true)
    }

    return (
        <>
            <button onClick={onClick}>{toggle ? `Show` : `Hide`}</button>
            <div>
                {toggle ? null : <CountryDetail c={country}/>}
            </div>
        </>
    )
}

export default ShowDetails