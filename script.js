// Get the elements by their IDs
const typedTextElement = document.getElementById('1text');
const changeButton = document.getElementById('changeButton');
const companionGif = document.getElementsByClassName('container-pixle-budd');
const changeGifButton = document.getElementById('changeButton');
const closingSection = document.getElementById('closingSection');
const closingText = document.getElementById('closingText');
const restartButton = document.getElementById('restartButton');

// Create an array of text lines you want to cycle through
const textsToType = [
  'Kenalin aku...serah sih mau panggil apa.',
  'UPS...kayaknya error',
  'maklumin dia masih belajar',
  'aku ulangin lagi yah?',
  'Kenalin aku...serah sih mau panggil apa.',
  'tapi yang pasti aku buatannya si... .',
  'si cowok gajelas',
  'yang kepoin kamu mulu sama banyak tanyak.',
  'katanya....kamu itu anaknya...mageran ?.',
  'kek nya dia salah deh.',
  'karena aku liat kamu itu rajin banget.',
  'rajin banget ngurusin kerjaan jadi koki.',
  'oh ya dia itu...',
  'jago banget kalo boong!',
  'singkat aja sebenernya..',
  'dia itu...pengen deketin kamu!',
  'tapi dia gak berani bilang langsung.',
  'dia suruh aku buat kenalin diri dulu.',
  'aku juga gak tau kenapa dia gitu sih.',
  'aneh kan!?',
  'tapi yaudahlah ya...',
  'yang penting aku udah kenalin diri.',
  'jadi kamu...',
  'bolehin dia buat...',
  'deketin kamu?',
  'katanya kalo gaboleh its okay',
  'buruan dia nungguin!!!!'
];

const gifLinks = [
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp',
  'https://media.tenor.com/loEK5zRS5tQAAAAm/bits-8bits.webp',
  'https://media.tenor.com/loEK5zRS5tQAAAAm/bits-8bits.webp',
  'https://media.tenor.com/loEK5zRS5tQAAAAm/bits-8bits.webp', 
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp',
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp',
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/l6BNQyeZ1e8AAAAm/bits-8bits.webp',
  'https://media.tenor.com/l6BNQyeZ1e8AAAAm/bits-8bits.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/71Jz7D3aGuAAAAAm/bits-8bits.webp',
  'https://media.tenor.com/71Jz7D3aGuAAAAAm/bits-8bits.webp',
  'https://media.tenor.com/71Jz7D3aGuAAAAAm/bits-8bits.webp',
  'https://media.tenor.com/08JBCs-KfJEAAAAm/bits-8bits.webp',
  'https://media.tenor.com/08JBCs-KfJEAAAAm/bits-8bits.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/fARxykRmn70AAAAm/confuso-confuse.webp',
  'https://media.tenor.com/hmWSuglngegAAAAm/bits-8bits.webp',
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp',
  'https://media.tenor.com/8iW51MQTta4AAAAm/bits-8bits.webp'
];

let currentGifIndex = 0;
let textIndex = 0;
let isTyping = false; // Flag untuk mencegah double click
let currentTimeout = null; // Untuk menyimpan reference timeout yang sedang berjalan

// Closing message
const closingMessage = "TERIMA KASIH SUDAH MEMBACA! 💝";

// Sound effect untuk closing (menggunakan Web Audio API)
function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator untuk sound effect
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Setting untuk sound effect yang menyenangkan
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.type = 'sine';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Audio not supported in this browser');
  }
}

// Fungsi untuk big text typing effect dengan sound
function bigTypeEffect(text, element, callback) {
  isTyping = true;
  element.textContent = '';
  let charIndex = 0;
  const typingSpeed = 100; // Lebih lambat untuk dramatic effect

  function typeChar() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      currentTimeout = setTimeout(typeChar, typingSpeed);
    } else {
      // Selesai typing, mainkan sound dan jalankan callback
      playNotificationSound();
      if (callback) callback();
      isTyping = false;
      currentTimeout = null;
    }
  }
  
  typeChar();
}

// Fungsi untuk show closing
function showClosing() {
  // Hide main content
  document.querySelector('.container-web > .container-bubblechat').style.display = 'none';
  document.querySelector('.container-pixle-budd').style.display = 'none';
  changeButton.style.display = 'none';
  
  // Show closing section
  closingSection.style.display = 'flex';
  
  // Start big typing effect
  setTimeout(() => {
    bigTypeEffect(closingMessage, closingText);
  }, 500);
}
// Fungsi untuk membuat efek mengetik dengan pencegahan double click
function typeEffect(text, element) {
  // Jika sedang mengetik, hentikan proses sebelumnya
  if (isTyping) {
    clearTimeout(currentTimeout);
  }
  
  // Set flag typing menjadi true dan disable button
  isTyping = true;
  changeButton.disabled = true;
  
  // Kosongkan teks saat ini untuk memulai efek baru
  element.textContent = '';
  let charIndex = 0;
  const typingSpeed = 50; // Kecepatan mengetik (ms per karakter)

  function typeChar() {
    if (charIndex < text.length) {
      // Tambahkan satu karakter ke elemen
      element.textContent += text.charAt(charIndex);
      charIndex++;
      currentTimeout = setTimeout(typeChar, typingSpeed);
    } else {
      // Selesai mengetik, enable button kembali
      isTyping = false;
      changeButton.disabled = false;
      currentTimeout = null;
    }
  }
  
  typeChar();
}

// Event listener untuk tombol dengan pencegahan double click
changeButton.addEventListener('click', () => {
  // Jika sedang mengetik, abaikan click
  if (isTyping) {
    return;
  }

  // Update GIF
  companionGif[0].src = gifLinks[currentGifIndex];
  currentGifIndex = (currentGifIndex + 1) % gifLinks.length;

  // Panggil fungsi typeEffect dengan teks yang sesuai
  typeEffect(textsToType[textIndex], typedTextElement);

  // Pindah ke teks berikutnya dalam array
  textIndex++;
  
  // Cek apakah sudah mencapai akhir array
  if (textIndex >= textsToType.length) {
    // Show closing setelah delay
    setTimeout(() => {
      showClosing();
    }, 2000); // 2 detik setelah text terakhir selesai
  }
});

// Event listener untuk restart button
restartButton.addEventListener('click', () => {
  // Reset variables
  textIndex = 0;
  currentGifIndex = 0;
  isTyping = false;
  
  // Show main content again
  document.querySelector('.container-web > .container-bubblechat').style.display = 'flex';
  document.querySelector('.container-pixle-budd').style.display = 'block';
  changeButton.style.display = 'block';
  changeButton.disabled = false;
  
  // Hide closing section
  closingSection.style.display = 'none';
  
  // Reset GIF to first one
  companionGif[0].src = gifLinks[0];
  
  // Start first text again
  typeEffect(textsToType[0], typedTextElement);
});

// Panggil efek mengetik pertama kali saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  typeEffect(textsToType[0], typedTextElement);
});