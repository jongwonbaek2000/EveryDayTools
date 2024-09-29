import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView, // ScrollView 추가
} from 'react-native';
import layout from '../styles/layouts/layout';
import palette from '../styles/colors/colorPalette';
import AutoHeightImage from 'react-native-auto-height-image';
import deferredAcceptance from '../lib/deferredAcceptance';
import BottomButton from '../components/BottomButton';

const Item = React.memo(({name, onPressModalOpen}) => (
  <View style={styles.item}>
    <TouchableOpacity activeOpacity={0.6}>
      <AutoHeightImage
        width={48}
        source={require('../../assets/icons/cell-icon-activated.png')}
      />
    </TouchableOpacity>
    <Text style={styles.itemName}>{name}</Text>
  </View>
));

function OutputScreen({navigation, route}) {
  const lineBetweenOffset = 24;
  const lineBetweenHeight = 77;
  // const {group1, group2} = route.params.preferences;
  // const groupTitles = route.params.groupTitles;
  const {preferences, groupTitles} = route.params || {};
  const {group1, group2} = preferences || {};

  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState({
    matches: {},
    matchedWomen: [],
    matchedMen: [],
    unmatchedWomen: [],
    unmatchedMen: [],
  });

  const doMatches = useCallback(async () => {
    setLoading(true); // 로딩 시작
    try {
      const {matches, unmatchedMen, unmatchedWomen} = await deferredAcceptance(
        group1,
        group2,
      );
      const matchedWomen = Object.keys(matches);
      const matchedMen = Object.values(matches);
      // 1초 딜레이 추가 (테스트용)
      await new Promise(resolve => setTimeout(resolve, 50));
      setMatchData({
        matches,
        matchedWomen,
        matchedMen,
        unmatchedWomen,
        unmatchedMen,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // 로딩 종료
    }
  }, [group1, group2]);

  useEffect(() => {
    doMatches();
    console.log(unmatchedMen);
  }, [doMatches, unmatchedMen]);

  const {matchedMen, matchedWomen, unmatchedMen, unmatchedWomen} = matchData;

  return (
    <View style={styles.container}>
      {loading ? ( // 로딩 중일 때 ActivityIndicator 표시
        <ActivityIndicator size="large" color={palette.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>매칭된 아이템들</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{groupTitles.group1}</Text>
            <Text style={styles.text}>{groupTitles.group2}</Text>
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.itemsContainer,
              {height: matchedMen.length * lineBetweenHeight + 20}, // 동적 높이 설정
            ]}>
            <View style={styles.leftColumn}>
              {matchedMen.map((item, index) => (
                <Item key={index} name={item} onPressModalOpen={() => {}} />
              ))}
            </View>
            {matchedMen.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.lineBetween,
                  {marginTop: lineBetweenOffset + lineBetweenHeight * index},
                ]}
              />
            ))}
            <View style={styles.rightColumn}>
              {matchedWomen.map((item, index) => (
                <Item key={index} name={item} onPressModalOpen={() => {}} />
              ))}
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>매칭되지 않은 아이템들</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{groupTitles.group1}</Text>
            <Text style={styles.text}>{groupTitles.group2}</Text>
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.itemsContainer,
              {height: unmatchedMen.length * lineBetweenHeight + 40}, // 동적 높이 설정
            ]}>
            <View style={styles.leftColumn}>
              {unmatchedMen.map((item, index) => (
                <Item key={index} name={item} onPressModalOpen={() => {}} />
              ))}
            </View>
            <View style={styles.rightColumn}>
              {unmatchedWomen.map((item, index) => (
                <Item key={index} name={item} onPressModalOpen={() => {}} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      <BottomButton
        title="처음으로"
        onPress={() => navigation.navigate('HomeTab')}
      />
    </View>
  );
}

const lineWidthRatio = 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1, // ScrollView에 flexGrow 추가
    alignItems: 'center',
    marginBottom: 300,
  },
  textContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  text: {fontSize: 16, color: 'black'},
  itemsContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  leftColumn: {flexDirection: 'column', position: 'absolute', left: `22%`},
  rightColumn: {flexDirection: 'column', position: 'absolute', right: `22%`},
  line: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: palette._d9,
    width: `${layout.widthSystem * 100}%`,
    justifyContent: 'center',
  },
  lineBetween: {
    marginTop: 24,
    borderTopWidth: 3,
    borderColor: palette._7,
    width: `${lineWidthRatio * 100}%`,
    justifyContent: 'center',
    position: 'absolute',
    left: `${0.5 * (1 - lineWidthRatio) * 100}%`,
  },
  item: {
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    color: palette._7,
    fontSize: 12,
  },
});

export default OutputScreen;
