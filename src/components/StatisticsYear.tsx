import { useState } from "react"
import BooksWithoutPagesList from "./BooksWithoutPagesList"
import BooksWithoutStarsList from "./BooksWithoutStarsList"
import PieG from "./PieG"
import LineG2 from "./LineG2"
import LineG3 from "./LineG3"
import StatisticsFinishedInMonth from "./StatisticsFinishedInMonth"
import StatisticsDaysPerBookInYear from "./StatisticsDaysPerBookInYear"
import StatisticsStarsPerBookInYear from "./StatisticsStarsPerBookInYear"
import countBookValues from "../functions/countBookValues"
import Heading from "./ui/Heading"

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
    const {
        cbf,
        cpf,
        cbfm,
        cpfm,
        cbwp,
        adpb,
        appd,
        astpb,
        cstpb,
        bwp,
        bwst,
        cbwst,
        dpb,
    } = countBookValues({
        myBooksArr,
        year,
    })
    const [showCbfDetails, setShowCbfDetails] = useState<boolean>(false)
    const [showDpbDetails, setShowDpbDetails] = useState<boolean>(false)
    const [showDpbDetails2, setShowDpbDetails2] = useState<boolean>(false)
    const [showStpbDetails, setShowStpbDetails] = useState<boolean>(false)
    const [showStpbDetails2, setShowStpbDetails2] = useState<boolean>(false)
    const [showBfmDetails, setShowBfmDetails] = useState<boolean>(false) // Bfm = Books Finished Monthly
    /** Count Stars Per Book Sum: count all values, if no books are rated the outcome will be 0 */
    const cstpbSum = cstpb.reduce((sum, a) => sum + a, 0)

    const monthNames: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    function getMonthName(i: number): string {
        return monthNames[i]
    }

    return (
        <section className="stats-year">
            <Heading text={`Your numbers for ${year}`} icon="icon-statistics.svg" />
            <article className="stats-item">
                <div className="h2 mb0">Books & pages per month</div>
                <LineG2 data={cbfm} data2={cpfm} subjects={["Books", "Pages"]} />
                Books finished in {year}: <b>{cbf}</b>
                {cbwp > 0 && <span className="sf2">*</span>}{" "}
                <button
                    type="button"
                    onClick={() => setShowCbfDetails(!showCbfDetails)}
                    className="btn-text diblock"
                >
                    ...
                </button>
                {showCbfDetails && (
                    <div className="mt05 sf">
                        {cbfm.map((c, index) => {
                            const yearmonth: number = year * 100 + (index + 1) // year 2022 index 2 > 202203
                            const key = "cbfm" + year + index

                            return (
                                <div key={key}>
                                    {getMonthName(index)}:{" "}
                                    <b>
                                        {c} {c === 1 ? "book" : "books"}
                                    </b>
                                    &nbsp;
                                    <br />
                                    {showBfmDetails && (
                                        <>
                                            <ul className="mt0 mb0">
                                                <StatisticsFinishedInMonth
                                                    yearmonth={yearmonth}
                                                />
                                            </ul>
                                            {c > 0 && <br />}
                                        </>
                                    )}
                                </div>
                            )
                        })}
                        <button
                            type="button"
                            className="btn-text fs-inherit"
                            onClick={() => setShowBfmDetails(!showBfmDetails)}
                        >
                            {showBfmDetails ? "hide" : "show"} titles
                        </button>
                        <br />
                        Total Pages read: <b>{cpf}</b>
                        <br />
                        Average pages per day: <b>{appd}</b>
                        <br />
                        {bwp.length > 0 && (
                            <div>
                                <br />
                                <i>* Books without pages defined</i>
                                <ul className="mt0">
                                    <BooksWithoutPagesList
                                        bwp={bwp}
                                        year={year}
                                        key={year}
                                    />
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </article>
            <article className="stats-item">
                <div className="h2 mb0">Days per book</div>
                <LineG3 data={dpb} />
                Average days to finish a book: <b>{adpb}</b>&nbsp;
                <button
                    type="button"
                    className="btn-text diblock"
                    onClick={() => setShowDpbDetails(!showDpbDetails)}
                >
                    ...
                </button>
                <div className={showDpbDetails ? "mt05 sf" : "mt05 sf dnone"}>
                    <div className={showDpbDetails2 ? "dnone" : "dblock"}>
                        {dpb.map((b, index) => {
                            const key = "adpb" + year + index
                            return (
                                <div key={key}>
                                    {index} {`day${index !== 1 ? "s" : ""}`}:{" "}
                                    <b>
                                        {b} {`book${b !== 1 ? "s" : ""}`}
                                    </b>
                                </div>
                            )
                        })}
                    </div>
                    {showDpbDetails2 && <StatisticsDaysPerBookInYear year={year} />}
                    <button
                        type="button"
                        className="btn-text fs-inherit"
                        onClick={() => setShowDpbDetails2(!showDpbDetails2)}
                    >
                        {!showDpbDetails2 ? "show titles" : "hide titles"}
                    </button>
                </div>
                <br />
            </article>
            {cstpbSum > 0 && (
                <article className="stats-item">
                    <div className="h2 mb0">How I rated my books in {year}</div>
                    <PieG data={cstpb} />
                    Average stars per book: <b>{astpb}</b>
                    {cbwst > 0 && (
                        <>
                            <span className="sf2">*</span>
                            <button
                                type="button"
                                onClick={() => setShowStpbDetails(!showStpbDetails)}
                                className="btn-text diblock"
                            >
                                ...
                            </button>
                            <div
                                className={showStpbDetails ? "mt05 sf" : "mt05 sf dnone"}
                            >
                                {cstpb.length > 0 && (
                                    <>
                                        <div
                                            className={
                                                showStpbDetails2 ? "dnone" : "dblock"
                                            }
                                        >
                                            {cstpb.map((b, index) => {
                                                const key = "cstpb" + year + index
                                                return (
                                                    <div
                                                        key={key}
                                                        className={b === 0 ? "dnone" : ""}
                                                    >
                                                        {index + 1}{" "}
                                                        {index + 1 === 1
                                                            ? "star"
                                                            : "stars"}
                                                        :{" "}
                                                        <b>{`${b} ${b === 1 ? "book" : "books"}`}</b>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {showStpbDetails2 && (
                                            <StatisticsStarsPerBookInYear year={year} />
                                        )}{" "}
                                        <button
                                            type="button"
                                            className="btn-text fs-inherit"
                                            onClick={() =>
                                                setShowStpbDetails2(!showStpbDetails2)
                                            }
                                        >
                                            {`${!showStpbDetails2 ? "show titles" : "hide titles"}`}
                                        </button>
                                    </>
                                )}

                                {bwst.length > 0 && (
                                    <div>
                                        <br />
                                        <i>* Books without stars defined: </i>
                                        <ul className="mt0">
                                            <BooksWithoutStarsList
                                                bwst={bwst}
                                                year={year}
                                                key={year}
                                            />
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </article>
            )}
        </section>
    )
}

export default StatisticsYear
