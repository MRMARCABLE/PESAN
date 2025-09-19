// Get the elements by their IDs
const typedTextElement = document.getElementById('1text');
const changeButton = document.getElementById('changeButton');
const companionGif = document.getElementsByClassName('container-pixle-budd');
const changeGifButton = document.getElementById('changeButton');

// Create an array of text lines you want to cycle through
const textsToType = [
  'Kenalin aku...serah sih mau panggil apa.',
  'UPS...kayaknya error',
  'maklumin dia masin belajar',
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
  
  // Jika sudah mencapai akhir array, kembali ke awal
  if (textIndex >= textsToType.length) {
    textIndex = 0;
  }
});

// Panggil efek mengetik pertama kali saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  typeEffect(textsToType[0], typedTextElement);
});