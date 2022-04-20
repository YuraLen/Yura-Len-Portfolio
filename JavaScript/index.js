document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header")

    let first_skill = document.querySelector(".skill:first-child")
    const sk_counters = document.querySelectorAll(".counter span")
    const progress_bars = document.querySelectorAll(".skills svg circle")

    const ml_section = document.querySelector(".milestones")
    const ml_counters = document.querySelectorAll(".number span")


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
})