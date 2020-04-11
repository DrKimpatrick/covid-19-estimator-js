/* eslint-disable max-len */
const Power = (base, exponent) => {
  /**
       * 2*4
       * 2*2*2*2
       */
  if (exponent === 0) return 1;

  return base * Power(base, exponent - 1);
};


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
    reportedCases, periodType, timeToElapse
  } = data;
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

  const outPut = {
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: serverImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime
    }
  };

  return outPut;
};

export default covid19ImpactEstimator;
