function addTomatoTime(inputHours) {
    let totalMinutes = inputHours * 60 + 25;
    const newHours = totalMinutes / 60;
      
    return newHours;
}
      
  