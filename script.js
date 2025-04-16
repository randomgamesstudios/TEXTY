const notepad = document.getElementById('notepad');
const filenameInput = document.getElementById('filename');
const filetypeSelect = document.getElementById('filetype');
const saveBtn = document.getElementById('saveBtn');
const fileInput = document.getElementById('fileInput');
const darkToggle = document.getElementById('darkModeToggle');
const preview = document.getElementById('markdownPreview');

// 🌙 Toggle Dark Mode
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('darkMode', darkToggle.checked);
});

// Restore dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  darkToggle.checked = true;
  document.body.classList.add('dark');
}

// 💾 Save file
saveBtn.addEventListener('click', () => {
  const text = notepad.value;
  const filename = filenameInput.value.trim() || 'untitled';
  const filetype = filetypeSelect.value;
  const blob = new Blob([text], { type: 'text/plain' });

  const link = document.createElement('a');
  link.download = `${filename}.${filetype}`;
  link.href = URL.createObjectURL(blob);
  link.click();
});

// 📂 Load .txt or .texty file
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    notepad.value = e.target.result;
    updatePreview();
  };
  reader.readAsText(file);
});

// 🔁 Auto-save to localStorage
const autosaveKey = 'texty-notepad-autosave';
notepad.value = localStorage.getItem(autosaveKey) || '';
notepad.addEventListener('input', () => {
  localStorage.setItem(autosaveKey, notepad.value);
  updatePreview();
});

// 🔍 Markdown preview
function updatePreview() {
  preview.innerHTML = marked.parse(notepad.value);
}
updatePreview(); // Initial preview render
