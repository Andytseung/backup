// Trim to common days (intersection)
// Treat value -999 as null and exclude it similar to null values
export function trimToCommonDays(dayArrays: string[][], valueArrays: any[][]) {
  const sets = dayArrays.map(arr => new Set(arr));
  const commonDays = [...sets[0]].filter(day => sets.every(s => s.has(day)));

  const trimmedDays = [];
  const trimmedValues = [];

  for (let i = 0; i < dayArrays.length; i++) {
    const dayArr = dayArrays[i];
    const valArr = valueArrays[i];

    const filteredDays = [];
    const filteredVals = [];

    for (let j = 0; j < dayArr.length; j++) {
      if (
        commonDays.includes(dayArr[j]) && 
        valArr[j] !== -999 // Treat -999 as missing, so exclude these values/days if you want
      ) {
        filteredDays.push(dayArr[j]);
        filteredVals.push(valArr[j]);
      }
      else if (commonDays.includes(dayArr[j]) && valArr[j] === -999) {
        // If you want to keep the day but convert the value to null:
        filteredDays.push(dayArr[j]);
        filteredVals.push(null);
      }
    }
    trimmedDays.push(filteredDays);
    trimmedValues.push(filteredVals);
  }

  return { trimmedDays, trimmedValues, commonDays };
}

// Align to union of days, filling missing values and -999 as null
export function alignToUnionDays(dayArrays: string[][], valueArrays: any[][]) {
  const allDaysSet = new Set<string>();
  for (const days of dayArrays) {
    days.forEach(day => allDaysSet.add(day));
  }
  const unionDays = Array.from(allDaysSet).sort((a: any, b: any) => a - b);

  const alignedDays = [];
  const alignedValues = [];

  for (let i = 0; i < dayArrays.length; i++) {
    const dayArr = dayArrays[i];
    const valArr = valueArrays[i];

    const dayToVal = new Map<string, any>();
    for (let j = 0; j < dayArr.length; j++) {
      // Save -999 as null here
      dayToVal.set(dayArr[j], valArr[j] === -999 ? null : valArr[j]);
    }

    const alignedDayArr = [];
    const alignedValArr = [];

    for (const day of unionDays) {
      alignedDayArr.push(day);
      alignedValArr.push(dayToVal.has(day) ? dayToVal.get(day) : null);
    }

    alignedDays.push(alignedDayArr);
    alignedValues.push(alignedValArr);
  }

  return { alignedDays, alignedValues, unionDays };
}
