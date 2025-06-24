let scores = [0, 0, 0];
let decisions = [];
let currentStep = 0;

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function showSection(id) {
  ['inicio', 'tips', 'minijuegos', 'nosotros', 'encuesta'].forEach(sec => {
    document.getElementById(sec).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  if (id === 'minijuegos') startStory();
}

const tips = [
  'No publiques fotos sin permiso.',
  'Piensa antes de compartir en redes.',
  'Respeta la privacidad de los demás.',
  'Verifica la información antes de difundirla.',
  'No descargues software pirata.',
  'Evita el ciberacoso en cualquier forma.',
  'Protege tus contraseñas y datos personales.',
  'Usa la tecnología para construir, no para destruir.',
  'No uses inteligencia artificial para hacer trampa.',
  'Da crédito a los autores de los contenidos.',
  'Configura bien la privacidad de tus dispositivos.',
  'No uses dispositivos ajenos sin autorización.',
  'Revisa los permisos de las apps.',
  'Piensa en las consecuencias de lo que publicas.',
  'Cambia tus contraseñas regularmente.'
];

function showTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById('tip-content').textContent = tip;
}

function startStory() {
  currentStep = 0;
  decisions = [];
  document.getElementById('final-results').classList.add('hidden');
  document.getElementById('next-button').classList.remove('hidden');
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');
  showDecision();
}

function showDecision() {
  const storyElement = document.getElementById('story');
  const container = document.getElementById('game-container');
  let storyText = '';
  let optionsHTML = '';

  const steps = [
    ["Juan es un estudiante que se enfrenta a decisiones éticas en su día a día. Hoy, su amigo Pedro le pide ayuda con una tarea. ¿Qué debería hacer Juan?", ["Ayudar", "No ayudar"]],
    ["Juan decidió ayudar a Pedro. Mientras trabajan juntos, se da cuenta de que Pedro está copiando información de internet sin citar las fuentes. ¿Qué debería hacer Juan?", ["Decir", "Ignorar"]],
    ["Juan decidió decirle a Pedro que cite las fuentes. Pedro se enoja y le dice que no es necesario. ¿Qué debería hacer Juan?", ["Insistir", "Dejar"]],
    ["Juan decidió insistir en que cite las fuentes. Pedro finalmente acepta, pero se siente molesto. ¿Qué debería hacer ahora?", ["Celebrar", "Disculparse"]],
    ["Juan decidió celebrar que hizo lo correcto. Sin embargo, Pedro se aleja y no quiere hablar con él. ¿Qué debería hacer Juan?", ["Hablar", "Dejar"]],
    ["Juan se da cuenta de que la amistad es importante. Decide hablar con Pedro y aclarar las cosas. Pedro se siente mejor y agradece a Juan por su apoyo. ¿Qué debería hacer Juan ahora?", ["Seguir", "Distanciar"]],
    ["Juan decidió seguir apoyando a Pedro. Juntos, trabajan en la tarea y aprenden a colaborar. ¿Qué debería hacer Juan al final del día?", ["CelebrarAmistad", "Ignorar"]],
    ["Al día siguiente, Pedro le cuenta a otros compañeros que Juan le enseñó la importancia de citar fuentes. Los demás compañeros ahora respetan más a Juan. ¿Qué debería hacer Juan?", ["SerHumilde", "Presumir"]],
    ["El profesor felicita a ambos por el trabajo bien hecho. ¿Qué debería hacer Juan?", ["Agradecer", "Ignorar"]],
    ["El profesor propone que Juan y Pedro expliquen a la clase la importancia de citar fuentes y evitar el plagio. ¿Qué debería hacer Juan?", ["Aceptar", "Rechazar"]],
    ["Durante la exposición, un compañero se burla de ellos y minimiza la importancia de lo que dicen. ¿Qué debería hacer Juan?", ["Responder", "Ignorar"]],
    ["Después de la clase, varios estudiantes se acercan a Juan y le agradecen por la charla. El profesor propone que Juan sea tutor de ética académica. ¿Qué debería hacer Juan?", ["AceptarTutoría", "RechazarTutoría"]],
    ["Juan acepta ser tutor de ética. En su primer taller, un estudiante confiesa que también ha copiado en el pasado. ¿Qué debería hacer Juan?", ["Aconsejar", "IgnorarConfesión"]],
    ["Gracias al ejemplo de Juan, la escuela empieza a tener menos casos de plagio. Juan se siente orgulloso. ¿Qué debería hacer Juan para seguir fomentando estos valores?", ["CompartirExperiencia", "GuardarSilencio"]]
  ];

  if (currentStep < steps.length) {
    const [text, options] = steps[currentStep];
    storyText = text;
    optionsHTML = options.map(opt => `<button onclick="makeDecision('${opt.toLowerCase()}')">${opt}</button>`).join('');
  } else {
    showFinalResults();
    return;
  }

  storyElement.textContent = storyText;
  container.innerHTML = optionsHTML;
}

function makeDecision(decision) {
  decisions.push(decision);
  currentStep++;
  showDecision();
}

function showFinalResults() {
  document.getElementById('next-button').classList.add('hidden');
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('final-results').classList.remove('hidden');
  document.getElementById('restart-button').classList.remove('hidden');

  const correct = [
    'ayudar', 'decir', 'insistir', 'hablar', 'seguir', 'celebraramistad',
    'serhumilde', 'agradecer', 'aceptar', 'responder', 'aceptartutoría', 
    'aconsejar', 'compartirexperiencia'
  ];

  let html = "<h3>Decisiones de Juan:</h3><ul class='decision-list'>";
  let correctCount = 0;

  decisions.forEach((d, i) => {
    const isCorrect = correct.includes(d);
    if (isCorrect) correctCount++;
    html += `<li>Decisión ${i + 1}: ${d} - <span class='${isCorrect ? 'correct' : 'incorrect'}'>${isCorrect ? 'Correcta' : 'Incorrecta'}</span></li>`;
  });

  html += "</ul><h3>Reflexión Final:</h3>";

  if (correctCount >= decisions.length * 0.75) {
    html += "<p class='reflection'>🎉 Final Bueno: Juan se convirtió en un ejemplo para sus compañeros. Su ética y valores ayudaron a mejorar el ambiente escolar. ¡Muy bien!</p>";
  } else if (correctCount >= decisions.length * 0.4) {
    html += "<p class='reflection'>😐 Final Neutral: Aunque Juan tomó algunas buenas decisiones, todavía hay aspectos en los que puede mejorar para ser un mejor ejemplo.</p>";
  } else {
    html += "<p class='reflection'>😞 Final Malo: Las decisiones de Juan no promovieron un cambio positivo. Es importante reflexionar sobre cómo actuar mejor en el futuro.</p>";
  }

  document.getElementById('final-results').innerHTML = html;
}

function restartStory() {
  startStory();
}

function submitSurvey() {
  const val = document.getElementById('satisfaction').value;
  const com = document.getElementById('comments').value;
  const fb = document.getElementById('survey-feedback');
  fb.textContent = `Gracias por tu calificación de ${val} estrellas. Tus comentarios: ${com}`;
  fb.classList.remove('hidden');
  document.getElementById('survey-form').reset();
}

