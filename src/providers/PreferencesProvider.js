import React, {createContext, useState} from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({
  children,
  groupNumber,
  preferences,
  isCompleteItems,
  setPreferences,
  setIsCompleteItems,
}) => {
  const [focusedItem, setFocusedItem] = useState({name: '', group: 'group1'});

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 모달 열기 함수
  const onPressModalOpen = ({name, group}) => {
    setFocusedItem({name, group});
    setIsModalVisible(true);
  };

  // 모달 닫기 함수
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const onPressRandomPref = item => {
    setPreferences(prev => {
      const oppositeGroup = item.group === 'group1' ? 'group2' : 'group1';

      const randomOppositeItems =
        Object.keys(prev[oppositeGroup]).sort(() => Math.random() - 0.5) || [];
      const newPreferences = {
        ...prev,
        [item.group]: {
          ...prev[item.group],
          [item.name]: randomOppositeItems,
        },
      };
      return newPreferences;
    });
    setIsCompleteItems(prev => ({
      ...prev,
      [item.group]: {
        ...prev[item.group],
        [item.name]: true,
      },
    }));
  };

  const onRemovePrefOfItem = item => {
    setPreferences(prev => {
      const newPreferences = {
        ...prev,
        [item.group]: {
          ...prev[item.group],
          [item.name]: null,
        },
      };
      return newPreferences;
    });
    setIsCompleteItems(prev => ({
      ...prev,
      [item.group]: {
        ...prev[item.group],
        [item.name]: false,
      },
    }));
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
    onRemovePrefOfItem,
    onPressRandomPref,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
