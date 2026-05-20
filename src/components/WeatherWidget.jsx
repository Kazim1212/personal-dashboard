import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets } from 'lucide-react'
import Card from './Card'
import useWeather from '../hooks/useWeather'
import { CONFIG } from '../App'
import styles from './WeatherWidget.module.css'

const WMO_ICONS = {
  0: { icon: Sun, label: 'Clear sky' },
  1: { icon: Sun, label: 'Mainly clear' },
  2: { icon: Cloud, label: 'Partly cloudy' },
  3: { icon: Cloud, label: 'Overcast' },
  61: { icon: CloudRain, label: 'Light rain' },
  63: { icon: CloudRain, label: 'Moderate rain' },
  65: { icon: CloudRain, label: 'Heavy rain' },
  71: { icon: CloudSnow, label: 'Light snow' },
  73: { icon: CloudSnow, label: 'Moderate snow' },
  80: { icon: CloudRain, label: 'Rain showers' },
  95: { icon: CloudRain, label: 'Thunderstorm' },
}

function getWeatherIcon(code) {
  return WMO_ICONS[code] || { icon: Cloud, label: 'Unknown' }
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeatherWidget() {
  const { current, forecast, loading, error } = useWeather(
    CONFIG.weather.latitude,
    CONFIG.weather.longitude
  )

  if (loading) {
    return (
      <Card title="Weather" icon={<Sun size={14} />}>
        <div className={`skeleton ${styles.skeleton}`} />
      </Card>
    )
  }

  if (error || !current) {
    return (
      <Card title="Weather" icon={<Sun size={14} />}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          Could not load weather data.
        </p>
      </Card>
    )
  }

  const { icon: WeatherIcon, label } = getWeatherIcon(current.weathercode)

  return (
    <Card title="Weather" icon={<Sun size={14} />}>
      <div className={styles.location}>{CONFIG.weather.city}</div>

      <div className={styles.main}>
        <div className={styles.tempBlock}>
          <WeatherIcon size={40} className={styles.mainIcon} strokeWidth={1.5} />
          <span className={styles.temp}>{Math.round(current.temperature_2m)}°</span>
        </div>
        <div className={styles.condition}>{label}</div>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <Wind size={13} />
          <span>{Math.round(current.windspeed_10m)} km/h</span>
        </div>
        <div className={styles.detail}>
          <Droplets size={13} />
          <span>{current.relativehumidity_2m}%</span>
        </div>
      </div>

      {forecast.length > 0 && (
        <div className={styles.forecast}>
          {forecast.map((day, i) => {
            const { icon: DayIcon } = getWeatherIcon(day.weathercode)
            const d = new Date(day.time)
            return (
              <div key={i} className={styles.forecastDay}>
                <span className={styles.dayLabel}>{DAYS[d.getDay()]}</span>
                <DayIcon size={16} className={styles.dayIcon} strokeWidth={1.5} />
                <span className={styles.dayTemp}>{Math.round(day.temperature_2m_max)}°</span>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
