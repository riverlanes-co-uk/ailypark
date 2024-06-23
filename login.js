async function Login () {
    try {
        const button = document.getElementById('login_button')
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;

        button.textContent = 'Please Wait...';

        const data = {
            email,
            password,
        };

        const url = 'https://mich-backend.onrender.com/api/user/login'

        const req = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Mode': 'no-cors',
            },
        });

        const res = await req.json();
        console.log(res);

        if (req.status !== 200) {
            button.textContent = 'Log me in';
            alert(res.message);
            document.location.reload();
        } else {
            localStorage.setItem('token', res.token);
            document.location.href = '/dashboard.html';
        };
    } catch (error) {
        console.log(error);
    }
};


async function Register () {
    try {
        const button = document.getElementById('login_button')
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;


        button.textContent = 'Please Wait...';


        const data = {
            name,
            email,
            password,
        }

        const url = 'https://mich-backend.onrender.com/api/user/register';
        const req = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const res = await req.json();
        console.log(res);

        if (req.status !== 200) {
            alert(res.message);
            document.location.reload();
        } else {
            localStorage.setItem('token', res.token);
            document.location.href = '/dashboard.html';
        };
    } catch (error) {
        console.log(error);
    }
};