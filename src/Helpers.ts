function isUrl(url: string) {
    if (url.slice(0, 8) === "https://") return true
    return false
}

function isLocal(): boolean {
    if (window.location.hostname === "localhost") return true
    return false
}

function getOlCover(id: string, size: CoverSize = undefined): string {
    let appendSize = ""
    if (size) appendSize = "-" + size

    if (id.slice(0, 2) === "OL")
        return "https://covers.openlibrary.org/b/olid/" + id + appendSize + ".jpg"
    return "https://covers.openlibrary.org/b/isbn/" + id + appendSize + ".jpg"
}

function getBookCover(url = "", size: CoverSize = undefined): string {
    // NOTE set showOLImages to false when archive/OpenLibrary is unavailable
    const showOLImages = true

    if ((url.includes("openlibrary") && !showOLImages) || url === "") {
        return "./../img/save-books-icon.png"
    }

    let appendSize = ""
    if (size) {
        appendSize = "-" + size
        return url.replace(".jpg", appendSize + ".jpg")
    }
    return url
}

async function getOlPagesMedian(id: string): Promise<number> {
    const ret = await fetch(
        "https://openlibrary.org/search.json?q=/works/" +
            id +
            "&mode=number_of_pages_median&fields=number_of_pages_median&limit=1",
    )
        .then((res) => res.json())
        .then((json) => json.docs[0].number_of_pages_median)
    return ret
}

const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
    let timeoutTimer: ReturnType<typeof setTimeout>

    return (...args: T) => {
        clearTimeout(timeoutTimer)

        timeoutTimer = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

function openCalendarPopUp(dateFieldId: string): void {
    const dateElement = document.getElementById(dateFieldId) as HTMLInputElement
    try {
        dateElement.showPicker()
    } catch (e) {
        dateElement.classList.remove("calendar-hidden")
        dateElement.focus()
        console.error(e)
    }
}

function shuffleArray(array: []) {
    let currentIndex = array.length
    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }
}

function getUrlParamVal(url: string, key: string, hash = false): string {
    let urlArr: string[]
    if (hash) urlArr = url.split(/['#','?','&']/)
    else urlArr = url.split(/['?','&']/)
    for (let i = 0; i < urlArr.length; i++) {
        if (urlArr[i].slice(0, key.length) === key) return urlArr[i].split("=")[1]
    }
    return ""
}

function getDurationDays(
    date_reading: Book["date_reading"],
    date_finished: Book["date_finished"],
): number {
    /** Date Reading .. leftover will be Day Reading */
    if (date_reading === undefined || date_finished === undefined) return -1
    /** Date Reading Year */
    const dry: number = Math.floor(date_reading / 10000)

    /** Date Reading: initialized by parameter date_reading */
    let dr = date_reading
    /** Date Finished: initialized by parameter date_finished */
    let df = date_finished

    dr -= dry * 10000
    /** Date Reading Month */
    const drm: number = Math.floor(dr / 100)
    dr -= drm * 100
    const date_reading_date = new Date(dry, drm, dr)
    /** Date Finished .. leftover of dr will be Day Finished */
    /** Date Finished Year */
    const dfy: number = Math.floor(df / 10000)
    df -= dfy * 10000
    /** Date Finished Month */
    const dfm: number = Math.floor(df / 100)
    df -= dfm * 100
    const date_finished_date: Date = new Date(dfy, dfm, df)
    const date_difference: number =
        (date_finished_date.getTime() - date_reading_date.getTime()) / 1000 / 3600 / 24
    return date_difference
}

export {
    isUrl,
    isLocal,
    getOlCover,
    getBookCover,
    debounce,
    openCalendarPopUp,
    shuffleArray,
    getUrlParamVal,
    getOlPagesMedian,
    getDurationDays,
}
