import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import BottomButton from '../components/BottomButton';
import palette from '../styles/colors/colorPalette';
import layout from '../styles/layouts/layout';

const GaleShapleyArticle = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.articleTitle}>게일-세플리 알고리즘</Text>

      <Text style={styles.articleText}>
        게일-세플리(Gale-Shapley) 알고리즘은{' '}
        <Text style={styles.boldText}>안정 매칭</Text> 문제를 해결하기 위해
        설계된 알고리즘입니다. 이 알고리즘은 두 그룹 간의 매칭을 통해, 각 그룹의
        모든 구성원이 자신에게 가장 적합한 상대와 짝을 이루도록 합니다. 이를
        통해 <Text style={styles.boldText}>안정적인 매칭</Text>을 보장하는데,
        여기서 <Text style={styles.boldText}>안정적</Text>
        이라는 의미는 어떤 두 사람이 기존 짝을 떠나 서로를 더 선호하는 일이
        없다는 것입니다.
      </Text>

      <Text style={styles.sectionTitle}>예시 상황</Text>
      <Text style={styles.articleText}>
        이해를 돕기 위해 결혼 상대를 찾는 상황을 생각해 봅시다. 한 그룹에는
        남성들, 다른 그룹에는 여성들이 있습니다. 남성들은 자신이 선호하는
        여성들의 순위를 매기고, 여성들도 마찬가지로 자신이 선호하는 남성들의
        순위를 매깁니다. 여기서 중요한 목표는 각 남성과 여성이 서로를 만족스럽게
        매칭하는 것입니다.
      </Text>

      <Text style={styles.sectionTitle}>알고리즘 작동 방식</Text>
      <Text style={styles.articleText}>
        1. <Text style={styles.boldText}>남성 제안</Text>: 알고리즘은
        남성들로부터 시작됩니다. 남성들은 자신이 선호하는 여성에게 순서대로
        프로포즈를 합니다.
      </Text>
      <Text style={styles.articleText}>
        2. <Text style={styles.boldText}>여성의 선택</Text>: 프로포즈를 받은
        여성은 자신이 받은 제안들 중에서 가장 선호하는 남성의 제안을 "임시로"
        수락하고, 나머지 제안은 거절합니다. 이때, 여성이 아직 짝이 없는 상태라면
        바로 수락하며, 이미 다른 남성의 제안을 수락한 상태라면 더 선호하는
        남성을 선택합니다.
      </Text>
      <Text style={styles.articleText}>
        3. <Text style={styles.boldText}>반복</Text>: 거절당한 남성은 자신의
        다음 순위에 있는 여성에게 프로포즈를 하며, 이 과정은 모든 남성들이 짝을
        찾을 때까지 반복됩니다.
      </Text>
      <Text style={styles.articleText}>
        4. <Text style={styles.boldText}>종료</Text>: 모든 남성과 여성이 짝을
        찾으면 알고리즘이 종료되고, 그 결과는 안정적인 매칭입니다. 어떤 남성도
        자신이 더 선호하는 여성에게 가려 하지 않고, 여성들도 자신이 더 선호하는
        남성을 떠올리지 않는 매칭 상태를 만들게 됩니다.
      </Text>

      <Text style={styles.sectionTitle}>중요한 특징</Text>
      <Text style={styles.articleText}>
        - <Text style={styles.boldText}>안정성</Text>: 두 사람이 서로를 더
        선호하는데도 불구하고 다른 상대와 매칭된 경우가 없으므로, 불만족을
        최소화할 수 있습니다.
      </Text>
      <Text style={styles.articleText}>
        - <Text style={styles.boldText}>최적성</Text>: 남성 중심으로 알고리즘을
        시작하면 남성에게 유리한 매칭이, 여성 중심으로 시작하면 여성에게 유리한
        매칭이 나옵니다.
      </Text>

      <Text style={styles.sectionTitle}>일상에서의 활용</Text>
      <Text style={styles.articleText}>
        게일-세플리 알고리즘은 결혼 매칭 외에도 다양한 분야에서 사용됩니다. 예를
        들어:
      </Text>
      <Text style={styles.articleText}>
        - <Text style={styles.boldText}>대학 입시</Text>: 학생들이 원하는 대학에
        지원하고, 대학이 선호하는 학생들을 선택하는 과정을 매칭합니다.
      </Text>
      <Text style={styles.articleText}>
        - <Text style={styles.boldText}>병원 레지던시 프로그램</Text>: 의대
        졸업생들이 원하는 병원에 지원하고, 병원이 선호하는 학생을 선택하는
        방식으로 배정됩니다.
      </Text>

      <Text style={styles.articleText}>
        이 알고리즘은 두 집단의 선호도를 바탕으로 효율적이고 공정한 매칭을
        구현할 때 매우 유용합니다.
      </Text>
    </View>
  );
};

const AlgorithmHeader = ({smallText, title}) => (
  <>
    <Text style={styles.smallText}>{smallText}</Text>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.smallLine} />
  </>
);

const AlgorithmImage = ({width, source}) => (
  <AutoHeightImage
    width={Math.round(width * layout.widthSystem)}
    source={source}
  />
);

const AlgorithmScreen = ({navigation}) => {
  const {width} = useWindowDimensions();

  const handleStart = () => navigation.navigate('GroupSetting');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <AlgorithmHeader
            smallText="선호도 매칭"
            title="Gale-Shaply Algorithm"
          />
          <AlgorithmImage
            width={width}
            source={require('../../assets/icons/gale-shaply-image.jpg')}
          />
          <GaleShapleyArticle />
        </View>
      </ScrollView>
      <BottomButton title="시작하기" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  smallLine: {
    borderTopWidth: 1,
    borderColor: palette._7,
    width: 37,
    marginBottom: 30,
  },
  smallText: {
    fontSize: 12,
    marginTop: 30,
    color: palette._7,
  },
  title: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 15,
    color: 'black',
  },
  textContainer: {
    marginTop: 22,
    width: `${(layout.widthSystem + 0.05) * 100}%`,
    alignItems: 'flex-start',
    marginBottom: 300,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: palette.comfortableBlack,
  },
  articleText: {
    fontSize: 16,
    marginBottom: 10,
    color: palette._7,
    lineHeight: 35,
  },
  boldText: {
    fontWeight: 'bold',
    color: palette.comfortableBlack,
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: palette.comfortableBlack,
  },
});

export default AlgorithmScreen;
