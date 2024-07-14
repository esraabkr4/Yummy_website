import { twRow } from "./index.js";

export class Contact {
    constructor(userName = null, email = null, phone = null, age = null, pass = null, repass = null) {
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.pass = pass;
        this.repass = repass;
    }
    //// validation for all inputs  
    validateInputs(input) {
        debugger;
        let validateArr = {
            userName: /^[a-z A-Z]+$/,
            email: /^[^@]+@[^@]+\.[^@]+$/,
            phone: /^\d{10,12}$/,
            age: /^[1-9][0-9]{0,2}$/,
            pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        };
        let errorArray = {
            userName: 'Special characters and numbers not allowed',
            email: 'Email not valid *exemple@yyy.zzz',
            phone: 'Enter valid Phone Number',
            age: 'Enter valid age',
            pass: 'Enter valid password *Minimum eight characters, at least one letter and one number:*'
        };
        let nameAttr = input.getAttribute('name');

        if (nameAttr == 'repass') {
            this.checkPasswordMatch();
        }
        else if (!validateArr[nameAttr].test(input.value.trim())) {
            this.showErrorDiv(input, errorArray[nameAttr]);
        } else {
            this.hideErrorDiv(input)
            if (nameAttr == 'pass') { this.checkPasswordMatch(); }
        }

    }
    ////////if input is valid hide error div
    hideErrorDiv(inp) {
        if (inp.nextElementSibling) { inp.nextElementSibling.remove(); }
        inp.setAttribute('valid', 'true');
        let inputs = form.getElementsByTagName('input');
        const submitBut = form.getElementsByTagName('button')[0];
        if ([...inputs].every(v => v.attributes.valid.nodeValue.toLowerCase() == 'true')) {
            submitBut.removeAttribute('disabled');
            submitBut.className = "tw-btn-danger";
            submitBut.addEventListener('click', () => { alert("Congratulations ^_^") })
        }
    }
    ////////if input is not valid show error div
    showErrorDiv(inp, message) {
        debugger;
        if (!inp.nextElementSibling) {
            let errorMsg = document.createElement('p');
            errorMsg.className = "text-red-950 italic text-center bg-pink-200 py-2 px-4 rounded";
            errorMsg.innerHTML = `<i class=" text-red-700 fa-solid fa-triangle-exclamation"></i>${message}`;
            inp.parentElement.insertBefore(errorMsg, inp.nextSibling);
        }
        inp.setAttribute('valid', 'false');
        const submitBut = form.getElementsByTagName('button')[0];
        if (!submitBut.hasAttribute('disabled')) {
            submitBut.setAttribute('disabled', 'disabled');
            submitBut.className = "tw-btn-danger-disabled";

        }
    }
    ////////check if password and repassword are matched or not
    checkPasswordMatch() {
        const password = form.querySelector('#pass');
        const confirmPassword = form.querySelector('#repass');

        if (password.value.trim() != confirmPassword.value.trim())
            this.showErrorDiv(confirmPassword, "Enter valid Repassword");
        else
            this.hideErrorDiv(confirmPassword)
    }
    //////////display contact form
    showContactForm() {
        debugger;
        twRow.innerHTML = '';
        window.form = document.createElement('form');
        form.className = "w-3/4 flex flex-wrap mx-auto mt-8";
        form.id = "contactForm";
        form.setAttribute('novalidate', '');


        form.addEventListener('submit', function (e) {
            e.preventDefault();
        });
        form.innerHTML = `
                      <div class="md:w-1/2 sm:w-full px-3 mb-6">
                        <!-- outline-red-500 -->
                        <input class="tw-input" name="userName" type="text" valid="false" placeholder="Enter Your Name">
                      </div>
                      <div class="md:w-1/2 sm:w-full  px-3 mb-6">
                        <input class="tw-input" name="email" type="email" valid="false" placeholder="Enter Your Email">
                      </div>
                      <div class="md:w-1/2 sm:w-full  px-3 mb-6">
                        <input class="tw-input" name="phone" type="text" valid="false" placeholder="Enter Your Phone">
                      </div>
                      <div class="md:w-1/2 sm:w-full  px-3 mb-6">
                        <input class="tw-input" name="age" type="number" valid="false" placeholder="Enter Your Age">
                      </div>
                      <div class="md:w-1/2 sm:w-full  px-3 mb-6">
                        <input class="tw-input" name="pass" id="pass" type="password" valid="false" placeholder="Enter Your Password">
                      </div>
                      <div class="md:w-1/2 sm:w-full  px-3 mb-6">
                        <input class="tw-input" name="repass" id="repass" type="password" valid="false" placeholder="RePassword">
                      </div>
                      <div class="w-full text-center">
                      <button type="submit" class="tw-btn-danger-disabled" disabled>
                      Submit
                    </button></div>
    `
        let inputs = form.getElementsByTagName('input');
        let inpArray = Array.from(inputs);
        // Array.from(inputs).forEach(element => {
        //     element.addEventListener('input', function () {
        //         this.validateInputs(element);
        //     })
        // });
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keyup', () => {
                this.validateInputs(inputs[i]);
            });
        }
        twRow.append(form);
    }


}