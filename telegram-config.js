// =======================
// SETTING TELEGRAM ANDA
// =======================
const BOT_TOKEN = "8412792790:AAEECAsUM-ckeY-Uni7usyYurXhE9Qpbq5M"; // Contoh: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
const CHAT_ID = "-1003937504797"; // Contoh: 123456789
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Fungsi Kirim Data ke Telegram
async function kirimKeTelegram(judul, data) {
    // Format pesan yang rapi
    let pesan = `<b>${judul}</b>\n\n`;
    for (const [key, value] of Object.entries(data)) {
        pesan += `<b>${key}:</b> ${value}\n`;
    }
    pesan += `\n<i>Dikirim pada: ${new Date().toLocaleString('id-ID')}</i>`;

    try {
        const response = await fetch(TELEGRAM_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: pesan,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            alert("✅ Data berhasil dikirim!");
            // Reset form setelah sukses
            document.querySelector('form').reset();
        } else {
            alert("❌ Gagal mengirim data. Cek konfigurasi bot.");
        }
    } catch (error) {
        alert("⚠️ Terjadi kesalahan jaringan: " + error.message);
    }
}

// Fungsi umum untuk menangani submit form
function setupFormHandler(formId, judulLaporan) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman

            // Ambil semua data input
            const formData = new FormData(form);
            const dataObj = {};
            for (let [key, value] of formData.entries()) {
                dataObj[key] = value;
            }

            // Kirim ke Telegram
            kirimKeTelegram(judulLaporan, dataObj);
        });
    }
}


