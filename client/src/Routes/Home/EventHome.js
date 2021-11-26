import { Link } from "react-router-dom"

const EventHome = ({name, img, location, date, id}) => {

    return(
        <Link to={`/detailEvent/${name}`}>
            <div className='cont-eventHome'>
                <div className='eventHomeImg' style={{backgroundImage:`url(${img})`}}>
                </div>
                <div className='cont-infoEventoHome'>
                    <h3>{name}</h3>
                    <ul>
                        <li key={`${id}LL`}>{location}</li>
                        <li key={`${id}DD`}>{date}</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}

export default EventHome;