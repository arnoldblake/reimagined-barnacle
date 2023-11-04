import ShowWeather from "./showWeather"

const CountryDetail = ({c}) => {
    return (
        <div>
            <h3>Details</h3>
            <div>Capital {c.capital}</div>
            <div>Population {c.population}</div>
            <div><h3>Languages</h3>
                {
                    Object.keys(c.languages).map((key, index) => (
                            <div key={index}>{c.languages[key]}</div>
                    ))
                }
            </div>
            <h3>Flag</h3>
            <div className='flag'>{c.flag}</div>
            <ShowWeather country={c}/>
        </div>
    )
}

export default CountryDetail