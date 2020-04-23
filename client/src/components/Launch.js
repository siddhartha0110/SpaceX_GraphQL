import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import classNames from 'classnames';
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number:Int!){
    launch(flight_number:$flight_number){
        flight_number,
        mission_name,
        launch_year,
        details,
        launch_success,
        launch_date_local,
        rocket{
            rocket_id
            rocket_name
            rocket_type
        }
        launch_site{
            site_name_long
        }
    }
}
`;

export class Launch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h3>Loading...</h3>
                            if (error) console.log(error)

                            const { flight_number, mission_name, launch_year, launch_success, details, launch_date_local,
                                rocket: { rocket_id, rocket_name, rocket_type },
                                launch_site: { site_name_long }
                            } = data.launch;
                            console.log(data.launch)
                            return <div>
                                <h1 className="display-4 my-3">
                                    <span className="text-dark">Mission: </span>
                                    {mission_name}
                                </h1>
                                <h4 className="mb-3">Launch Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">Flight Number: {flight_number}</li>
                                    <li className="list-group-item">Launch Year: {launch_year}</li>
                                    <li className="list-group-item">
                                        Launch Date and Time: <Moment format='DD-MM-YYYY HH:MM'>{launch_date_local}</Moment>
                                    </li>
                                    <li className="list-group-item">
                                        Launch Successfull: <span className={classNames({
                                        'text-success': launch_success,
                                        'text-danger': !launch_success
                                    })}>{launch_success ? 'YES' : "NO"}</span>
                                    </li>
                                    <li className="list-group-item">Launch Info: {details ? details : "No Info Available"}
                                    </li>
                                    <li className="list-group-item">Launch Site: {site_name_long}</li>

                                </ul>
                                <h4 className="my-3">Rocket Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">Rocket ID: {rocket_id}</li>
                                    <li className="list-group-item">Rocket Name: {rocket_name}</li>
                                    <li className="list-group-item">Rocket Type: {rocket_type}</li>
                                </ul>
                                <hr />
                                <Link to="/" className="btn btn-secondary">Back</Link>
                            </div>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launch
