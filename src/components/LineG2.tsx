// docs: https://developers.google.com/chart/interactive/docs/gallery/linechart
import Chart from "react-google-charts"
import { useContext } from "react"
import { AppContext } from "../App"
export default function LineG2({
    data,
    data2,
    subjects,
}: { data: number[]; data2: number[]; subjects: string[] }) {
    const { bodyBgColor, darkTheme } = useContext(AppContext)

    const chartData = [
        ["Month", subjects[0], subjects[1]],
        ["January", data[0], data2[0]],
        ["February", data[1], data2[1]],
        ["March", data[2], data2[2]],
        ["April", data[3], data2[3]],
        ["May", data[4], data2[4]],
        ["June", data[5], data2[5]],
        ["July", data[6], data2[6]],
        ["August", data[7], data2[7]],
        ["September", data[8], data2[8]],
        ["October", data[9], data2[9]],
        ["November", data[10], data2[10]],
        ["December", data[11], data2[11]],
    ]

    return (
        <Chart
            chartType="LineChart"
            data={chartData}
            options={{
                backgroundColor: bodyBgColor,
                legend: {
                    textStyle: {
                        color: darkTheme ? "white" : "black",
                        fontSize: "14px",
                    },
                },
                vAxes: {
                    0: {
                        title: "",
                        textStyle: {
                            color: darkTheme ? "lightblue" : "#3366cc",
                        },
                        titleTextStyle: {
                            color: darkTheme ? "white" : "black",
                        },
                    },
                    1: {
                        title: "",
                        textStyle: { color: darkTheme ? "pink" : "#dc3912" },
                        titleTextStyle: {
                            color: darkTheme ? "white" : "black",
                        },
                    },
                },
                hAxis: {
                    textStyle: { color: darkTheme ? "white" : "black" },
                    // 			gridlines: {
                    // 				count: 0,
                    // 			},
                    showTextEvery: 3,
                },
                // 		vAxis: {
                // 			gridlines: {
                // 				count: 0,
                // 			},
                // 		},
                series: {
                    0: { targetAxisIndex: 0 },
                    1: { targetAxisIndex: 1 },
                },
                chartArea: { left: 17, right: 40 },
            }}
        />
    )
}
