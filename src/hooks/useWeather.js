import { useState, useEffect } from 'react'

export default function useWeather(latitude, longitude) {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        url.searchParams.set('latitude', latitude)
        url.searchParams.set('longitude', longitude)
        url.searchParams.set(
          'current',
          'temperature_2m,relativehumidity_2m,weathercode,windspeed_10m'
        )
        url.searchParams.set(
          'daily',
          'temperature_2m_max,temperature_2m_min,weathercode'
        )
        url.searchParams.set('timezone', 'auto')
        url.searchParams.set('forecast_days', '6')

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error('Weather fetch failed')

        const data = await res.json()
        setCurrent(data.current)

        // Skip today (index 0), take next 5 days
        const days = data.daily.time.slice(1, 6).map((time, i) => ({
          time,
          temperature_2m_max: data.daily.temperature_2m_max[i + 1],
          temperature_2m_min: data.daily.temperature_2m_min[i + 1],
          weathercode: data.daily.weathercode[i + 1],
        }))
        setForecast(days)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [latitude, longitude])

  return { current, forecast, loading, error }
}
