import React, { useState } from 'react';
import {
  List,
  Cell,
  Avatar,
  PanelHeader,
  Panel,
  Group,
  Spinner,
  Select,
  Counter,
} from '@vkontakte/vkui';


const styles = {
    select: {
      marginBottom: '10px',
    },
    cell: {
        cursor: 'pointer',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
      avatar: {
        borderRadius: '50%',  
        width: '100px',      
        height: '100px',      
        backgroundColor: 'grey', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontSize: '50px', 
        color: 'white',   
      },
      friendsList: {
        marginTop: '10px',
        padding: '10px',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
      },
      friendsCounter: {
        cursor: 'pointer',},
      
  };
  

function GroupList({ groups }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [filterPrivacy, setFilterPrivacy] = useState('all');
  const [filterColor, setFilterColor] = useState('any');
  const [filterHasFriends, setFilterHasFriends] = useState(false);

  const toggleFriendsFilter = () => {
    setFilterHasFriends(!filterHasFriends);
  };

  const handleFriendsCountClick = (friends, e) => {
    e.stopPropagation(); 
    setSelectedFriends(friends);
  };


  
  const handleFriendClick = (friends) => {
    setSelectedFriends(friends || []); 
  };

  const filteredGroups = groups.filter((group) => {
    const privacyCondition = filterPrivacy === 'all' || (filterPrivacy === 'closed' && group.closed) || (filterPrivacy === 'open' && !group.closed);
    const colorCondition = filterColor === 'any' || group.avatar_color === filterColor;
    const friendsCondition = !filterHasFriends || (group.friends && group.friends.length > 0);
    return privacyCondition && colorCondition && friendsCondition;
  });

  const handlePrivacyChange = (e) => {
    setFilterPrivacy(e.target.value); 
  };
  
  const handleColorChange = (e) => {
    setFilterColor(e.target.value); 
  };

 
  return (
    <Panel id="main">
      <PanelHeader>Список групп</PanelHeader>
      <Group>
        <select value={filterPrivacy} onChange={handlePrivacyChange} style={styles.select}>
          <option value="all">Все группы</option>
          <option value="closed">Закрытые группы</option>
          <option value="open">Открытые группы</option>
        </select>
        <select value={filterColor} onChange={handleColorChange} style={styles.select}>
          <option value="any">Любой цвет</option>
          <option value="red">Красный</option>
          <option value="blue">Синий</option>
          <option value="green">Зеленый</option>
          <option value="purple">Фиолетовый</option>
          <option value="orange">Оранжевый</option>
          <option value="yellow">Желтый</option>
        </select>
        <label>
          <input type="checkbox" checked={filterHasFriends} onChange={toggleFriendsFilter} />
          Есть друзья в группе
        </label>

        <List>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <Cell
                key={group.id}
                style={styles.cell}

                onClick={() => setSelectedFriends(group.friends)}
              >
                <div style={{ ...styles.avatar, backgroundColor: group.avatar_color || 'grey' }} /> 
                <div>
                  <div>{group.name}</div>
                  <div>Тип группы: {group.closed ? 'Закрытая' : 'Открытая'}</div>
                  <div>{group.members_count} подписчиков</div>

                  {group.friends && (
                    <div 
                      style={styles.friendsCounter} 
                      onClick={(e) => handleFriendsCountClick(group.friends, e)}
                    >
                      {group.friends.length} друзей
                    </div>
                  )}
                </div>
              </Cell>
            ))
          ) : (
            <Spinner size="large" />
          )}
        </List>

        {selectedFriends && selectedFriends.length > 0 && (
          <div style={styles.friendsList}>
            {selectedFriends.map((friend, index) => (
              <Cell key={index} style={styles.cell}>
                {`${friend.first_name} ${friend.last_name}`}
              </Cell>
            ))}
          </div>
        )}
      </Group>
    </Panel>
  );
}

export default GroupList;
