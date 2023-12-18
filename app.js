// Script for changing text dynamically every second
const dynamicTextElement = document.getElementById('dynamic-text');
const dynamicTexts = ["I'm a life coach", "Life Coach", "Dance Teacher", "Nutritionist"];
let currentIndex = 0;

function changeDynamicText() {
    const options = {
        //strings: [`${dynamicTexts[currentIndex]}`, `testing`, `second test`],
        strings: dynamicTexts.map(text => `${text}`),
        typeSpeed: 50, // Adjust typing speed (characters per minute)
        showCursor: false, // Hide the blinking cursor
        backDelay: 1000,
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
    const section_div = document.createElement('div');
    const header = document.createElement('h2');
    header.textContent = section.section;
    section_div.appendChild(header);
    section.collection.forEach(video => {
        const item = document.createElement('div');
        item.className = "playlist-item";
        item.onclick = "highlightItem(this)";
        const content = `
     <div class="playlist-item" onclick="highlightItem(this)">
        <img src="${video.thumbnailUrl}" alt="Thumbnail" class="playlist-thumbnail">
        <div class="playlist-details">
            <div class="playlist-title">${video.title}</div>
            <div class="playlist-description">${video.description}</div>
            <div class="playlist-video"><img src="${video.videoUrl}" alt="${video.title}"></div>
        </div>
    </div>`
        item.innerHTML = content;
        section_div.appendChild(item);
    });
    playlist_list.appendChild(section_div);
});

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