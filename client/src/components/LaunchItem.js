import React from 'react'
import classNames from 'classnames';
import Moment from "react-moment";
import { Link } from 'react-router-dom';

function LaunchItem({
    launch: {
        flight_number,
        mission_name,
        details,
        launch_date_local,
        launch_success,
        launch_site: {
            site_name_long
        }
    }
}) {

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>Mission: <span className={classNames({
                        'text-success': launch_success,
                        'text-warning': launch_success === null,
                        'text-danger': !launch_success
                    })}>{mission_name}</span></h4>
                    <p>Date: <Moment format='DD-MM-YYYY'>{launch_date_local}</Moment></p>
                    <p>Time: <Moment format='HH:MM'>{launch_date_local}</Moment></p>
                </div>
                <div className="col-md-3">
                    <Link to={`/launch/${flight_number}`} className="btn btn-secondary">Launch Details</Link>
                </div>
            </div>
        </div>
    )
}

export default LaunchItem
