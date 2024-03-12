
import React, { useState, useEffect } from 'react';
import { View, ScreenSpinner } from '@vkontakte/vkui';
import GroupList from './groupList.js';
import { fetchGroups } from './api';

function App() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchGroups();
        if (response.result === 1 && response.data) {
          setGroups(response.data);
        } else {
          console.error('Ошибка при получении данных с сервера');
        }
      } catch (error) {
        console.error('Ошибка при получении данных с сервера', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);


  return (
    <div id="main">
      <GroupList groups={groups} />
    </div>
  );

}

export default App;
