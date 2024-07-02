(async function data () {
    try {
      console.log('Fetching...');
        const name = document.getElementById('user-name');
        const name1 = document.getElementById('name1');
        const useremail = document.getElementById('email');
        const balance = document.getElementById('balance');
        const balance1 = document.getElementById('balance1');
        const wallet = document.getElementById('wallet');
        const referrals = document.getElementById('referrals');
        const pte = document.getElementById('pte');
        const reflink = document.getElementById('reflink');

  
      // console.log(document.getElementsByClassName('user-balance')[0].textContent);
      console.log('Loading...')
      const url = 'https://mich-backend.onrender.com/api/user';
  
      const req = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('token'),
          'ip': localStorage.getItem('ip'),
        }
      });
  
      const res = await req.json();
      if (req.status !== 200) {
        // localStorage.removeItem('admin');
        document.location.href = '/login.html';
      } else {
  
        const { accountBalance, 
          email, 
          investmentBalance, 
          id,
          walletAddress,
          fullname,
          accountLocked,
          blackList,
          isClient,
         } = res.user;

        //  document.getElementById('full_name').textContent = fullname;
        //  document.getElementById('table_full_name').textContent = fullname;
  
         localStorage.setItem('email', email);
  
        if (accountLocked) {
          document.location.href = '/locked.html';
        }
  
        if (blackList) {
          localStorage.setItem('blackList', blackList);
          document.location.href = '/invalid.html';
        }
  
        if (isClient === true) {
          localStorage.setItem('admin', 'false');
        }

        // Check if balance exist
        if (balance === null) {
        } else {
            balance.textContent = `$ ${accountBalance.toLocaleString('en-US')}`;
        }

        if (balance1 === null) {
      } else {
          balance1.textContent = `$ ${accountBalance.toLocaleString('en-US')}`;
      }


        //   Check if name is found
          // if (name === null) {
          // } else {
          //   name.textContent = fullname;
          // }

          // //   Check if name is found
          // if (name1 === null) {
          // } else {
          //   name1.value = fullname;
          // }

        // Check if email is found
          if (useremail === null) {
          } else {
            useremail.value = email
          }

        //   Check if wallet is found
          if (wallet === null) {
          } else {
            wallet.value = walletAddress;
          };

        let refUrl = `${window.location.host}/register.html?referredby=${id}`;
        document.getElementById('reflink').value = refUrl;
  
        return res.user;
      }
    } catch (error) {
      // localStorage.removeItem('admin');
      console.log(error);
    }
  } ());