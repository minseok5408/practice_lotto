document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generateButton");
  const resultElement = document.getElementById("result");
  const downloadButton = document.getElementById("downloadButton");
  const historyList = document.getElementById("historyList");

  let history = [];

  generateButton.addEventListener("click", function () {
    const numbers = generateLottoNumbers();
    numbers.sort((a, b) => a - b);
    resultElement.textContent = numbers.join(", ");

    // 이전 로또 번호 기록에 추가
    history.push(numbers);
    if (history.length > 5) {
      history.shift(); // 최대 5줄까지만 유지
    }

    updateHistoryList();
  });

  function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const lottoNum = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(lottoNum)) {
        numbers.push(lottoNum);
      }
    }
    return numbers;
  }

  function updateHistoryList() {
    historyList.innerHTML = ""; // 목록 초기화
    history.forEach((numbers, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `#${index + 1}: ${numbers.join(", ")}`;
      historyList.appendChild(listItem);
    });
  }

  downloadButton.addEventListener("click", function () {
    saveToFile();
  });

  function saveToFile() {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    const text = history
      .map((numbers, index) => `#${index + 1}: ${numbers.join(", ")}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `lotto_history_${dateString}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  }
});
