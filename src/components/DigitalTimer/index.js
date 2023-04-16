// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, TimeLimitInMinutes: 25}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  decreaseTimeLimit = () => {
    const {TimeLimitInMinutes} = this.state

    if (TimeLimitInMinutes > 1) {
      this.setState(prevState => ({
        TimeLimitInMinutes: prevState.TimeLimitInMinutes - 1,
      }))
    }
  }

  increaseTimeLimit = () => {
    this.setState(prevState => ({
      TimeLimitInMinutes: prevState.TimeLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeInSeconds, TimeLimitInMinutes} = this.state
    const buttonIsDisabled = timeInSeconds > 0

    return (
      <div className="timer-set-container">
        <p className="time-set-heading">Set Timer Limit</p>
        <div className="time-limit-container">
          <button
            type="button"
            disabled={buttonIsDisabled}
            className="time-set-button"
            onClick={this.decreaseTimeLimit}
          >
            -
          </button>
          <div className="time-limit-inc-dec">
            <p className="time-limit">{TimeLimitInMinutes}</p>
          </div>
          <button
            type="button"
            disabled={buttonIsDisabled}
            className="time-set-button"
            onClick={this.increaseTimeLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  resetTime = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeInSeconds: 0,
      timeLimitInMinutes: 25,
    })
  }

  timePauseOrPlay = () => {
    const {isTimerRunning, timeInSeconds, TimeLimitInMinutes} = this.state
    const timeCompleted = timeInSeconds === TimeLimitInMinutes * 60

    if (timeCompleted) {
      this.setState({timeInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-operators-container">
        <button
          type="button"
          className="time-control-button"
          onClick={this.timePauseOrPlay}
        >
          <img src={imageUrl} alt={altText} className="icon-image" />
          <p className="paly-type-heading">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="time-control-button"
          onClick={this.resetTime}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon-image"
          />
          <p className="paly-type-heading">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInSeconds, TimeLimitInMinutes} = this.state
    const remainTimings = TimeLimitInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(remainTimings / 60)
    const seconds = Math.floor(remainTimings % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="responsive-container">
          <div className="timer-display-container">
            <div className="time-elapsed-container">
              <h1 className="timer-heading">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="label-text">{labelText}</p>
            </div>
          </div>
          <div className="time-controller-containers">
            {this.renderTimeController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
