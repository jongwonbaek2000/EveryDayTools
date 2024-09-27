export default async function deferredAcceptance(
  menPreferences,
  womenPreferences,
) {
  const men = Object.keys(menPreferences);
  const women = Object.keys(womenPreferences);

  // 자유로운 남성들 리스트
  let freeMen = [...men];
  const proposals = {}; // 남성들의 청혼 횟수
  const matches = {}; // 여성들의 매칭 결과

  // 초기화: 제안한 횟수를 모두 0으로 설정
  men.forEach(man => {
    proposals[man] = 0;
  });

  // 남자가 남아있을 때까지 매칭 진행
  while (freeMen.length > 0) {
    const man = freeMen.shift();
    const manPrefList = menPreferences[man];

    // 남성의 선호도 리스트가 남아있는지 확인
    if (proposals[man] < manPrefList.length) {
      const woman = manPrefList[proposals[man]];
      proposals[man]++;

      // 여성이 아직 매칭되지 않았을 경우 매칭
      if (!matches[woman]) {
        matches[woman] = man;
      } else {
        const currentMan = matches[woman];
        const womanPrefList = womenPreferences[woman];

        // 여성의 선호도에 따라 기존 남성과 새 남성 비교
        if (womanPrefList.indexOf(man) < womanPrefList.indexOf(currentMan)) {
          matches[woman] = man;
          freeMen.push(currentMan); // 기존 남성은 다시 미혼 상태
        } else {
          freeMen.push(man); // 새 남성은 다시 미혼 상태
        }
      }
    }
  }

  // 매칭이 되지 않은 남성 또는 여성을 처리 (길이가 다를 경우)
  const unmatchedMen = men.filter(man => !Object.values(matches).includes(man));
  const unmatchedWomen = women.filter(woman => !matches[woman]);

  return {matches, unmatchedMen, unmatchedWomen};
}

// 예제 데이터
const menPreferences = {
  A: ['X', 'Y', 'Z'],
  B: ['Z', 'X', 'Y'],
  C: ['Y', 'X', 'Z'],
  D: ['Y', 'X', 'Z'],
};

const womenPreferences = {
  X: ['B', 'A', 'C'],
  Y: ['A', 'C', 'B'],
  Z: ['A', 'B', 'C'],
};

deferredAcceptance(menPreferences, womenPreferences)
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
