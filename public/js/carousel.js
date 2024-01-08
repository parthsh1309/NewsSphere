document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.getElementById("indicators-carousel");
    const items = carouselContainer.querySelectorAll("[data-carousel-item]");
    const indicators = carouselContainer.querySelectorAll("[data-carousel-slide-to]");
    const prevButton = carouselContainer.querySelector("[data-carousel-prev]");
    const nextButton = carouselContainer.querySelector("[data-carousel-next]");

    let currentIndex = 0;

    function showSlide(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add("duration-700", "ease-in-out");
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
                item.classList.remove("duration-700", "ease-in-out");
            }
        });

        indicators.forEach((indicator, i) => {
            indicator.setAttribute("aria-current", i === index);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", function () {
            goToSlide(index);
        });
    });

    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);

    // Auto-advance to the next slide every 5 seconds (adjust as needed)
    setInterval(goToNextSlide, 5000);
});