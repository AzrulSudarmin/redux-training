const Style = (styles) => {
  let styleCombined = {};

  styles.forEach(currentStyle => {
    styleCombined = Object.assign(styleCombined, currentStyle);
  })

  return styleCombined;
}

export default Style;