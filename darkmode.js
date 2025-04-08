let darkmode = localStorage.getItem('darkmode');
const darkTema = document.getElementById('darkTema');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'ativo');
}
const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}
if(darkmode === 'ativo'){
    enableDarkmode();
}
darkTema.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "ativo" ? enableDarkmode() : disableDarkmode()
})