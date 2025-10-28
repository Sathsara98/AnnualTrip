(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    // Set target date to June 6, 2025
    const targetDate = "11/08/2025";
    const countDown = new Date(targetDate).getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day));
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        // When date is reached, display a message
        if (distance < 0) {
            document.getElementById("headline").innerText = "Today is the day!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
        }
    }, 1000);
})();

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('animate__animated');
                el.classList.add(el.dataset.animation);

                const delay = el.dataset.delay;
                if (delay) {
                    el.style.setProperty('--animate-delay', delay);
                    el.classList.add('animate__delay-' + delay);
                }

                observer.unobserve(el); // Only animate once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% is visible
    });

    animatedElements.forEach(el => observer.observe(el));
});

document.getElementById('responseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const submitButton = document.getElementById("submitButton");
    const submitText = document.getElementById("submitText");
    const submitLoader = document.getElementById("submitLoader");

    // Disable the button and show loader
    submitButton.disabled = true;
    submitLoader.style.display = 'inline-block';
    submitText.textContent = 'Submitting...';

    // Create a FormData object from the form
    const formData = new FormData(this);

    fetch('https://script.google.com/macros/s/AKfycbwAWFu26Tiz74A9gi8V5mO3yaB_DVow20j9HMNryH5bVAJ9a-3HAYYH5k6QOIih_agD/exec', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                document.getElementById('successPopup').style.display = 'flex';
                document.getElementById('responseForm').reset();
            } else {
                alert('There was an error submitting your response. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the submission. Please try again.');
        })
        .finally(() => {
            // Hide loader and re-enable button regardless of result
            submitButton.disabled = false;
            submitLoader.style.display = 'none';
            submitText.textContent = 'Submit';
        });
});

function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById("submitButton").disabled = false; // Re-enable submit button
}

function disableButton() {
    const button = document.getElementById("submitButton");
    button.disabled = true;
}

(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    // Sample guest list with table numbers
    const guests = [
        // Table 1
        { name: "Mrs. Nilanthi Karunanayaka", table: 1 },
        { name: "Mr. Ajantha Lal", table: 1 },
        { name: "Mrs. Nilangani Kariyawasam", table: 1 },
        { name: "Mr. Wasantha Kariyawasam", table: 1 },
        { name: "Mr. Ravin Lochana", table: 1 },
        { name: "Mr. Rashmika Wadduwage", table: 1 },
        { name: "Ms. Githmi Sathsarani", table: 1 },
        { name: "Ms. Prasadini Thalawattha", table: 1 },
        { name: "Mr. Ravidu Thalawattha", table: 1 },
        { name: "Mr. Dinesh Thalawattha", table: 1 },

        // Table 2
        { name: "Mrs. Thushani Thalawattha", table: 2 },
        { name: "Mrs. Isuru Gomes", table: 2 },
        { name: "Mr. Dilum Malinga", table: 2 },
        { name: "Mrs. Kumari Wadduwage", table: 2 },
        { name: "Mr. Ashoka Thalawattha", table: 2 },
        { name: "Mrs. Piyala Thalawattha", table: 2 },
        { name: "Mr. Anil Thalawattha", table: 2 },
        { name: "Mrs. Nayana Caldera", table: 2 },
        { name: "Mr. Chandana Thalawattha", table: 2 },
        { name: "Mrs. Soma Thalawattha", table: 2 },

        // Table 3
        { name: "Mr. Ranjith Munasingha", table: 3 },
        { name: "Mrs. Lalani Munasingha", table: 3 },
        { name: "Mrs. Piyumi Munasingha", table: 3 },
        { name: "Mr. Kasun Waddwage", table: 3 },
        { name: "Mr. Radinu Wadduwage", table: 3 },
        { name: "Mrs. Agnas Munasingha", table: 3 },
        { name: "Mr. Raja Munasingha", table: 3 },
        { name: "Mr. Dineka Munasingha", table: 3 },
        { name: "Mrs. Susima Munasingha", table: 3 },
        { name: "Mr. Sanath Wadduwage", table: 3 },

        // Table 4
        { name: "Mrs. Mabal Fernando", table: 4 },
        { name: "Mrs. Geetha Sumanawathi", table: 4 },
        { name: "Mr. Amarathunga Munasingha", table: 4 },
        { name: "Mrs. Thilaka Munasingha", table: 4 },
        { name: "Ms. Pabasara Munasingha", table: 4 },
        { name: "Mr. Heshan Munasingha", table: 4 },
        { name: "Mr. Kasun Munasingha", table: 4 },
        { name: "Mrs. Sewwandi Munasingha", table: 4 },
        { name: "Mr. Kumara Kodagoda", table: 4 },
        { name: "Mr. K M Roy", table: 4 },

        // Table 5
        { name: "Mr. Jeewantha Munasingha", table: 5 },
        { name: "Mrs. Gayani Munasingha", table: 5 },
        { name: "Mr. Imalsha Munasingha", table: 5 },
        { name: "Mr. Sampath Chandrasiri", table: 5 },
        { name: "Mrs. Susila Munasingha", table: 5 },
        { name: "Mr. Oshan Chandrasiri", table: 5 },
        { name: "Ms. Himaya Chandrasiri", table: 5 },
        { name: "Mr. D S Piyasena", table: 5 },
        { name: "Mrs. K R Chalert", table: 5 },

        // Table 6
        { name: "Mrs. Ruwinika Rodrigo", table: 6 },
        { name: "Mr. Dilshan Thilakarathna", table: 6 },
        { name: "Mr. Prasanna Rodrigo", table: 6 },
        { name: "Mrs. Inoka Perera", table: 6 },
        { name: "Mr. Tharidu Atapattu", table: 6 },
        { name: "Mr. Maheepa Walpita", table: 6 },
        { name: "Ms. Mekala Wijerathna", table: 6 },
        { name: "Mrs. Chamali Samaranayake", table: 6 },
        { name: "Ms. Harini Amarasinghe", table: 6 },
        { name: "Ms. Dilmi Dissanayake", table: 6 },

        // Table 7
        { name: "Ms. Devni Yasara", table: 7 },
        { name: "Mr. Bimsara Dolamulla", table: 7 },
        { name: "Mr. Savindu Bandara", table: 7 },
        { name: "Mr. Udyotha Sankalpana", table: 7 },
        { name: "Ms. Sayuri Liyanage", table: 7 },
        { name: "Mrs. Kenita Harshanie", table: 7 },
        { name: "Ms. Danushi Uthpala", table: 7 },
        { name: "Ms. Hasangi Haththotuwa", table: 7 },
        { name: "Mrs. Priyanka Nilmini", table: 7 },
        { name: "Mr. Nishantha Thalawattha", table: 7 },

        // Table 8
        { name: "Mr. Asela Lihinikaduwa", table: 8 },
        { name: "Mr. Madura Prasad", table: 8 },
        { name: "Mr. Imalka Perera", table: 8 },
        { name: "Mr. Roshana Waduge", table: 8 },
        { name: "Mr. Mohan Somachandra", table: 8 },
        { name: "Mr. Ravindra Gajasingha", table: 8 },
        { name: "Mr. Sasrika Gajasingha", table: 8 },
        { name: "Mr. Lasantha Ranasingha", table: 8 },
        { name: "Mr. Ravith Silva", table: 8 },
        { name: "Mr. Dhammika Perera", table: 8 },

        // Table 9
        { name: "Mr. Mahesh Abeysekara", table: 9 },
        { name: "Mrs. P Namageel", table: 9 },
        { name: "Mr. Francis Fernando", table: 9 },
        { name: "Mr. Ranjan Eranga", table: 9 },
        { name: "Mr. Dhaksitha Chandradasa", table: 9 },
        { name: "Mr. Hemaka Rajapaksha", table: 9 },
        { name: "Mr. Sisira Ranatunga", table: 9 },
        { name: "Mrs. Yugantha Piyadasa", table: 9 },

        // Table 10
        { name: "Mr. Epa Dayarathna", table: 10 },
        { name: "Mrs. Vishaka Jayawardhana", table: 10 },
        { name: "Mrs. Nirmani Silva", table: 10 },
        { name: "Mrs. Keshika Jayasingha", table: 10 },
        { name: "Mr. Lalith Kumarasena", table: 10 },
        { name: "Mr. Saman Nawagamuwa", table: 10 },
        { name: "Mr. Nandasena Manimendra", table: 10 },
        { name: "Mr. Ruwan Senavirathna", table: 10 },
        { name: "Mr. Nalaka De Silva", table: 10 },
        { name: "Mr. Gamini Premathilaka", table: 10 },

        // Table 11
        { name: "Mr. Bandula Gamage", table: 11 },
        { name: "Mrs. Krishani Samanthi", table: 11 },
        { name: "Mr. Layan Gamage", table: 11 },
        { name: "Mr. Ananda Samanpriya", table: 11 },
        { name: "Mr. Sarath Dabare", table: 11 },
        { name: "Mrs. Mallika Ranjani", table: 11 },
        { name: "Mrs. Imali Ranasinghe", table: 11 },

        // Table 12
        { name: "Mr. Sameera Fernando", table: 12 },
        { name: "Mr. Dinusha Sampath", table: 12 },
        { name: "Mr. Sunil Kumarasinghe", table: 12 },
        { name: "Ms. Rukmi Tharupama", table: 12 },
        { name: "Ms. Hiruni Chathurya", table: 12 },
        { name: "Ms. Rishini Fernando", table: 12 },
        { name: "Ms. Shakila Malshani", table: 12 },
        { name: "Ms. Suhani Perera", table: 12 },
        { name: "Ms. Sapna Perera", table: 12 },
        { name: "Ms. Hasini Kodithuwakku", table: 12 },

        // Table 13
        { name: "Mr. Vidura Jeewantha", table: 13 },
        { name: "Mr. Ayodhya Dhameesha", table: 13 },
        { name: "Mr. Tharindu Tharaka", table: 13 },
        { name: "Mr. Praveen Thathsara", table: 13 },
        { name: "Mr. Thisal Deelaka", table: 13 },
        { name: "Mr. Pasindu Kulasinghe", table: 13 },
        { name: "Mr. Kalindu Mihiranga", table: 13 },
        { name: "Mr. Lahiru Thilanka", table: 13 },
        { name: "Mr. Hasitha Dilshan", table: 13 },
        { name: "Mr. Lilan Mihiranga", table: 13 },

        // Table 14
        { name: "Mr. Kapru Gaveshana", table: 14 },
        { name: "Mr. Namal Maitipe", table: 14 },
        { name: "Mr. Chamath Maitipe", table: 14 },
        { name: "Mr. Janaka Prasan", table: 14 },
        { name: "Mr. Viraj Chanka", table: 14 },
        { name: "Mr. Pasindu Abeysirigunawardana", table: 14 },
        { name: "Mr. Savindu Weerakoon", table: 14 },
        { name: "Mr. Ravindu Harasara", table: 14 },
        { name: "Mr. Aloka Gimhan", table: 14 },
        { name: "Mr. Bhanuka Dewapriya", table: 14 },

        // Table 15
        { name: "Mr. Shanith Rathnayake", table: 15 },
        { name: "Mr. Pasan Dhananjaya", table: 15 },
        { name: "Mr. Janith Chamantha", table: 15 },
        { name: "Mr. Sumudu Mapalagama", table: 15 },
        { name: "Mr. Nipun Ilankoon", table: 15 },
        { name: "Mr. Lakshan Wijayathilaka", table: 15 },
        { name: "Mr. Tharanga Ranasinghe", table: 15 },
        { name: "Mr. Dineth Weerathunga", table: 15 },
        { name: "Mr. Praveen Piyasena", table: 15 },

        // Table 16
        { name: "Mrs. Chandi Weerarathna", table: 16 },
        { name: "Mrs. Nadeesha Attanayake", table: 16 },
        { name: "Mr. Sanjeewa Abeydheera", table: 16 },
        { name: "Ms. Dilani Warnakula", table: 16 },
        { name: "Ms. Dewni Abhilashini", table: 16 },
        { name: "Mrs. Sanali Moragoda", table: 16 },
        { name: "Mr. Praveen Liyanage", table: 16 },
        { name: "Mr. Kasun Maduwantha", table: 16 },
        { name: "Mr. Movindu Amarasinghe", table: 16 },
        { name: "Mr. Pasindu Bethmage", table: 16 },

        // Table 17
        { name: "Mr. Halin Hettigoda", table: 17 },
        { name: "Ms. Muditha Liyanapathirana", table: 17 },
        { name: "Ms. Indika Samarasekara", table: 17 },
        { name: "Mr. Sanjeewa Rajarathna", table: 17 },
        { name: "Mr. Chanaka De Silva", table: 17 },
        { name: "Mr. Kavindu Aluthgedara", table: 17 },
        { name: "Ms. Shehani Wickramasinghe", table: 17 },
        { name: "Mr. Sanjeewa Bandara", table: 17 },
        { name: "Mr. Chamin Perera", table: 17 },
        { name: "Mrs. Yamuna Elvitigala", table: 17 },

        // Table 18
        { name: "Mr. Prabath Gunasekara", table: 18 },
        { name: "Mrs. Achala Gunasekara", table: 18 },
        { name: "Mr. Thishan Liyanage", table: 18 },
        { name: "Mr. Prabath Dhnanajaya", table: 18 },
        { name: "Mr. Janaka Karunarathna", table: 18 },
        { name: "Mr. G S Premasiri", table: 18 },
        { name: "Mr. Janitha Sesath", table: 18 },
        { name: "Mr. Sarath Silva", table: 18 },
        { name: "Mr. Abdul Azees", table: 18 },
        { name: "Mr. Upul Ratwatte", table: 18 },

        // Table 19
        { name: "Mrs. Lochana Dharani", table: 19 },
        { name: "Mr. Lankdheera Weerasinghe", table: 19 },
        { name: "Mrs. Madhusha Samadhi", table: 19 },
        { name: "Ms. Sachini Sulochana", table: 19 },
        { name: "Ms. Kenuri Maitipe", table: 19 },
        { name: "Mr. Asanka Sandamal Maitipe", table: 19 },
        { name: "Mr. Roshan Maitipe", table: 19 },
        { name: "Mrs. Uchini Thiseka", table: 19 },
        { name: "Mrs. Dilini Sakunthala", table: 19 },
        { name: "Mrs. Anushika Udari", table: 19 },

        // Table 20
        { name: "Mr. Gunasena Withanachchi", table: 20 },
        { name: "Mr. Sirisena Withanachchi", table: 20 },
        { name: "Mrs. Sheela Withanachchi", table: 20 },
        { name: "Mrs. Gnana Withanachchi", table: 20 },
        { name: "Mr. Thilina Withanachchi", table: 20 },
        { name: "Mr. Manoj Madhushanka", table: 20 },
        { name: "Mr. Chamila Shashika Withanachchi", table: 20 },
        { name: "Mr. Tharindu Wijekoon", table: 20 },
        { name: "Ms. Nadeera Erandi", table: 20 },
        { name: "Mr. Sanuli Sandilya", table: 20 },

        // Table 21
        { name: "Mr. Jagath Rathnayaka", table: 21 },
        { name: "Ms. Vidumini Rathnayaka", table: 21 },
        { name: "Ms. Sachini Dileka", table: 21 },
        { name: "Ms. Tharushi Dileka", table: 21 },
        { name: "Mrs. Hansika Sewwandi", table: 21 },
        { name: "Ms. Piumi Uthpala", table: 21 },
        { name: "Mrs. Gihani Rashmika", table: 21 },
        { name: "Ms. Shashini Bhagya", table: 21 },
        { name: "Mrs. Isuri Uththara", table: 21 },
        { name: "Ms. Sudarshi Perera", table: 21 },

        // Table 22
        { name: "Mr. Chandrasoma Maitipe", table: 22 },
        { name: "Mrs. Rohini Maitipe", table: 22 },
        { name: "Mr. Thilakarathna Mahagamage", table: 22 },
        { name: "Mrs. Kanthi Maitipe", table: 22 },
        { name: "Mr. Jayasena Alawaththa", table: 22 },
        { name: "Mr. Chandrasena Maitipe", table: 22 },
        { name: "Mrs. Ranjani Liyanage", table: 22 },
        { name: "Mr. Ananda Maitipe", table: 22 },
        { name: "Mrs. Lalitha Jayawardhana", table: 22 },
        { name: "Mr. Mahinda Maitipe", table: 22 },

        // Table 23
        { name: "Mrs. Chandani Maitipe", table: 23 },
        { name: "Mr. Somarathna Withanachchi", table: 23 },
        { name: "Mrs. Deepika Vithanagama", table: 23 },
        { name: "Mr. Priyantha Perera", table: 23 },
        { name: "Mr. Wasantha Kumara", table: 23 },
        { name: "Mr. Janaka Withanachchi", table: 23 },
        { name: "Mr. Suranga Indrajith", table: 23 },
        { name: "Mrs. Thamari Nisansala", table: 23 },
        { name: "Mr. Akindu Menuja", table: 23 },
        { name: "Mr. Sayul Savindu", table: 23 },
    ];

    const searchInput = document.getElementById("guestSearch");
    const suggestionsBox = document.getElementById("suggestions");
    const result = document.getElementById("result");

    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        suggestionsBox.innerHTML = "";
        // If input is empty, hide suggestions and clear result
        if (query.length === 0) {
            suggestionsBox.style.display = "none";
            result.textContent = ""; // Clear table number
            return;
        }

        const matches = guests.filter(g => g.name.toLowerCase().includes(query));

        if (matches.length > 0) {
            matches.forEach(g => {
                const li = document.createElement("li");
                li.textContent = g.name;
                li.style.padding = "8px";
                li.style.cursor = "pointer";
                li.addEventListener("click", () => {
                    searchInput.value = g.name;
                    result.textContent = `${g.name}, your table number is ${g.table}.`;
                    suggestionsBox.style.display = "none";
                });
                suggestionsBox.appendChild(li);
            });
            suggestionsBox.style.display = "block";
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = "none";
        }
    });




    document.addEventListener("DOMContentLoaded", function () {
        const laterOption = document.getElementById("Response3");
        const phoneField = document.getElementById("phoneField");

        const allOptions = document.getElementsByName("Response");

        allOptions.forEach(option => {
            option.addEventListener("change", function () {
                if (laterOption.checked) {
                    phoneField.style.display = "flex";
                } else {
                    phoneField.style.display = "none";
                    document.getElementById("PhoneNumber").value = ''; // Clear phone if hidden
                }
            });
        });
    });

})(jQuery);

