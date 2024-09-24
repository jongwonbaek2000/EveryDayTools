import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import palette from '../styles/colors/colorPalette';

const unselectedName = '미선택';

const ICON_PATHS = {
  DEACTIVATED: require('../../assets/icons/cell-icon-deactivated.png'),
  ACTIVATED: require('../../assets/icons/cell-icon-activated.png'),
  DEFAULT: require('../../assets/icons/cell-icon-default.png'),
  ACTIVATED_2: require('../../assets/icons/cell-icon-activated-2.png'),
};

const getIconSource = (name, isModalVisible, isCompleteItem, prefNumber) => {
  if (name === unselectedName) return ICON_PATHS.DEACTIVATED;
  if (isModalVisible && prefNumber) return ICON_PATHS.ACTIVATED_2;
  if (!isModalVisible && isCompleteItem) return ICON_PATHS.ACTIVATED;
  return ICON_PATHS.DEFAULT;
};

const PreferenceGroup = ({
  group,
  title,
  subtitle,
  items,
  onPressModalOpen,
  isModalVisible,
  focusedItem,
  addItemToPrefs,
  preferences,
  isCompleteItems,
}) => {
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
      <ItemsRow
        group={group}
        items={fullItems.slice(0, 5)}
        focusedItem={focusedItem}
        isModalVisible={isModalVisible}
        onPressModalOpen={onPressModalOpen}
        addItemToPrefs={addItemToPrefs}
        preferences={preferences}
        isCompleteItems={isCompleteItems}
      />
      <ItemsRow
        group={group}
        items={fullItems.slice(5)}
        focusedItem={focusedItem}
        isModalVisible={isModalVisible}
        onPressModalOpen={onPressModalOpen}
        addItemToPrefs={addItemToPrefs}
        preferences={preferences}
        isCompleteItems={isCompleteItems}
      />
    </View>
  );
};

const ItemsRow = React.memo(
  ({
    group,
    items,
    onPressModalOpen,
    isModalVisible,
    addItemToPrefs,
    focusedItem,
    preferences,
    isCompleteItems,
  }) => (
    <View style={styles.items}>
      {items.map((item, index) => (
        <Item
          group={group}
          key={index}
          name={item}
          isModalVisible={isModalVisible}
          onPressModalOpen={onPressModalOpen}
          addItemToPrefs={addItemToPrefs}
          focusedItem={focusedItem}
          preferences={preferences}
          isCompleteItems={isCompleteItems}
        />
      ))}
    </View>
  ),
);

const Item = React.memo(
  ({
    group,
    name,
    onPressModalOpen,
    isModalVisible,
    addItemToPrefs,
    focusedItem,
    preferences,
    isCompleteItems,
  }) => {
    // 숫자를 나타낼 상태값 (임의로 추가한 예시)
    const [prefNumber, setPrefNumber] = React.useState(null); // 숫자가 없으면 null 또는 0

    const isCompleteItem = isCompleteItems
      ? isCompleteItems[group][name]
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
        const prefRanking = prefArrayOfFocusedItem.indexOf(name) + 1;

        if (isSelectedItemInPrefs) {
          setPrefNumber(prefRanking);
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
            {prefNumber && <Text style={styles.itemNumber}>{prefNumber}</Text>}

            <AutoHeightImage
              width={48}
              source={getIconSource(
                name,
                isModalVisible,
                isCompleteItem,
                prefNumber,
              )}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.itemName}>
          {name === unselectedName ? unselectedName : name}
        </Text>
      </View>
    );
  },
);

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
    marginTop: 8,
    fontSize: 12,
  },
});

export default PreferenceGroup;
