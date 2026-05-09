function markWrongKey(letter){
    const keys = document.querySelectorAll(".key");

    keys.forEach((key) => {
        if(key.textContent.toLowerCase() === letter) {
            key.classList.add("wrong");
        }
    });
}