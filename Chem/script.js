document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
  
    fetch('ChemMatch.json')
      .then(response => {
        console.log("Fetching JSON data");
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log("JSON data loaded", data);
        buildTree(data, document.getElementById('tree'));
      })
      .catch(error => console.error('Error loading JSON data:', error));
    
    function buildTree(data, container) {
      const ul = document.createElement('ul');
      container.appendChild(ul);
      buildNodes(data, ul);
      console.log("Tree built");
    }
  
    function buildNodes(data, container) {
      for (const key in data) {
        const li = document.createElement('li');
        
        if (Array.isArray(data[key])) {
          // If the value is an array, list its items
          li.textContent = key; // Display the category key
          container.appendChild(li);
  
          const subUl = document.createElement('ul');
          li.appendChild(subUl);
  
          data[key].forEach(item => {
            const subLi = document.createElement('li');
            subLi.textContent = item.trim() === '' ? 'NO CONTENT': item; // Show 'No Content' for empty strings
            subUl.appendChild(subLi);
          });
  
          li.addEventListener('click', function(event) {
            event.stopPropagation();
            subUl.classList.toggle('visible');
            subUl.classList.toggle('hidden');
          });
        } else if (typeof data[key] === 'object') {
          li.textContent = key; // Display the category key
          container.appendChild(li);
  
          const subUl = document.createElement('ul');
          li.appendChild(subUl);
          buildNodes(data[key], subUl);
  
          li.addEventListener('click', function(event) {
            event.stopPropagation();
            subUl.classList.toggle('visible');
            subUl.classList.toggle('hidden');
          });
        }
      }
    }
  });  