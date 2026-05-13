import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl5hzm7F3hvzc_MGLCUUbnP0PQMVX9HM8",
  authDomain: "velocdrive.firebaseapp.com",
  projectId: "velocdrive",
  storageBucket: "velocdrive.firebasestorage.app",
  messagingSenderId: "763342234037",
  appId: "1:763342234037:web:440d400e5af764aa39f9fc",
  measurementId: "G-ZKCYS9GLQE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const carData = [
    { id: 1, nome: "BMW 320i F30 (2019)", categoria: "Luxo" },
    { id: 2, nome: "Porsche Panamera Turbo (2017)", categoria: "Luxo" },
    { id: 3, nome: "Ferrari LaFerrari (2014)", categoria: "Esportivo" }
];

const btnAI = document.querySelector('.btn-ai');

btnAI.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * carData.length);
    const car = carData[randomIndex];
    showPrettyAlert(car);
});

function showPrettyAlert(car) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); display: flex; justify-content: center;
        align-items: center; z-index: 1000; backdrop-filter: blur(10px);
    `;

    modal.innerHTML = `
        <div style="background: rgba(255,255,255,0.05); padding: 2.5rem; border-radius: 25px;
                    border: 1px solid #98ff44; text-align: center; max-width: 400px; color: white;">
            <h2 style="color: #98ff44; margin-bottom: 1rem;">IA Recomenda:</h2>
            <p style="font-size: 1.6rem; font-weight: bold; margin-bottom: 1rem;">${car.nome}</p>
            <p style="color: #ccc; margin-bottom: 2rem;">Analisamos seu perfil e este Premium é a escolha ideal para sua próxima rota.</p>
            <button id="closeModal" style="background: #98ff44; border: none; padding: 12px 30px;
                    border-radius: 12px; font-weight: bold; cursor: pointer; color: black;">Fechar</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('closeModal').onclick = () => modal.remove();
}

const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        carCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
