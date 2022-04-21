document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header")

    let first_skill = document.querySelector(".skill:first-child")
    const sk_counters = document.querySelectorAll(".counter span")
    const progress_bars = document.querySelectorAll(".skills svg circle")

    const ml_section = document.querySelector(".milestones")
    const ml_counters = document.querySelectorAll(".number span")

    const prt_section = document.querySelector(".portfolio")
    const zoom_icons = document.querySelectorAll(".zoom-icon")
    const modal_overlay = document.querySelector(".modal-overlay")
    const images = document.querySelectorAll(".images img")
    const prev_btn = document.querySelector(".prev-btn")
    const next_btn = document.querySelector(".next-btn")


    // ------- Sticky Navbar -------

    const stickyNavbar = () => {
        header.classList.toggle("scrolled", window.pageYOffset > 0)
    }

    stickyNavbar()

    window.addEventListener("scroll", stickyNavbar)

    // ------- Receal Animation -------

    let sr = ScrollReveal({
        duration: 2500,
        distance: "60px",
    })

    sr.reveal(".showcase-info", { delay: 600 })
    sr.reveal(".showcase-area .square", { origin: "top", delay: 700 })
    sr.reveal(".showcase-image", { origin: "top", delay: 700 })
    // sr.reveal("nav", { origin: "top", delay: 700 })


    // ------- Skills Animation -------

    window.addEventListener("scroll", () => {

        window.addEventListener("scroll", () => {
            if (!skillsPlayed) skillsCounter()
            if (!mlPlayed) mlCounter()
        })

        const hasReached = (e) => {
            let topPosition = e.getBoundingClientRect().top;

            if (window.innerHeight >= topPosition + e.offsetHeight) return true;
            return false
        }

        const updateCounter = (num, maxNum) => {
            let currentNum = +num.innerText

            if (currentNum < maxNum) {
                num.innerText = currentNum + 1;
                setTimeout(() => {
                    updateCounter(num, maxNum)
                }, 30)
            }
        }

        let skillsPlayed = false;

        const skillsCounter = () => {
            if (!hasReached(first_skill)) return;

            skillsPlayed = true;

            sk_counters.forEach((counter, i) => {
                let target = +counter.dataset.target
                let strokeValue = 427 - 427 * (target / 100)

                progress_bars[i].style.setProperty("--target", strokeValue)

                setTimeout(() => {
                    updateCounter(counter, target);
                }, 500)

            })

            progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"))
        }

        skillsCounter();

        // ------- Services Counter -------

        let mlPlayed = false

        function mlCounter() {
            if (!hasReached(ml_section)) return
            ml_counters.forEach(counter => {
                let target = +counter.dataset.target

                setTimeout(() => {
                    updateCounter(counter, target)
                }, 400)
            })
        }

        mlCounter()

    })

    // ------- Portfolio Filter -------

    let mixer = mixitup(".portfolio-gallery", {
        selectors: {
            target: ".prt-card"
        },
        animation: {
            duration: 500,
        },
    })

    // ------- Modal Pop up Portfolio -------

    let currentIndex = 0

    zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex)
    }))

    modal_overlay.addEventListener("click", () => {
        prt_section.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    })

    prev_btn.addEventListener("click", () => {
        if (currentIndex === 0) {
            currentIndex = 5
        } else {
            currentIndex--
            changeImage(currentIndex)
        }
    })

    next_btn.addEventListener("click", () => {
        if (currentIndex === 5) {
            currentIndex = 0
        } else {
            currentIndex++
            changeImage(currentIndex);
        }
    })

    function changeImage(index) {
        images.forEach(img => img.classList.remove("showImage"))
        images[index].classList.add("showImage")
    }

    // ------- Swiper Pagination -------

    const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 500,
        autoplay: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

})