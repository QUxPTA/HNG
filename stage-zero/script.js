function updateCurrentTime() {
  const options = {
    timeZone: 'UTC',
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };

  const timeString = new Date().toLocaleTimeString('en-US', options);
  document.getElementById('current-time').textContent = timeString;

  // Update time every second
  setTimeout(updateCurrentTime, 1000);
}

// Initial time update
updateCurrentTime();
