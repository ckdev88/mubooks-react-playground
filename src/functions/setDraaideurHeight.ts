export default function setDraaideurHeight(): void {
    const axis = document.getElementsByClassName("axis")[0] as HTMLDivElement
    const draaideur = document.getElementsByClassName("axis")[0]
        .parentNode as HTMLDivElement
    const cards = axis.getElementsByClassName("card") as HTMLCollectionOf<HTMLDivElement>

    let max: number = cards[0].offsetHeight
    for (let i = 0; i < cards.length; i++)
        if (cards[i].offsetHeight > max) max = cards[i].offsetHeight + 16
    for (let i = 0; i < cards.length; i++) cards[i].style.height = max + "px"

    draaideur.style.height = max + "px"
    axis.style.height = max + "px"
}
