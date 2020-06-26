let crdnum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let colour = ["spade", "cubs", "hearts", "diamonds"];

let rnd1 = Math.floor(Math.random() * crdnum.length);
let rnd2 = Math.floor(Math.random() * colour.length);

// document.querySelector(".cardcontent").innerHTML = card(crdnum[rnd1]);
// document.querySelector(".cardcontent").classList.add(colour[rnd2]);

function card(num) {
    switch (num) {
        case 1: return "A";
        case 11: return "J";
        case 12: return "Q";
        case 13: return "K";
        default: return num;
    }
}