import { useEffect, useState } from "react"
import weatherinfo from "../services/weatherinfo"

const Countries = ({mode, info}) => {
    if (mode === 0) {
        return (
            <div>
                {info}
            </div>
        )
    }
    else if (mode === 1) {
        return (
            <div>
                {info.map((country, i) => 
                    <div key={country.name.common}>
                        <Country mode={0} info={country}/>
                    </div>
                )}
            </div>
        )
    }
    else if (mode === 2) {
        return (
            <div>
                <Country mode={1} info={info} />
            </div>
        )
    }
}

const Country = ({mode, info}) => {
    const [showMode, setShowMode] = useState(mode)
    const [temperature, setTemperature] = useState(0)
    const [wIconUrl, setWIconUrl] = useState('')
    const [wind, setWind] = useState(0)

    useEffect(() => {
        if (showMode === 1) {
            weatherinfo.getWeather(info.capitalInfo.latlng[0], info.capitalInfo.latlng[1])
            .then(response => {
                setTemperature(parseInt(response.main.temp-273.15))
                setWIconUrl(`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                setWind(response.wind.speed)
            })
        }
    }, [showMode])

    if (showMode === 0) {
        return (
            <div>
                <p>
                    {info.name.common} <button onClick={() => 
                        {
                            if (showMode === 0) setShowMode(1)
                            else if (showMode === 1) setShowMode(0)
                        }
                    }>show</button>
                </p>
            </div>
        )
    }
    else if (showMode === 1) {
        const lstyle = {
            marginTop: 30
        }
        const languages = []
        Object.keys(info.languages).forEach(lkey => languages.push(info.languages[lkey]))
        return (
            <div>
                <button onClick={() => 
                        {
                            if (showMode === 0) setShowMode(1)
                            else if (showMode === 1) setShowMode(0)
                        }
                    }>hide</button>
                <h1>{info.name.common}</h1>
                <p>capital {info.capital[0]}</p>
                <p>area {info.area}</p>
                <p style={lstyle}><b>languages</b></p>
                <ul>
                    {languages.map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={info.flags['png']} />
                <h2>Weather in {info.capital}</h2>
                <p>temperature {temperature} Celcius</p>
                <img src={wIconUrl} />
                <p>wind {wind} m/s</p>
            </div>
        )
    }
}

export default Countries