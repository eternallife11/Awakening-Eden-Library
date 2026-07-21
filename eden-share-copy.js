const copyBtn = document.getElementById('copyBtn');
    const shareText = document.getElementById('shareText');
    if (copyBtn && shareText) {
      copyBtn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(shareText.value); }
        catch (err) { shareText.select(); document.execCommand('copy'); }
        copyBtn.textContent = 'Copied';
        setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 1600);
      });
    }
