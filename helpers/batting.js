export function hitHR() {
  return [false, false, false];
}

export function hit3B() {
  return [false, false, true];
}

export function hit2B(pbasesResult) {
  const basesCopy = [...pbasesResult];
  const result = [false, true, false];
  result[2] = basesCopy[0];
  return result;
}

export function hit1B(pbasesResult) {
  const basesCopy = [...pbasesResult];
  const result = [true, false, false];
  result[2] = basesCopy[1];
  result[1] = basesCopy[0];
  return result;
}

export function doublePlay(pbasesResult) {
  const basesCopy = [...pbasesResult];
  const result = [true, false, false];
  if (basesCopy) {
    return [false, false, false];
  }
  basesCopy[2] = basesCopy[1];
  basesCopy[1] = false;
  basesCopy[0] = false;
  // Missing condition when runner on 2da or 3ra
  return result;
}

export function drawBases(dicenumber, bases) {
  const basesResult = [...bases];
  let result = [];

  if (dicenumber === 1) {
    // outs += outs + 1;
    result = basesResult;
  } else if (dicenumber === 2) {
    // outs += outs + 2;
    result = basesResult;
    // result = this.doublePlay(basesResult);
  } else if (dicenumber === 6) {
    result = hitHR();
  } else if (dicenumber === 5) {
    result = hit3B();
  } else if (dicenumber === 4) {
    result = hit2B(basesResult);
  } else if (dicenumber === 3) {
    result = hit1B(basesResult);
  }
  return result;
}
