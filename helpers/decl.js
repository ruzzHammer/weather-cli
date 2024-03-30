const declOfPrepositionalCase = (word) => {
  switch (word.slice(-1)) {
    case "а": {
      return word.slice(0, -1) + "е";
    }
    case "и": {
      return word.slice(0, -1) + "ах";
    }
    default:
      return word + "е";
  }
};

export { declOfPrepositionalCase };
