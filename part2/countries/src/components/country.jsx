import ShowDetails from "./showDetails"

const Country = ({c}) => {
    return (
        <>
            {c.name.common} 
            <ShowDetails key={c.ccn3} country={c}/>
        </>
    )
}

export default Country