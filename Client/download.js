window.downloadQuakeData = async function() {
    const button = document.getElementById("downloadButton");
    const status = document.getElementById("downloadStatus");
    const progress = document.getElementById("progress");
    
    button.disabled = true;
    status.innerHTML = "Downloading Quake data...";
    
    try {
        const response = await fetch("/api/download-quake", { method: "POST" });
        
        if (response.status === 200) {
            status.innerHTML = "Download complete! Game will load on reload.";
            status.style.color = "#90EE90";
            
            // Update the progress text to show loading state
            if (progress) {
                progress.textContent = 'Quake Loading!';
            }
        } else if (response.status === 409) {
            status.innerHTML = "Quake data already exists!";
            status.style.color = "#FFD700";
            
            // Update the progress text since data exists
            if (progress) {
                progress.textContent = 'Quake Loading!';
            }
            
            button.disabled = false;
        } else {
            const errorText = await response.text();
            status.innerHTML = "Download failed: " + errorText;
            status.style.color = "#FF6B6B";
            button.disabled = false;
        }
    } catch (error) {
        status.innerHTML = "Download failed: " + error.message;
        status.style.color = "#FF6B6B";
        button.disabled = false;
    }
};
