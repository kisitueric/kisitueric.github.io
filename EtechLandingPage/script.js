// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'visible';
    }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const texts = ['Erictech Developer', 'UI/UX Designer', 'Creative Thinker'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

type();

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function updateCount(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => updateCount(counter), 1);
    } else {
        counter.innerText = target;
    }
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCount(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    contactForm.reset();
});

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
}); */

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeToggle.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    showNotification(`Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
});

// Tilt Effect for Profile Card
const profileCard = document.querySelector('.profile-card');
profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});


 //Whatsapp
    
         const whatsappHomeIcon = document.getElementById('whatsapp-home-icon');
const whatsappPopup = document.getElementById('whatsapp-popup');
const closePopupButton = document.getElementById('close-popup');
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const typingEffect = document.getElementById('typing-effect');
const emojiPopup = document.getElementById('emoji-popup');
const emojiIcon = document.getElementById('emoji-icon');

// Show the chat pop-up
whatsappHomeIcon.addEventListener('click', () => {
    whatsappPopup.style.display = 'flex';
});

// Close the chat pop-up
closePopupButton.addEventListener('click', () => {
    whatsappPopup.style.display = 'none';
});

// Add message to the chat window and then redirect to WhatsApp API
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Display message in the chat window
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'sent');
        userMessage.innerHTML = `
            <div class="message-bubble">${message}</div>
            <span class="blue-tick">✔✔</span>
        `;
        chatMessages.appendChild(userMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message

        // Display automated reply thanking the user
        setTimeout(() => {
            const replyMessage = document.createElement('div');
            replyMessage.classList.add('message', 'received');
            replyMessage.innerHTML = `
                <img src="https://kisitu.work.gd/images/main.png" alt="Avatar">
                <div class="message-bubble" style="color:white; background-color: rgb(4, 153, 4);">Thank you for your valuable feedback. Trust us for your Projects today!</div>
            `;
            chatMessages.appendChild(replyMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        // Redirect to WhatsApp API
        const phoneNumber = '+256751818604'; // Updated WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        // Clear the input field
        messageInput.value = '';
    } else {
        alert('Please enter a message.');
    }
});

// Emoji popup toggle
emojiIcon.addEventListener('click', () => {
    emojiPopup.style.display = emojiPopup.style.display === 'block' ? 'none' : 'block';
});

// Append emoji to input field
emojiPopup.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
        messageInput.value += event.target.textContent;
        emojiPopup.style.display = 'none'; // Close emoji popup after selection
    }
});

// Remove typing effect after animation
setTimeout(() => {
    typingEffect.classList.remove('typing');
}, 3000);
const whatsappIcon = document.querySelector('.whatsapp-home-icon');

// Add scroll event listener
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Change "200" to the desired scroll height
        whatsappIcon.style.display = 'flex'; // Show the button
        whatsappIcon.style.animation = 'slideInFromRight 0.5s ease forwards'; // Trigger the animation
    } else {
        whatsappIcon.style.display = 'none'; // Hide the button
    }
});

// Initially hide the button
whatsappIcon.style.display = 'none';
 
 
 
   //To Top button function
var backBtn = document.querySelector(".back-btn");
window.addEventListener("scroll", function() {
if (this.pageYOffset > 100) {
backBtn.classList.add("active");
} else {
backBtn.classList.remove("active");
}
});
backBtn.addEventListener("click", function() {
window.scrollTo({
top: 0,
behavior: 'smooth'
})
});

 const audio = document.getElementById('background-audio');
    const icon = document.getElementById('toggle-icon');

    function toggleAudio() {
      if (audio.paused) {
        audio.play();
        icon.textContent = 'volume_off';
      } else {
        audio.pause();
        icon.textContent = 'volume_up';
      }
    }
  
