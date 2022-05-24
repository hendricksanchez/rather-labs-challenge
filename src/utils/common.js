export const getUniqueIntId = () => {
  return Date.now();
}
 
export const handleCountdown = (timeleft, timetotal, callback) => {
  var progress = (timeleft / timetotal) * 100;
  if (typeof callback == "function") {
    callback(progress);
  }
  if(timeleft > 0) {
    setTimeout(() => {
      handleCountdown(timeleft - 1, timetotal, callback);
    }, 1000);
  }
}

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const waitFor = (seconds) => new Promise(r => setTimeout(r, seconds * 1000));