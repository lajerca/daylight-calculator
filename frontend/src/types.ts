import { DateTime } from 'luxon'

export interface CoordsI {
  lat?: number
  lng?: number
}

export interface CardConfigI extends CoordsI {
  id: string
  date: DateTime
}

export interface SunlightItemResponseI {
  sunrise: string
  sunset: string
  solar_noon: string
  day_length: string
  civil_twilight_begin: string
  civil_twilight_end: string
  nautical_twilight_begin: string
  nautical_twilight_end: string
  astronomical_twilight_begin: string
  astronomical_twilight_end: string
}
