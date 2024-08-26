window.addEventListener("DOMContentLoaded", () => {
  const startDate = "2024-06-27T12:00:00";
  const names = ["S.K", "M.B.D", "G.U", "S.E"];

  function getShiftInfo() {
    const now = new Date();
    const start = new Date(startDate);
    const msInWeek = 7 * 24 * 60 * 60 * 1000; // ms for a week
    const weeksPassed = Math.floor((now - start) / msInWeek);
    const currentIndex = weeksPassed % names.length;
    const currentShift = names[currentIndex];
    const nextIndex = (currentIndex + 1) % names.length;
    const nextShift = names[nextIndex];
    return { currentShift, currentIndex, nextShift, now };
  }

  function displayShiftInfo() {
    const shiftInfo = getShiftInfo();
    document.getElementById("currentShift").innerText = shiftInfo.currentShift;
    document.getElementById("nextShift").innerText = shiftInfo.nextShift;
  }

  displayShiftInfo();

  function formatDate(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("tr-TR", options).replace(",", "");
  }

  function generateYearlyShifts() {
    const start = new Date(startDate);
    const msInWeek = 7 * 24 * 60 * 60 * 1000; // ms for a week
    const shiftTableBody = document.getElementById("shiftTableBody");
    const add = new Date().getFullYear();
    const yearEnd = new Date(`${add + 2}-06-27T12:00:00`);
    const { now, currentIndex } = getShiftInfo();
    let currentShiftStart = new Date(start);
    let index = 0;

    while (currentShiftStart < yearEnd) {
      const currentShiftEnd = new Date(currentShiftStart.getTime() + msInWeek);

      const row = document.createElement("tr");

      // Highlight the current shift based on the date range
      if (now >= currentShiftStart && now < currentShiftEnd) {
        row.classList.add("highlight");
      }

      const nameCell = document.createElement("td");
      nameCell.innerText = names[index % names.length];
      row.appendChild(nameCell);

      const startCell = document.createElement("td");
      startCell.innerText = formatDate(currentShiftStart);
      row.appendChild(startCell);

      const endCell = document.createElement("td");
      endCell.innerText = formatDate(currentShiftEnd);
      row.appendChild(endCell);

      shiftTableBody.appendChild(row);

      currentShiftStart = currentShiftEnd;
      index++;
    }
  }

  generateYearlyShifts();
});
