document.getElementById('spam-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();
  const count = document.getElementById('count').value;

  if (!username || !message || !count || count < 1) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'alert alert-danger';
    resultDiv.innerHTML = '<i class="fas fa-exclamation-circle alert-icon"></i> Please fill all fields correctly.';
    resultDiv.style.display = 'block';
    return;
  }

  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';

  const btn = this.querySelector('.btn');
  btn.disabled = true;

  const apiUrl = `https://api.fikmydomainsz.xyz/tools/spamngl?url=https%3A%2F%2Fngl.link%2F${encodeURIComponent(username)}&message=${encodeURIComponent(message)}&count=${count}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    if (data.status) {
      resultDiv.className = 'alert alert-success';
      resultDiv.innerHTML = `<i class="fas fa-check-circle alert-icon"></i> Success: ${data.results.success}, Failed: ${data.results.failed}`;
    } else {
      resultDiv.className = 'alert alert-danger';
      resultDiv.innerHTML = '<i class="fas fa-exclamation-circle alert-icon"></i> Failed to spam.';
    }
    resultDiv.style.display = 'block';
  } catch (error) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'alert alert-danger';
    resultDiv.innerHTML = '<i class="fas fa-exclamation-circle alert-icon"></i> An error occurred.';
    resultDiv.style.display = 'block';
  } finally {
    loadingOverlay.style.display = 'none';
    btn.disabled = false;
  }
});
