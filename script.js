document.addEventListener("DOMContentLoaded", () => {
    parseUrlParams();
});

// قراءة بيانات الشخص من رابط الـ URL المخصص
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // التشفير وفك التشفير البسيط عبر Base64 لرابط احترافي
    const nameParam = urlParams.get('n');
    const ageParam = urlParams.get('a');
    const eventParam = urlParams.get('e');
    const msgParam = urlParams.get('m');

    if (nameParam) {
        document.getElementById('display-name').innerText = decodeURIComponent(atob(nameParam));
    }
    if (ageParam) {
        document.getElementById('display-age').innerText = decodeURIComponent(atob(ageParam));
    } else {
        document.getElementById('age-box').style.display = 'none'; // إخفاء إذا لم يُحدد
    }
    if (eventParam) {
        document.getElementById('event-badge').innerText = decodeURIComponent(atob(eventParam));
    }
    if (msgParam) {
        document.getElementById('display-message').innerText = decodeURIComponent(atob(msgParam));
    }
}

// انيميشن فتح صندوق الهدايا
function openGift() {
    const lid = document.querySelector('.lid');
    lid.style.transform = 'translateY(-80px) rotate(-15deg)';
    
    // إطلاق الألعاب النارية (Confetti)
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    setTimeout(() => {
        document.getElementById('gift-stage').classList.remove('active');
        document.getElementById('card-stage').classList.add('active');
    }, 600);
}

// توليد رابط مخصص جديد ومشفر بنفس النمط
function copyCustomLink() {
    // إعداد القيم المراد تضمينها برابط الهدية
    const rawName = document.getElementById('display-name').innerText;
    const rawAge = document.getElementById('display-age').innerText;
    const rawEvent = document.getElementById('event-badge').innerText;
    const rawMsg = document.getElementById('display-message').innerText;

    // تشفير الروابط بـ Base64 لتبدو احترافية
    const encName = btoa(encodeURIComponent(rawName));
    const encAge = btoa(encodeURIComponent(rawAge));
    const encEvent = btoa(encodeURIComponent(rawEvent));
    const encMsg = btoa(encodeURIComponent(rawMsg));

    // إنشاء الرابط الجاهز
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?n=${encName}&a=${encAge}&e=${encEvent}&m=${encMsg}`;

    // النسخ إلى الحافظة
    navigator.clipboard.writeText(shareableUrl).then(() => {
        const toast = document.getElementById('toast');
        toast.style.opacity = '1';
        setTimeout(() => toast.style.opacity = '0', 3000);
    });
}
