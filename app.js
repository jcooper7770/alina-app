// Script for changing text dynamically every second
const dynamicTextElement = document.getElementById('dynamic-text');
//const dynamicTexts = ["I'm a life coach", "Fitness Director", "Zouk Instructor", "Life Coach", "Speech Language Pathologist", "Psychologist"];
const dynamicTexts = ["I'm a life coach", "Movement and Mindset Coach", "Speech Language Pathologist/Psychologist"];
let currentIndex = 0;

function changeDynamicText() {
    const options = {
        //strings: [`${dynamicTexts[currentIndex]}`, `testing`, `second test`],
        strings: dynamicTexts.map(text => `${text}`),
        typeSpeed: 50, // Adjust typing speed (characters per minute)
        showCursor: false, // Hide the blinking cursor
        //backDelay: 1000, // Length of pause after finished typing
        backDelay: 2000,
        startDelay: 500,
        onComplete: function () {
            setTimeout(startTyped, 2000); // Wait for 1 second before starting the next typing animation
        }
    };

    const typed = new Typed(dynamicTextElement, options);
}

function startTyped() {
    // Start the typing animation
    changeDynamicText();
}

// Initial start
startTyped();

function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent the default anchor behavior
    var section = document.getElementById(sectionId);
    if (section) {
        var offset = 50; // Adjust this value based on your fixed navbar height
        var sectionPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: sectionPosition - offset,
            behavior: 'smooth'
        });
    }
}

function playVideo(videoUrl) {
    // Add your logic to play the video (e.g., open a modal with the video)
    console.log('Playing video:', videoUrl);
}

var prevItem = null;
function highlightItem(item) {
  const highlightedItem = document.getElementById('highlightedItem');
  highlightedItem.textContent = item.textContent;
  highlightedItem.innerHTML = item.children[1].children[2].innerHTML;
  item.style.backgroundColor = 'white';
  if (prevItem != null) {
    prevItem.style.backgroundColor = '';
  }
  prevItem = item;
}

// Put videos into video section
const playlist_list = document.getElementById('playlist-list');
videos.forEach(section => {
    var vidNum = 0;
    var videoPrefix = `video-${section.section.toLowerCase()}`;
    const section_div = document.createElement('div');
    const header = document.createElement('h2');
    header.textContent = section.section;
    section_div.appendChild(header);
    section.collection.forEach(video => {
        const item = document.createElement('div');
        //item.className = "playlist-item";
        item.onclick = "highlightItem(this)";
        var thumbnail = `<img src="${video.thumbnailUrl}" alt="Thumbnail" class="playlist-thumbnail"></img>`;
        if (video.videoUrl.endsWith(".mp4")) {
            var highlightedContent = `<video id="${videoPrefix}-${vidNum}" width="100%" height="100%" controls>
                <source src="${video.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`
            thumbnail = `<video class="playlist-thumbnail" src=${video.videoUrl}></video>`
            vidNum += 1;
        } else {
            var highlightedContent = `<img height="100%" src="${video.videoUrl}" alt="${video.title}">`
        }
        const content = `
     <div class="playlist-item" onclick="highlightItem(this)">
        ${thumbnail}
        <div class="playlist-details">
            <div class="playlist-title">${video.title}</div>
            <div class="playlist-description">${video.description}</div>
            <div class="playlist-video">${highlightedContent}</div>
        </div>
    </div>`
        item.innerHTML = content;
        section_div.appendChild(item);

        // Create the thumbnail
        if (video.videoUrl.endsWith(".mp4")){
            createThumbnail(`video-${vidNum - 1}`);
        }
    });
    playlist_list.appendChild(section_div);
    //createThumbnails(section.section.toLowerCase(), vidNum);
});
// highlight the first item
const firstVideo = document.getElementsByClassName("playlist-item")[0];
highlightItem(firstVideo);

function createThumbnails(section, numVideos) {
    for (let i = 0; i < numVideos; i++) {
        createThumbnail(`video-${section}-${i}`);
    }
}

function createThumbnail(videoId) {
    video = document.getElementById(videoId);
    if (video === null) {
        console.log(`Couldn't find video with id: ${videoId}`);
        return
    }
    console.log(video);
    var thumbnail = video.parentElement.parentElement.parentElement.children[0]
    console.log(thumbnail);
    video.addEventListener('loadedmetadata', () => {
      // Set the currentTime to get a specific frame as a thumbnail
      console.log(video.duration);
      video.currentTime = 1; // Adjust the time as needed (in seconds)

      // Capture the current frame as an image
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Set the image data to the thumbnail
      thumbnail.src = canvas.toDataURL('image/png');

      // Show the thumbnail container
      //thumbnailContainer.style.display = 'block';
    });
}

// Fill in testimonials
testimonials_list = document.getElementById('testimonial-list');
var num = 0;
testimonials.forEach(testimonial => {
    const outerDiv = document.createElement('div');
    outerDiv.classList = (num == 0) ? "carousel-item active" : "carousel-item";
    const content = `
    <div class="testimonial">
        <img src="${testimonial.clientImg}" alt="${testimonial.name} Image">
        <p>${testimonial.note}</p>
        <strong>${testimonial.name}</strong>
    </div>
    `;
    outerDiv.innerHTML = content;
    testimonials_list.appendChild(outerDiv);
    num++;
});