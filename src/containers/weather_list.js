import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

  renderWeather(cityData) {

    //convert the units here

    function colorGen() {
      var x=Math.round(0xffffff * Math.random()).toString(16);
      var y=(6-x.length);
      var z="000000";
      var z1 = z.substring(0,y);
      var color = "#" + z1 + x;
      return color
    }

    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp * 9/5 -459.67) ;
    const preasures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr className="weatherRow" key={colorGen()}>
      <td><GoogleMap lon={lon} lat={lat}/></td>
      <td><Chart data={temps} color="red" units="F Average" /></td>
      <td><Chart data={preasures} color="green" units="hPa Average" /></td>
      <td><Chart data={humidities} color="blue" units="% Average" /></td>
      </tr>
    );
  }

  render() {
    return(
      <table  className=" weatherTableHead table table-hover">
      <thead>
      <tr>
      <th>City</th>
      <th>Temperature (F)</th>
      <th>Preasure (hPa)</th>
      <th>Humidity (%)</th>
      </tr>
      </thead>
      <tbody>
      {this.props.weather.map(this.renderWeather)}
      </tbody>
      </table>
    );
  }
}

function mapStateToProps( { weather } ) {
  return { weather }; // { weather: weather}
}

export default connect(mapStateToProps)(WeatherList);
