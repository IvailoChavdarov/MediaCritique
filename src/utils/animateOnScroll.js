//adds class "animate" to element
export default function animateOnScroll(elementToAnimate){
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(element) {
            if(element.isIntersecting === true){    
                element.target.classList.add("animate");
                observer.unobserve(element.target);
            }
        }
    )}, { threshold: [0] });

    observer.observe(elementToAnimate);
}