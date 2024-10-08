import React, {useCallback, useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import palette from '../styles/colors/colorPalette';
import {PreferencesContext} from '../providers/PreferencesProvider';
const unselectedName = '미선택';

const ICON_PATHS = {
  DEACTIVATED: require('../../assets/icons/cell-icon-deactivated.png'),
  ACTIVATED: require('../../assets/icons/cell-icon-activated.png'),
  DEFAULT: require('../../assets/icons/cell-icon-default.png'),
  ACTIVATED_2: require('../../assets/icons/cell-icon-activated-2.png'),
};

const getIconSource = (name, isModal, isCompleteItem, prefNumber) => {
  if (name === unselectedName) return ICON_PATHS.DEACTIVATED;
  if (isModal && prefNumber) return ICON_PATHS.ACTIVATED_2;
  if (!isModal && isCompleteItem) return ICON_PATHS.ACTIVATED;
  return ICON_PATHS.DEFAULT;
};

const PreferenceGroup = ({group, title, subtitle, items, isModal}) => {
  // 10개 미만의 아이템일 경우 '미선택' 항목을 채워 넣음
  const fullItems = [...items];
  while (fullItems.length < 10) {
    fullItems.push(unselectedName); // 남은 공간을 '미선택'으로 채우기
  }

  return (
    <View style={styles.preferenceGroup}>
      {title && subtitle && (
        <View style={styles.textBlock}>
          <Text style={styles.textDefault}>{title}</Text>
          <Text style={styles.textSmall}>{subtitle}</Text>
        </View>
      )}
      <ItemsRow group={group} items={fullItems.slice(0, 5)} isModal={isModal} />
      <ItemsRow group={group} items={fullItems.slice(5)} isModal={isModal} />
    </View>
  );
};

const ItemsRow = React.memo(({group, items, isModal}) => (
  <View style={styles.items}>
    {items.map((item, index) => (
      <Item group={group} key={index} name={item} isModal={isModal} />
    ))}
  </View>
));

const Item = React.memo(({group, name, isModal}) => {
  // 숫자를 나타낼 상태값 (임의로 추가한 예시)
  const [prefNumber, setPrefNumber] = useState(null); // 숫자가 없으면 null 또는 0

  const {
    onPressModalOpen,
    isModalVisible,
    addItemToPrefs,
    focusedItem,
    preferences,
    isCompleteItems,
  } = useContext(PreferencesContext);

  const isCompleteItem = isCompleteItems
    ? isCompleteItems[group]?.[name]
    : null;

  const onPressItem = useCallback(() => {
    if (!isModalVisible && name !== unselectedName) {
      onPressModalOpen({name, group});
    } else if (name === unselectedName) {
      // Do nothing or any other logic if name is unselected
    } else {
      addItemToPrefs(focusedItem, name);
    }
  }, [
    addItemToPrefs,
    focusedItem,
    group,
    isModalVisible,
    name,
    onPressModalOpen,
  ]);

  useEffect(() => {
    if (focusedItem) {
      const prefArrayOfFocusedItem =
        preferences[focusedItem.group]?.[focusedItem.name] || [];

      const isSelectedItemInPrefs = prefArrayOfFocusedItem.includes(name);
      const prefRank = prefArrayOfFocusedItem.indexOf(name) + 1;

      if (isSelectedItemInPrefs) {
        setPrefNumber(prefRank);
      } else {
        setPrefNumber(null);
      }
    }
  }, [preferences, focusedItem, name]);

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPressItem} activeOpacity={0.6}>
        <View style={styles.iconContainer}>
          {/* 숫자가 있을 때만 표시되도록 설정 */}
          {isModal && prefNumber && (
            <Text style={styles.itemNumber}>{prefNumber}</Text>
          )}

          <AutoHeightImage
            width={48}
            source={getIconSource(name, isModal, isCompleteItem, prefNumber)}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.itemName}>
        {name === unselectedName ? unselectedName : name}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  preferenceGroup: {
    marginBottom: 24,
  },
  textBlock: {
    marginBottom: 16,
  },
  textDefault: {
    fontSize: 16,
    color: 'black',
    marginBottom: 9,
  },
  textSmall: {
    fontSize: 12,
    color: palette._7,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  item: {
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative', // 아이콘과 숫자를 감싸는 부모 컨테이너
    width: 48,
    height: 48, // 아이콘 크기에 맞춘 컨테이너 높이
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNumber: {
    position: 'absolute',
    top: -14, // 아이콘 위에 숫자를 표시하기 위해 top을 음수로 설정
    fontSize: 12,
    color: palette.secondary, // 숫자의 색상 설정
    fontWeight: 'bold',
    textAlign: 'center', // 숫자를 가로 중앙에 위치시킴
    width: '100%', // 아이콘의 가로 중앙에 위치하도록 폭을 아이콘 크기와 맞춤
  },
  itemName: {
    color: palette._7,
    marginTop: 1,
    fontSize: 12,
  },
});

export default PreferenceGroup;
