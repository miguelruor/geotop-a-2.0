import React, { Component } from 'react';
import './Times.css';

const formatTime = (timeLeftInMinutes) => {
  let hour = Math.floor(timeLeftInMinutes / 60);
  if (hour < 10) hour = '0' + hour;

  let minute = timeLeftInMinutes - 60 * hour;
  if (minute < 10) minute = '0' + minute;

  return `${hour}:${minute}`;
}

export default class Times extends Component {
  render() {
    return (
      <div className="times">
        <div className="times-content" style={{ backgroundColor: this.props.color, borderColor: this.props.bordercolor }}>
          <label id="timer-label">{this.props.timeLabel+": "+formatTime(600)}</label>
          <label id="timer-label2">{"Your local time:"}</label>
          <span id="time-left">{/*this.props.timeLeftInMinutes*/}{formatTime(this.props.timeLeftInMinutes)}</span>
        </div>
      </div>
    )
  }
}