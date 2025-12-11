// deadline 12th, if still have time - !!! combine listeners, too many of them

//passed - working fine

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
});



//passed - working fine
// https://www.w3schools.com/jsref/prop_win_scrolly.asp
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});


//passed - working fine
// nav bar for small displays
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const toggler = document.querySelector(".navbar-toggler");
    const sections = document.querySelectorAll(".pages");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (toggler && navbar) {
        toggler.addEventListener("click", () => {
            navbar.classList.toggle("show-mist");
        });
    }


    // reference for var https://stackoverflow.com/questions/30473141/difference-between-getelementsbyclassname-and-queryselectorall
    // scroll and reveal text when scrolling
    function scrollreveal() {
        const elems = document.querySelectorAll(".revealsl");    //var? 

        for (var i = 0; i < elems.length; i++) {
            var rect = elems[i].getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // when element is a bit inside the viewport
            if (rect.top < windowHeight - 80) {
                elems[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", scrollreveal);
    window.addEventListener("load", scrollreveal);

});

//passed - working fine
// fix to smooth scrool one section
document.addEventListener("DOMContentLoaded", () => 
    {
    const btn = document.getElementById("backToTHETop");

    btn.addEventListener("click", () => 
        {
        document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
    });

    const sections = document.querySelectorAll(".pages");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) 
                    {

                    const currentID = entry.target.id;

                    if (currentID === "about") {
                        btn.style.display = "none";
                    } else {
                        btn.style.display = "flex";
                    }
                }
            });
        },
        { threshold: 0.6 } // maybe 0.9? check!?
    );

    sections.forEach(s => observer.observe(s));
});


//passed - working fine (knob???)
// function for light or dark theme switch 
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeSwitch");

//need storage, otherwise my theme disapearing somewhere
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});



//passed - working fine
document.addEventListener("DOMContentLoaded", () => {
    const lens = document.getElementById("magnifyGlass");
    const magnifyBtn = document.getElementById("magnifyBtn");

    let magnifyActive = false;

    magnifyBtn.addEventListener("click", () => {
        magnifyActive = !magnifyActive;

        if (magnifyActive) {
            lens.classList.add("zoom");
            lens.style.opacity = "1";
        } else {
            lens.classList.remove("zoom");
            lens.style.opacity = "0";
        }
    });

    document.addEventListener("mousemove", (mov) => {
        if (!magnifyActive) return;

        lens.style.left = (mov.clientX - lens.offsetWidth / 2) + "px";
        lens.style.top = (mov.clientY - lens.offsetHeight / 2) + "px";
    });
});



//passed - working fine
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".education-mod");
    const panels = document.querySelectorAll(".education-box");

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const year = tab.dataset.year;
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            panels.forEach(panel => {
                if (panel.dataset.year === year) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });
        });
    });
});


//passed - working fine (api lags possible, cuz i'm on free plan there)
// reference - https://openweathermap.org/current
// reference - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// 29c8736430e290d03ec9676e1dd1569a
// weather dynamic feature
// Dublin for my own location
document.addEventListener("DOMContentLoaded", () => {
    const weatherShow = document.getElementById("weather");
    if (!weatherShow) return;


    const city = "Dublin";
    const countryCode = "IE";


    const apiKey = "29c8736430e290d03ec9676e1dd1569a"; 
    
    
    //link from their api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;


    fetch(url)
        .then(res => {
            if (!res.ok) {
                console.log("Weather API error:", res.status);
                return;
            }

            return res.json();

        })

        .then(data => 
            {
            if (!data) return;

            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description || "";

                let icon = "⛅";
                const d = description.toLowerCase();

                if (d.includes("rain")) icon = "☔";
                else if (d.includes("clear")) icon = "🌞";
                else if (d.includes("snow")) icon = "⛄";
                else if (d.includes("storm") || d.includes("thunder")) icon = "🌪️";
                else if (d.includes("cloud")) icon = "☁️";

                weatherShow.textContent = `${city}: ${temp}°C ${icon}`;
        })
        .catch(err => console.log("Weather isn't found", err));
});

//passed - working fine
// message after submit contact info and message to me
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("modalContactForm"); //by ID
    if (!form) return;

    form.addEventListener("submit", function (f) {
        f.preventDefault(); // it to stop my page from reloading

        alert("Your message was sent! Wait for an answer shortly!");

        form.reset(); // resetting my forsm and cleaning whole thing
    });
});

//passed - working fine
// references: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#event_bubbling
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
// https://www.w3schools.com/js/js_htmldom_events.asp
// contact me bytton near magnifying glass
// message opens twice, though I don't have double function???
document.addEventListener("DOMContentLoaded", () => {
    const floatingButton = document.getElementById("contactFloatBtn");
    const overlay = document.getElementById("contactOverlay"); //over my background and everything
    const xButton = overlay ? overlay.querySelector(".close-btn") : null;
    const contactMelForm = document.getElementById("modalContactForm");

    if (!overlay) return;

    const openForm = () => {
        overlay.classList.add("show");
    };

    const closeForm = () => {
        overlay.classList.remove("show");
    };

    if (floatingButton) {
        floatingButton.addEventListener("click", openForm);
    }

    if (xButton) {
        xButton.addEventListener("click", closeForm);
    }

    overlay.addEventListener("click", (mes) => {
        if (mes.target === overlay) {
            closeForm();
        }
    });

    if (contactMelForm) {
        contactMelForm.addEventListener("submit", (mes) => {
            mes.preventDefault();
            alert("Your message was sent! Wait for an answer shortly!");
            contactMelForm.reset();
            closeForm();
        });
    }
});
