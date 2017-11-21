import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

  renderWeather(cityData) {
    console.log(cityData, 'cityData');
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={temps} color="red" units="K"/></td>
        <td><Chart data={pressures} color="gray" units="hPa"/></td>
        <td><Chart data={humidity} color="green" units="%"/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
          {console.log(this.props.weather, 'this.props.weather')}
        </tbody>
      </table>
    )
  }
}

function mapStateToProp(state) {
  console.log(state, 'state');
  return {
    weather: state.weather.weatherItem
  };
  // return {
  //   weather: state.weather
  // };
}

export default connect(mapStateToProp)(WeatherList);