const updateHeight = async (arr, idx) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $($(".bar")[idx]).css({ height: `${arr[idx]}px` });
      resolve();
    }, delay);
  });
};

const updateColor = (arr, idx, color) => {
  $($(".bar")[idx]).css({ "background-color": color });
};
