$(document).ready(function() {
    const generateBtn = $("#generateBtn");
    const passwordField = $("#password");
    const copyBtn = $("#copyBtn");
    const filledCopyBtn = $('#filledCopyBtn');

    generateBtn.on('click', generatePassword);
    copyBtn.on('click', copyPassword);

    function generatePassword() {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";

        let password = "";
        for(let i=0; i<length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordField.val(password);
    }

    function copyPassword() {
        if(passwordField.val()) {
            navigator.clipboard.writeText(passwordField.val())
                .then(() => {
                    copyBtn.hide();
                    filledCopyBtn.show();
                    setTimeout(function() {
                        copyBtn.show();
                        filledCopyBtn.hide();
                    }, 2000);
                })
                .catch((error) => {
                    console.error("Failed to copy password: ", error);
                })
        }
    }
})
