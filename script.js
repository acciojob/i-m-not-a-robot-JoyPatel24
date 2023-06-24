//your JS code here. If required.
function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function renderImages() {
      const images = document.querySelectorAll('img');
      const classNames = ['img1', 'img2', 'img3', 'img4', 'img5'];
      const duplicateClass = classNames[Math.floor(Math.random() * classNames.length)];
      const classCounts = { img1: 0, img2: 0, img3: 0, img4: 0, img5: 0 };

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const className = classNames[i];

        if (className === duplicateClass && classCounts[className] === 1) {
          img.src = document.querySelector(`.${duplicateClass}`).src;
        } else {
          img.src = `image${i + 1}.jpg`; // Replace with actual image URLs
          classCounts[className]++;
        }

        img.addEventListener('click', handleImageClick);
      }

      shuffleArray(images);
      const imagesContainer = document.getElementById('images');
      imagesContainer.innerHTML = '';
      images.forEach((img) => imagesContainer.appendChild(img));
    }

    function handleImageClick(event) {
      const selectedImages = document.querySelectorAll('.selected');
      const resetButton = document.getElementById('reset');

      if (selectedImages.length === 0) {
        event.target.classList.add('selected');
        resetButton.classList.remove('hidden');
      } else if (selectedImages.length === 1) {
        if (selectedImages[0] === event.target) {
          return; // Ignore double click on the same image
        }

        event.target.classList.add('selected');
        const verifyButton = document.getElementById('verify');
        verifyButton.classList.remove('hidden');
      }
    }

    function resetState() {
      const selectedImages = document.querySelectorAll('.selected');
      const verifyButton = document.getElementById('verify');
      const resetButton = document.getElementById('reset');
      const para = document.getElementById('para');

      selectedImages.forEach((img) => img.classList.remove('selected'));
      verifyButton.classList.add('hidden');
      resetButton.classList.add('hidden');
      para.textContent = '';
    }

    function handleVerifyClick() {
      const selectedImages = document.querySelectorAll('.selected');
      const verifyButton = document.getElementById('verify');
      const para = document.getElementById('para');

      if (selectedImages.length === 2) {
        if (selectedImages[0].classList[0] === selectedImages[1].classList[0]) {
          para.textContent = 'You are a human. Congratulations!';
        } else {
          para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
      }

      verifyButton.classList.add('hidden');
    }

    renderImages();

    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');

    resetButton.addEventListener('click', resetState);
    verifyButton.addEventListener('click', handleVerifyClick);
