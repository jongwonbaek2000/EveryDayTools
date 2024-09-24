import React, {createContext, useState} from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({children, groupNumber}) => {
  const [focusedItem, setFocusedItem] = useState({name: '', group: 'group1'});
  const [preferences, setPreferences] = useState({group1: {}, group2: {}});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompleteItems, setIsCompleteItems] = useState({
    group1: {},
    group2: {},
  });

  // 모달 열기 함수
  const onPressModalOpen = ({name, group}) => {
    setFocusedItem({name, group});
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const addItemToPrefs = (item, selectedItem) => {
    setPreferences(prev => {
      const currentGroup = prev[item.group][item.name] || [];
      if (currentGroup.includes(selectedItem)) return prev;

      const newPreferences = {
        ...prev,
        [item.group]: {
          ...prev[item.group],
          [item.name]: currentGroup.concat(selectedItem),
        },
      };

      const oppositeGroup = item.group === 'group1' ? 'group2' : 'group1';
      const isComplete =
        newPreferences[item.group][item.name].length ===
        groupNumber[oppositeGroup];
      if (isComplete) {
        setIsCompleteItems(prev => ({
          ...prev,
          [item.group]: {
            ...prev[item.group],
            [item.name]: true,
          },
        }));
      }

      return newPreferences;
    });
  };

  const value = {
    focusedItem,
    setFocusedItem,
    preferences,
    isModalVisible,
    onPressModalOpen,
    onPressModalClose,
    setIsModalVisible,
    isCompleteItems,
    addItemToPrefs,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
