async function run() {
  const input = await Bun.file(new URL(`${import.meta.url}/../input.txt`)).text();
  const lines = input.split("\n");

  const strength = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

  const priority = {
    fiveOfKind: 1,
    fourOfKind: 2,
    fullHouse: 3,
    threeOfKind: 4,
    twoPair: 5,
    onePair: 6,
    highCard: 7,
  };

  // console.log("isFullHouse", isFullHouse(["2", "3", "3", "3", "2"]));
  // console.log("isThreeOfKind", isThreeOfKind(["T", "T", "T", "9", "6"]));
  // console.log("isTwoPair", isTwoPair(["2", "3", "4", "3", "2"]));
  // console.log("isOnePair", isOnePair(["A", "2", "3", "A", "4"]));
  // console.log('high', isHighCard(["A", "1","2","3","B"]));

  const mapped = lines
    .map((line) => {
      const [hand, bid] = line.split(" ");
      const type = getType(hand);
      return { hand, bid, type };
    })
    .sort((a, b) => {
      // If two hands have the same type, a second ordering rule takes effect.
      // Start by comparing the first card in each hand.

      if (a.type === b.type) {
        const aChar = a.hand.charAt(0)
        const bChar = b.hand.charAt(0)

        // If these cards are different, the hand with the stronger first card is considered stronger
        if (aChar !== bChar) {
          return strength.indexOf(aChar) > strength.indexOf(bChar) ? 1 : -1;
        }

        //  If the first card in each hand have the same label
        // however, then move on to considering the second card in each hand.
        
        // If they differ, the hand with the higher second card wins;
        // otherwise, continue with the third card in each hand, then the fourth, then the fifth.

        console.log(aChar, bChar)
        return 1;
      }

      if (a.type < b.type) {
        return 1;
      }

      return -1;
    });

  // console.log(mapped);

  function getType(hand: string) {
    const chars = hand.split("");
    const fiveOfKind = isFiveOfKind(chars);
    const fourOfKind = isFourOfKind(chars);
    const fullHouse = isFullHouse(chars);
    const threeOfKind = isThreeOfKind(chars);
    const twoPair = isTwoPair(chars);
    const onePair = isOnePair(chars);

    return fiveOfKind
      ? priority.fiveOfKind
      : fourOfKind
      ? priority.fourOfKind
      : fullHouse
      ? priority.fullHouse
      : threeOfKind
      ? priority.threeOfKind
      : twoPair
      ? priority.twoPair
      : onePair
      ? priority.onePair
      : priority.highCard;
  }

  function isFiveOfKind (chars: string[]) {
    return chars.every((char) => char === chars[0]);
  }

  type Pair = {
    [key: string]: number;
  };

  function isFourOfKind(chars: string[]) {
    const map: Pair = {};
    chars.forEach((char) => {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    });

    const found = Object.keys(map).filter((key) => {
      return map[key] === 4;
    });

    return found.length > 0;
  }

  function isFullHouse(chars: string[]) {
    const map: Pair = {};
    chars.forEach((char) => {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    });

    const hasThree: string[] = [];
    const hasTwo: string[] = [];
    Object.keys(map).forEach((key) => {
      if (map[key] === 3) {
        hasThree.push(key);
      }

      if (map[key] === 2) {
        hasTwo.push(key);
      }
    });

    if (hasThree.length === 0 || hasThree.length > 1) {
      return false;
    }

    if (hasTwo.length === 0 || hasTwo.length > 1) {
      return false;
    }

    console.log(chars);
    console.log(hasThree);
    console.log(hasTwo);

    // const unique = chars.filter((c, i) => hasThree.indexOf(c) === -1 && chars.indexOf(c) === i)
    // return unique.length === (chars.length - 3)

    return hasThree.length === 1 && hasTwo.length === 1;
  }

  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  function isThreeOfKind(chars: string[]) {
    const map: Pair = {};
    chars.forEach((char) => {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    });

    const hasThree: string[] = [];
    Object.keys(map).forEach((key) => {
      if (map[key] === 3) {
        hasThree.push(key);
      }
    });

    if (hasThree.length === 0 || hasThree.length > 1) {
      return false;
    }

    const unique = chars.filter((c, i) => hasThree.indexOf(c) === -1 && chars.indexOf(c) === i);
    return unique.length === chars.length - 3;
  }

  // where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  function isTwoPair(chars: string[]) {
    const map: Pair = {};
    chars.forEach((char) => {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    });

    const hasTwo: string[] = [];
    Object.keys(map).forEach((key) => {
      if (map[key] === 2) {
        hasTwo.push(key);
      }
    });

    if (hasTwo.length !== 2) {
      return false;
    }

    const unique = chars.filter((c, i) => hasTwo.indexOf(c) === -1 && chars.indexOf(c) === i);
    return unique.length === chars.length - 4;
  }

  // where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  function isOnePair(chars: string[]) {
    const map: Pair = {};
    chars.forEach((char) => {
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    });

    const hasTwo: string[] = [];
    Object.keys(map).forEach((key) => {
      if (map[key] === 2) {
        hasTwo.push(key);
      }
    });

    if (hasTwo.length !== 2) {
      return false;
    }

    const unique = chars.filter((c, i) => c !== hasTwo[0] && chars.indexOf(c) === i);

    return unique.length === chars.length - 2;
  }

  // where all cards' labels are distinct: 23456
  function isHighCard(chars: string[]) {
    const unique = [];

    for (const char of chars) {
      if (unique.indexOf(char) === -1) {
        unique.push(char);
      }
    }

    return unique.length === chars.length;
  }
}

run();
