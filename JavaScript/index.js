document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header")

    let first_skill = document.querySelector(".skill:first-child")
    const sk_counters = document.querySelectorAll(".counter span")
    const progress_bars = document.querySelectorAll(".skills svg circle")

    const ml_section = document.querySelector(".milestones")
    const ml_counters = document.querySelectorAll(".number span")

    const prt_section = document.querySelector(".portfolio")
    const zoom_icons = document.querySelectorAll(".zoom-icon")
    const prt_icon = document.querySelectorAll(".prt-icon")
    const i_check = document.querySelectorAll(".check")
    const modal_overlay = document.querySelector(".modal-overlay")
    const images = document.querySelectorAll(".images img")
    const prev_btn = document.querySelector(".prev-btn")
    const next_btn = document.querySelector(".next-btn")

    const links = document.querySelectorAll(".nav-link")

    const toggle_btn = document.querySelector(".toggle-btn")

    const copyLink1 = document.querySelector("#copyLink1")
    const copyLink2 = document.querySelector("#copyLink2")
    const copyLink3 = document.querySelector("#copyLink3")
    const copyLink4 = document.querySelector("#copyLink4")
    const copyLink5 = document.querySelector("#copyLink5")
    const copyLink6 = document.querySelector("#copyLink6")

    console.log(i_check);
    console.log(toggle_btn);


    // ---------- Sticky Navbar ----------

    const stickyNavbar = () => {
        header.classList.toggle("scrolled", window.pageYOffset > 0)
    }

    stickyNavbar()

    window.addEventListener("scroll", stickyNavbar)

    // ---------- Receal Animation ----------

    let sr = ScrollReveal({
        duration: 2500,
        distance: "60px",
    })

    sr.reveal(".showcase-info", { delay: 600 })
    sr.reveal(".showcase-area .square", { origin: "top", delay: 700 })
    sr.reveal(".showcase-image", { origin: "top", delay: 700 })
    // sr.reveal("nav", { origin: "top", delay: 700 })


    // ---------- Skills Animation ----------

    window.addEventListener("scroll", () => {

        window.addEventListener("scroll", () => {
            activeLink()
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
                }, 20)

            })

            progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"))
        }

        skillsCounter();

        // ---------- Services Counter ----------

        let mlPlayed = false

        function mlCounter() {
            if (!hasReached(ml_section)) return
            ml_counters.forEach(counter => {
                let target = +counter.dataset.target

                setTimeout(() => {
                    updateCounter(counter, target)
                }, 200)
            })
        }

        mlCounter()

    })

    // ---------- Portfolio Filter ----------

    let mixer = mixitup(".portfolio-gallery", {
        selectors: {
            target: ".prt-card"
        },
        animation: {
            duration: 500,
        },
    })

    // ---------- Modal Pop up Portfolio ----------

    let currentIndex = 0

    zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex)
    }))

    // prt_icon.forEach((icn, i) => icn.addEventListener("click", () => {
    //     console.log("icn", icn);
    //     if (!icn.classList.contains("copied")) { icn.classList.add("copied") }

    //     // function deleteCopiedState(icn) {
    //     //     if (icn.classList.contains("copied")) { icn.classList.remove("copied") }
    //     // }

    //     i_check[i].classList.replace("uil-link-h", "uil-check-circle")

    //     setInterval(() => {
    //         icn.classList.remove("copied")
    //         i_check[i].classList.replace("uil-check-circle", "uil-link-h")
    //     }, 1000)
    // }))

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

    // ---------- Swiper Pagination ----------

    const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 500,
        autoplay: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // ---------- Change Active Link On Scroll ----------

    function activeLink() {
        let sections = document.querySelectorAll("section[id]")
        let passedSection = Array.from(sections).map((sect, i) => {
            return {
                y: sect.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            }
        }).filter(sect => sect.y <= 0)

        let currSectionId = passedSection.at(-1).id

        links.forEach(e => e.classList.remove("active"))
        links[currSectionId].classList.add("active")
    }

    activeLink()

    // ---------- Change Theme ----------

    let firstTheme = localStorage.getItem("dark")

    changeTheme(+firstTheme)

    function changeTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark")
            toggle_btn.classList.replace("uil-moon", "uil-sun")
            localStorage.setItem("dark", 1)
        } else {
            document.body.classList.remove("dark")
            toggle_btn.classList.replace("uil-sun", "uil-moon")
            localStorage.setItem("dark", 0)
        }
    }

    toggle_btn.addEventListener("click", () => {
        changeTheme(!document.body.classList.contains("dark"))
    })

    copyLink1.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink1.href)
    })
    copyLink2.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink2.href)
    })
    copyLink3.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink3.href)
    })
    copyLink4.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink4.href)
    })
    copyLink5.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink5.href)
    })
    copyLink6.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(copyLink6.href)
    })
})

