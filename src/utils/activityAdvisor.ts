import { ActivityRecommendation, CurrentWeatherData, DailyWeatherData } from '../types';

export function calculateActivityRecommendations(
  current: CurrentWeatherData,
  daily: DailyWeatherData
): ActivityRecommendation[] {
  const recommendations: ActivityRecommendation[] = [];

  const temp = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const windGusts = current.wind_gusts_10m || windSpeed;
  const precip = current.precipitation;
  const humidity = current.relative_humidity_2m;
  const cloudCover = current.cloud_cover;
  const weatherCode = current.weather_code;
  const isDay = current.is_day;

  // Daily maximums for context
  const maxPrecipProb = daily.precipitation_probability_max[0] || 0;
  const precipSum = daily.precipitation_sum[0] || 0;
  const maxUv = daily.uv_index_max[0] || 0;
  const maxWind = daily.wind_speed_10m_max[0] || windSpeed;

  // 1. Cycling / Biking
  let cyclingStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let cyclingScore = 5;
  let cyclingReason = 'Mild wind and dry roads make for excellent cycling conditions.';
  let cyclingTip = 'Enjoy the ride! Maintain hydration.';

  if (weatherCode >= 95 || windGusts > 45 || precip > 5) {
    cyclingStatus = 'HAZARDOUS';
    cyclingScore = 1;
    cyclingReason = 'High winds or heavy thunderstorm makes cycling dangerous.';
    cyclingTip = 'Avoid cycling. High risk of skidding or lateral wind gusts.';
  } else if (windSpeed > 28 || precip > 0.8 || maxPrecipProb > 60 || temp < 2 || temp > 34) {
    cyclingStatus = 'NOT_RECOMMENDED';
    cyclingScore = 2;
    cyclingReason = windSpeed > 28 ? `Strong headwind/side-winds (${windSpeed} km/h).` : 'Wet or slippery road surfaces.';
    cyclingTip = 'Wear wind-resistant gear or stick to indoor trainers.';
  } else if (windSpeed > 18 || temp < 8 || temp > 28 || maxPrecipProb > 30) {
    cyclingStatus = 'MODERATE';
    cyclingScore = 3;
    cyclingReason = 'Moderate breezes or chilly temperatures.';
    cyclingTip = 'Layer up and check tire traction on damp corners.';
  }

  recommendations.push({
    id: 'cycling',
    title: 'CYCLING & BIKING',
    category: 'sports',
    status: cyclingStatus,
    iconName: 'bike',
    score: cyclingScore,
    headline: cyclingStatus === 'OPTIMAL' ? 'EXCELLENT RIDE WEATHER' : cyclingStatus === 'MODERATE' ? 'FAIR CYCLING CONDITIONS' : 'HIGH WIND / SLIPPERY ROADS',
    reasoning: cyclingReason,
    tip: cyclingTip,
    metricLabel: 'WIND SPEED',
    metricValue: `${windSpeed} km/h`,
  });

  // 2. Umbrella & Rain Gear
  let umbrellaStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let umbrellaScore = 5;
  let umbrellaReason = 'Zero rain detected. Clear skies overhead.';
  let umbrellaTip = 'No umbrella needed today.';

  if (precip > 2.0 || weatherCode >= 61 && weatherCode <= 67 || weatherCode >= 80) {
    umbrellaStatus = 'HAZARDOUS';
    umbrellaScore = 1;
    umbrellaReason = 'Active rain or heavy showers falling currently.';
    umbrellaTip = 'Carry a sturdy waterproof umbrella and rain jacket!';
  } else if (precip > 0.1 || maxPrecipProb > 50 || precipSum > 1.5) {
    umbrellaStatus = 'NOT_RECOMMENDED';
    umbrellaScore = 2;
    umbrellaReason = `High rain probability (${maxPrecipProb}%) or expected wet spell.`;
    umbrellaTip = 'Pack a compact umbrella in your bag just in case.';
  } else if (maxPrecipProb >= 25 || cloudCover > 70) {
    umbrellaStatus = 'MODERATE';
    umbrellaScore = 4;
    umbrellaReason = 'Overcast clouds. Low chance of brief drizzle.';
    umbrellaTip = 'Keep an eye on the sky if staying outdoors for hours.';
  }

  recommendations.push({
    id: 'umbrella',
    title: 'UMBRELLA & RAIN GEAR',
    category: 'gear',
    status: umbrellaStatus,
    iconName: 'umbrella',
    score: umbrellaScore,
    headline: umbrellaStatus === 'OPTIMAL' ? 'NO RAIN EXPECTED' : umbrellaStatus === 'MODERATE' ? 'LOW DRIZZLE CHANCE' : 'CARRY AN UMBRELLA',
    reasoning: umbrellaReason,
    tip: umbrellaTip,
    metricLabel: 'RAIN PROBABILITY',
    metricValue: `${maxPrecipProb}%`,
  });

  // 3. Outdoor Running / Jogging
  let runningStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let runningScore = 5;
  let runningReason = 'Ideal thermal comfort and clear air for outdoor workouts.';
  let runningTip = 'Great time for a PR or long-distance run!';

  if (temp > 35 || temp < -8 || weatherCode >= 95 || windGusts > 50) {
    runningStatus = 'HAZARDOUS';
    runningScore = 1;
    runningReason = 'Extreme temperature or severe weather active.';
    runningTip = 'Move your workout indoors to a treadmill.';
  } else if (temp > 29 || temp < 0 || precip > 1.0 || humidity > 88) {
    runningStatus = 'NOT_RECOMMENDED';
    runningScore = 2;
    runningReason = temp > 29 ? 'Heat advisory: high risk of heat exhaustion.' : 'Frigid or humid air reducing respiratory comfort.';
    runningTip = 'Hydrate frequently and pace yourself conservatively.';
  } else if (temp > 24 || temp < 5 || maxPrecipProb > 40) {
    runningStatus = 'MODERATE';
    runningScore = 3;
    runningReason = 'Warm thermal strain or mild moisture in the air.';
    runningTip = 'Wear breathable wicking fabrics.';
  }

  recommendations.push({
    id: 'running',
    title: 'RUNNING & JOGGING',
    category: 'sports',
    status: runningStatus,
    iconName: 'footprints',
    score: runningScore,
    headline: runningStatus === 'OPTIMAL' ? 'PRIME RUNNING CONDITIONS' : runningStatus === 'MODERATE' ? 'ACCEPTABLE OUTDOOR RUN' : 'HEAT / FRIGID WARNING',
    reasoning: runningReason,
    tip: runningTip,
    metricLabel: 'FEELS LIKE',
    metricValue: `${Math.round(current.apparent_temperature)}°C`,
  });

  // 4. UV Protection & Sun Safety
  let uvStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let uvScore = 5;
  let uvReason = 'Low UV index. Minimal sun damage risk.';
  let uvTip = 'Standard daylight outdoor activities are safe.';

  if (maxUv >= 8) {
    uvStatus = 'HAZARDOUS';
    uvScore = 1;
    uvReason = `Very High/Extreme UV Index (${maxUv}). Rapid skin burn risk!`;
    uvTip = 'Apply SPF 50+ sunscreen, wear UV sunglasses & wide hat. Limit midday sun.';
  } else if (maxUv >= 6) {
    uvStatus = 'NOT_RECOMMENDED';
    uvScore = 2;
    uvReason = `High UV Index (${maxUv}). Solar radiation is intense.`;
    uvTip = 'Reapply sunscreen every 2 hours and seek shade 11am-3pm.';
  } else if (maxUv >= 3) {
    uvStatus = 'MODERATE';
    uvScore = 3;
    uvReason = `Moderate UV Index (${maxUv}). Moderate sun exposure.`;
    uvTip = 'Wear sunglasses and apply SPF 30+ if staying out long.';
  }

  recommendations.push({
    id: 'sun_protection',
    title: 'UV & SUN SAFETY',
    category: 'daily',
    status: uvStatus,
    iconName: 'sun',
    score: uvScore,
    headline: uvStatus === 'OPTIMAL' ? 'LOW UV RISK' : uvStatus === 'MODERATE' ? 'MODERATE SUN EXPOSURE' : 'HIGH UV WARNING',
    reasoning: uvReason,
    tip: uvTip,
    metricLabel: 'MAX UV INDEX',
    metricValue: `${maxUv} / 11`,
  });

  // 5. Outdoor Laundry Drying
  let laundryStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let laundryScore = 5;
  let laundryReason = 'Low humidity, warm air and steady breeze will dry clothes rapidly.';
  let laundryTip = 'Perfect day to hang laundry outside on the line.';

  if (precip > 0 || maxPrecipProb > 50 || humidity > 85) {
    laundryStatus = 'NOT_RECOMMENDED';
    laundryScore = 1;
    laundryReason = 'High humidity or expected rain will keep clothes damp.';
    laundryTip = 'Use an indoor clothes drying rack or tumble dryer.';
  } else if (cloudCover > 80 || humidity > 70 || temp < 10) {
    laundryStatus = 'MODERATE';
    laundryScore = 3;
    laundryReason = 'Overcast or cool air will slow down evaporation rates.';
    laundryTip = 'Allow extra hours for thick fabrics to dry completely.';
  }

  recommendations.push({
    id: 'laundry',
    title: 'OUTDOOR LAUNDRY DRYING',
    category: 'daily',
    status: laundryStatus,
    iconName: 'shirt',
    score: laundryScore,
    headline: laundryStatus === 'OPTIMAL' ? 'RAPID CLOTHES DRYING' : laundryStatus === 'MODERATE' ? 'SLOW DRYING RATE' : 'RAIN / HIGH HUMIDITY',
    reasoning: laundryReason,
    tip: laundryTip,
    metricLabel: 'HUMIDITY',
    metricValue: `${humidity}%`,
  });

  // 6. Stargazing / Night Astronomy
  let astronomyStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let astronomyScore = 5;
  let astronomyReason = 'Clear dark skies with low cloud obstruction for viewing constellations.';
  let astronomyTip = 'Bring binoculars or a telescope to observe deep space.';

  if (cloudCover > 70 || precip > 0.2 || weatherCode >= 45) {
    astronomyStatus = 'NOT_RECOMMENDED';
    astronomyScore = 1;
    astronomyReason = 'Heavy cloud cover or fog obscuring stars.';
    astronomyTip = 'Wait for a clearer celestial window.';
  } else if (cloudCover > 30 || humidity > 80) {
    astronomyStatus = 'MODERATE';
    astronomyScore = 3;
    astronomyReason = 'Partial cloud patches or atmospheric haze present.';
    astronomyTip = 'Bright planets and the moon will still be easily visible.';
  }

  recommendations.push({
    id: 'stargazing',
    title: 'STARGAZING & ASTRONOMY',
    category: 'outdoors',
    status: astronomyStatus,
    iconName: 'sparkles',
    score: astronomyScore,
    headline: astronomyStatus === 'OPTIMAL' ? 'CLEAR NIGHT SKY' : astronomyStatus === 'MODERATE' ? 'PARTIAL CLOUD COVER' : 'POOR SKY VISIBILITY',
    reasoning: astronomyReason,
    tip: astronomyTip,
    metricLabel: 'CLOUD COVER',
    metricValue: `${cloudCover}%`,
  });

  // 7. Drone Flying / Model Aviation
  let droneStatus: ActivityRecommendation['status'] = 'OPTIMAL';
  let droneScore = 5;
  let droneReason = 'Gentle winds and clear line-of-sight visibility.';
  let droneTip = 'Ideal conditions for aerial photography & smooth flight.';

  if (windGusts > 35 || windSpeed > 25 || precip > 0.1 || weatherCode >= 45) {
    droneStatus = 'HAZARDOUS';
    droneScore = 1;
    droneReason = 'Excessive wind gusts or moisture threatening drone motor stability.';
    droneTip = 'Do not fly. High risk of flyaways or wind shear drift.';
  } else if (windSpeed > 18 || cloudCover > 85) {
    droneStatus = 'MODERATE';
    droneScore = 3;
    droneReason = 'Breezy conditions will consume battery faster.';
    droneTip = 'Keep drone close within visual line of sight and monitor voltage.';
  }

  recommendations.push({
    id: 'drone',
    title: 'DRONE FLYING & AVIATION',
    category: 'outdoors',
    status: droneStatus,
    iconName: 'plane',
    score: droneScore,
    headline: droneStatus === 'OPTIMAL' ? 'STABLE FLIGHT ZONE' : droneStatus === 'MODERATE' ? 'BREEZY - WATCH BATTERY' : 'HIGH WIND FLYAWAY RISK',
    reasoning: droneReason,
    tip: droneTip,
    metricLabel: 'WIND GUSTS',
    metricValue: `${windGusts} km/h`,
  });

  return recommendations;
}
