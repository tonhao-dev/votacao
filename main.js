function loadPresidentMap() {
  const presidentsJSON = localStorage.getItem("presidents");

  if (!presidentsJSON) return new Map();
  return new Map(JSON.parse(presidentsJSON));
}

function getCurrentVote() {
  const presidentInput = document.querySelector("#president-name");
  const presidentName = presidentInput.value;

  return presidentName;
}

function storePresidentMap(presidentsMap) {
  localStorage.setItem("presidents", JSON.stringify([...presidentsMap]));
}

function sumVotes(presidentsMap) {
  let sum = 0;
  presidentsMap.forEach((countOfVotes) => (sum += countOfVotes));
  return sum;
}

function percentageVotes(countOfVotes, totalVotes) {
  if (totalVotes === 0) return 0;
  return Math.floor((countOfVotes * 100) / totalVotes);
}

function drawPresidentsCard(presidentsMap) {
  const presidentsList = document.querySelector("#president-list");
  const totalVotes = sumVotes(presidentsMap);

  let presidentsCards = String();
  for (const [presidentName, countOfVotes] of presidentsMap) {
    presidentsCards += `
      <li class="president">
        <div class="card">
            <div class="bg-gradient"></div>
            <div class="content">
                <img src="avatar.png">
                <div class="info">
                    <h2>${presidentName}</h2>
                    <button onclick="handleVote('${presidentName}')">Vote</button>
                </div>
                <div class="votes">
                    <progress value="${percentageVotes(
                      countOfVotes,
                      totalVotes
                    )}" max="100"></progress>
                    <label><span>${percentageVotes(
                      countOfVotes,
                      totalVotes
                    )}%</span>${countOfVotes}/${totalVotes}</label>
                </div>
            </div>
        </div>
    </li>
    `;
  }

  presidentsList.innerHTML = presidentsCards;
}

function refreshScreen(presidentsMap) {
  storePresidentMap(presidentsMap);
  drawPresidentsCard(presidentsMap);
}

function computerVote(presidentsMap, presidentName) {
  if (!presidentsMap.has(presidentName)) {
    presidentsMap.set(presidentName, 0);
  } else {
    presidentsMap.set(presidentName, presidentsMap.get(presidentName) + 1);
  }

  return presidentsMap;
}

function handleVote(presidentName) {
  const presidentsMap = loadPresidentMap();
  const newPresidentMap = computerVote(presidentsMap, presidentName);
  refreshScreen(newPresidentMap);
}

function clearPresidentName() {
  const presidentInput = document.querySelector("#president-name");
  presidentInput.value = "";
}

function addNewPresident() {
  const name = getCurrentVote();
  const presidentsMap = loadPresidentMap();

  if (presidentsMap.has(name)) {
    alert("This president already registered");

    clearPresidentName();
    return;
  }

  if (!name) {
    alert("President name is obrigatorio");
    return;
  }

  presidentsMap.set(name, 0);

  clearPresidentName();
  refreshScreen(presidentsMap);
}

drawPresidentsCard(loadPresidentMap());
console.log(sumVotes(loadPresidentMap()));
