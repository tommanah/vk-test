
export function fetchGroups() {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch('/groups.json')
          .then(response => response.json())
          .then(data => {
            resolve({
              result: 1,
              data: data,
            });
          })
          .catch(error => {
            console.error('Ошибка при получении данных с сервера', error);
            resolve({ result: 0 }); 
          });
      }, 1000);
    });
  }
  
