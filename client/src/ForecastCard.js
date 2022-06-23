import React, {useState} from 'react';

const ForecastCard = ({date,average, forecast}) => {
    const[open, setOpen] = useState(false);
    return(
        <div className="forecast-card">
            <div className="forecast-info">
               <div className="forecast-date">{date}</div>
                
                  {average && <div className="forecast-average-temp">{average.toFixed(2)}&#176;C</div>}
            
               
            </div>
            <div className={open ? "forecast-by-time-box" : "forecast-by-time-box hidden-forecast"}>
                {
                    forecast.map((element, i) => (
                        <div key={i} className="forecast-inner-wrapper">
                            <p>{element.time.slice(0, element.time.lastIndexOf(":"))}</p>
                            <p>{element.temp}&#176;C</p>
                        </div>
                    ))
                }
            </div>

                <div className={open ? "arrow-icon open" : "arrow-icon"} onClick={() => setOpen(!open)}>
                <span className="left-bar"></span>
                <span className="right-bar"></span>
                </div>
         </div>
    )
}
export default ForecastCard;