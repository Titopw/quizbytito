
const questions = [
    {
        question: 'Negara apa yang menjadi tuan rumah Piala Dunia 2018?',
        userAnswer: null,
        answers: [
            { text: 'France', correct: false },
            { text: 'Qatar', correct: false },
            { text: 'Rusia', correct: true },
            { text: 'Spanyol', correct: false }
        ]
    },
    {
        question: 'Tim sepakbola terkenal dengan sebutan The Red Devils adalah?',
        userAnswer: null,
        answers: [
            { text: 'Manchester United', correct: true },
            { text: 'Liverpool', correct: false },
            { text: 'AC Milan', correct: false },
            { text: 'Real Madrid', correct: false }
        ]
    },
    {
        question: 'Kapan terakhir kali Barcelona memenangkan UCL?',
        userAnswer: null,
        answers: [
            { text: '2006', correct: false },
            { text: '2009', correct: false },
            { text: '2011', correct: false },
            { text: '2015', correct: true }
        ]
    },
    {
        question: 'Portugal mengalah Prancis pada final EURO dengan score?',
        userAnswer: null,
        answers: [
            { text: '2-1', correct: false },
            { text: '1-0', correct: true },
            { text: '3-2', correct: false },
            { text: '8-2', correct: false }
        ]
    },
    {
        question: 'Siapa yang mempunyai iconic selebrasi SIU?',
        userAnswer: null,
        answers: [
            { text: 'Cristiano Ronaldo', correct: true },
            { text: 'Lionel Messi', correct: false },
            { text: 'Neymar JurJur', correct: false },
            { text: 'Lil Nus', correct: false }
        ]
    },
];
const defaultTimeLimit = 30; // detik
let timeLimit = defaultTimeLimit;
let score = 0;
let time = 0;
let currentQuestionIndex = 0;
let timer;

// Declare missing variables
let questionContainer, answerButtonsContainer, timeElement, nextButton;

function startQuiz() {
    currentQuestionIndex = 0; // Atur indeks pertanyaan ke 0
    score = 0; // Atur skor ke 0
    time = 0; // Inisialisasi ulang waktu
    timer = setInterval(updateTimer, 1000);
    questionContainer = document.getElementById('question-container'); // Tambahkan deklarasi
    answerButtonsContainer = document.getElementById('answer-buttons'); // Tambahkan deklarasi
    timeElement = document.getElementById('time'); // Tambahkan deklarasi
    nextButton = document.getElementById('next-button'); // Tambahkan deklarasi
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    time = 0; // Atur waktu kembali ke 0 setiap kali pertanyaan baru ditampilkan
    questionContainer.innerText = question.question;
    resetButtons();

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsContainer.appendChild(button);
    });

    // Sembunyikan tombol "Next" saat pertanyaan baru ditampilkan
    nextButton.style.display = 'none';
}

function resetButtons() {
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
}

function selectAnswer(answer) {
    const selectedButton = event.target;

    // Memeriksa apakah jawaban yang dipilih benar
    if (answer.correct) {
        setButtonStatus(selectedButton, 'btn-correct');
        // Tambahkan skor jika jawaban benar
        score += 20;
    } else {
        setButtonStatus(selectedButton, 'btn-incorrect');
        // Tampilkan tombol "Next" setelah pengguna memilih jawaban yang salah
        nextButton.style.display = 'block';
    }
}

function setButtonStatus(selectedButton, status) {
    selectedButton.classList.add(status);
    // Tampilkan tombol "Next" setelah mengatur status tombol
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (!nextButton.style.display) {
        score = 0;
    }

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        resetButtonStatus();
    } else {
        endQuiz();
    }
}

function resetButtonStatus() {
    const selectedButton = document.querySelector('.btn');
    selectedButton.classList.remove('btn-correct', 'btn-incorrect');

    // Tampilkan tombol "Next"
    nextButton.style.display = 'none';

    // Aktifkan tombol untuk pertanyaan baru
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function endQuiz() {
    clearInterval(timer);

    // Tampilkan elemen skor
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');

    scoreElement.textContent = score;

    scoreContainer.style.display = 'block';
    questionContainer.style.display = 'none';
    answerButtonsContainer.style.display = 'none';
    nextButton.style.display = 'none';
}

function restartQuiz() {
    // Reset pertanyaan dan jawaban
    questions.forEach(question => {
        question.userAnswer = null;
    });

    // Kembali ke halaman utama
    window.location.href = 'index.html';
}

function updateTimer() {
    if (time < timeLimit) {
        time++;
        timeElement.innerText = (timeLimit - time) + ' seconds';
    } else {
        // Waktunya habis, lanjutkan ke pertanyaan berikutnya
        nextQuestion();
    }
}

// Mulai kuis saat halaman dimuat
startQuiz();
