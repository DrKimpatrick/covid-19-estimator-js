/* eslint-disable max-len */
const Power = (base, exponent) => {
  /**
     * 2*4
     * 2*2*2*2
     */
  if (exponent === 0) return 1;

  return base * Power(base, exponent - 1);
};

// var logString = '';

// // Logs
// const log = (data) => {
//   logString += data;
// };


const covid19ImpactEstimator = (data) => {
  /**
    {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
    }
    */
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  let days = timeToElapse;
  // Months to days
  if (periodType === 'months') {
    days = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    days = timeToElapse * 7;
  }

  // Factor
  const factor = Math.floor(days / 3);
  const multiplier = Power(2, factor);

  // currentlyInfected
  const impactCurrentlyInfected = reportedCases * 10;
  const serverImpactCurrentlyInfected = reportedCases * 50;

  // infectionsByRequestedTime
  const impactInfectionsByRequestedTime = multiplier * impactCurrentlyInfected;
  const severeImpactInfectionsByRequestedTime = multiplier * serverImpactCurrentlyInfected;

  // 15% of infectionsByRequestedTime.
  const impactSevereCasesByRequestedTime15 = (15 / 100) * impactInfectionsByRequestedTime;
  const severeCasesByRequestedTime15 = (15 / 100) * severeImpactInfectionsByRequestedTime;

  // 35 percent of the total beds
  const totalBeds35 = (35 / 100) * totalHospitalBeds;
  const impactBalanceBeds = totalBeds35 - impactSevereCasesByRequestedTime15;
  const severeBalanceBeds = totalBeds35 - severeCasesByRequestedTime15;


  const outPut = {
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: Math.trunc(impactSevereCasesByRequestedTime15),
      hospitalBedsByRequestedTime: Math.trunc(impactBalanceBeds),
      casesForICUByRequestedTime: Math.trunc((5 / 100) * impactInfectionsByRequestedTime),
      casesForVentilatorsByRequestedTime: Math.trunc((2 / 100) * impactInfectionsByRequestedTime),
      dollarsInFlight: Math.trunc((impactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days)
    },
    severeImpact: {
      currentlyInfected: serverImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime15),
      hospitalBedsByRequestedTime: Math.trunc(severeBalanceBeds),
      casesForICUByRequestedTime: Math.trunc((5 / 100) * severeImpactInfectionsByRequestedTime),
      casesForVentilatorsByRequestedTime: Math.trunc((2 / 100) * severeImpactInfectionsByRequestedTime),
      dollarsInFlight: Math.trunc((severeImpactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / days)
    }
  };

  return outPut;
};

module.exports = covid19ImpactEstimator;
