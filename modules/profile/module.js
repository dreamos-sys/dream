export default {
    render(context) {
        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <h3 style="color:#10b981;">👤 Profile User</h3>
                <p><strong>Nama:</strong> ${context.user}</p>
                <p><strong>Role:</strong> Master M</p>
                <p><strong>Login Terakhir:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <button onclick="alert('Fitur edit profile segera hadir')" style="background:#10b981; border:none; padding:8px 16px; border-radius:8px;">Edit Profile</button>
            </div>
        `;
    }
};
