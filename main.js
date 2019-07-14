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

        /* The instruction in index.html tells, that 
        only '{{ yourName }} knows JS!' should be output,
        but, since we already figured out, that the instruction 
        is a bit lacking (probably purposefully), I guess, 
        adding some sparkle would be considered even better. */
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

/* Adding const / let for cleaner declarations.
Leaving other questionable parts like having both 'enabled' and 'disabled'
properties in an object, as this might be a part of the riddle. */
const validation = {
  enabled: true,
  disabled: false
};
const queryParams = window.location.search.split("&");
let skillCheckerState = "disabled";
let checksum = 0;

// Changing var to let, as using var is generally discouraged.
for (let i = 0; queryParams.length > i; i++) {

  // Adding const for cleaner declarations.
  const qp = queryParams[i].split("=");
  const name = qp[0];
  const value = qp[1];
  if (skillCheckerState === "disabled" && value) {

    /* For reasons mentioned below, we will need to have
    skillCheckerState to have value `toString`, `hasOwnProperty`, etc.
    and for that there needs to be N + 1 symbols prepended to the 
    first query parameters value in URL. N stands for the length of
    first query parameter's name. Additional 1 symbol needs to be 
    prepended, because `name` string will have `?` as first symbol.  */
    skillCheckerState = value.substring(name.length);
  }

  /* Second URL query parameter must have name 'checksum'
  and it's value must be a number, equal to UTF-16 code of the last
  character of the name, that is typed in the input field,
  in order for `getCheckSum` function to return `true`. */
  if (name === "checksum") {
    checksum = value;
  }
}

/* 'validation[skillCheckerState]' must be truthy and 
'validation.hasOwnProperty(skillCheckerState)' must be falsy. 
That means, 'skillCheckerState' must be a string, which equals
a name of some property or method in Object's prototype chain, 
but it must not be validation object's own property.*/
if (validation[skillCheckerState]) {
  const checker = new SkillChecker();

  /* Need to use 'bind' method, because in 'validate' method
  'this' needs to be reference to 'checker' instance, and without using
  'bind', 'this' in 'validate' will be 'window'. 
  Also, to make code more readable, the click event handler could have been
  attached directly to the button. */
  window.addEventListener("click", checker.validate.bind(checker));
  validateButton.disabled = false;
  userNameInput.oninput = function(e) {
    checker.setName(e.target.value);
  };
}

function getCheckSum(name) {

  /* 'newCheckSum' receives value, equal to UTF-16 code of last letter
  of name in input field. Needless to say, splitting 'name' in to 
  array of characters and using 'reduce' for this purpose is not optimal. */
  const newCheckSum = name.split("").reduce((result, symbol) => {
    return symbol.charCodeAt(0);
  }, 0);

  /* In general, '==' should be avoided, it would more recommended to
  explicitly convert 'checksum' to number or 'newCheckSum'
  to string and then use '===' strict comparison. */
  return newCheckSum == checksum;
}
