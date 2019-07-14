class SkillChecker {
  constructor() {
    this.name = '';
  }

  validate(e) {
    if (e.target.id != "validateButton") {
      return;
    }

    if (!validation.hasOwnProperty(skillCheckerState)) {
      const name = this.name;
      if (getCheckSum(name)) {
        let response = `${name} knows JS!`;
        response += addSparkle();
        answer.innerHTML = response;
      } else {
        answer.innerHTML = "Almost...";
      }
    } else {
      answer.innerHTML = "Not yet.";
    }
  }

  setName(name) {
    this.name = name;
  }
}

validation = {
  enabled: true,
  disabled: false
};
queryParams = window.location.search.split("&");
skillCheckerState = "disabled";
checksum = 0;
for (var i = 0; queryParams.length > i; i++) {
  qp = queryParams[i].split("=");
  name = qp[0];
  value = qp[1];
  if (skillCheckerState === "disabled" && value) {
    skillCheckerState = value.substring(name.length);
  }
  if (name === "checksum") {
    checksum = value;
  }
}
if (validation[skillCheckerState]) {
  const checker = new SkillChecker();

  window.addEventListener("click", checker.validate);
  validateButton.disabled = false;
  userNameInput.oninput = function(e) {
    checker.setName(e.target.value);
  };
}

function getCheckSum(name) {
  const newCheckSum = name.split("").reduce((result, symbol) => {
    return symbol.charCodeAt(0);
  }, 0);

  return newCheckSum == checksum;
}
