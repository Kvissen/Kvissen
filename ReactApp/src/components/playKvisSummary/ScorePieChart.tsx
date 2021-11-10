// Erlend
import React, {useEffect} from 'react'
import * as d3 from 'd3'
import {PieArcDatum} from 'd3-shape'
import {ChartData} from './chartData'
import {observer} from "mobx-react";

const ScorePieChart = (props: IResultPieChartProps) => {
    useEffect(() => {
        draw()
    })

    const draw = () => {
        const width = props.width - props.left - props.right
        const height = props.height - props.top - props.bottom
        const radius = Math.min(width, height) / 2
        const resultData = props.resultData

        const svg = d3
            .select('.basicPieChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`)

        const color = d3
            .scaleOrdinal()
            .domain(
                (d3.extent(resultData, (d) => {
                    return d.label
                }) as unknown) as string
            )
            .range(d3.schemeCategory10)

        const pie = d3
            .pie<ChartData>()
            .sort(null)
            .value((data) => data.value)

        const path = d3.arc<PieArcDatum<ChartData>>().innerRadius(0).outerRadius(radius)

        const pieData = pie(resultData)

        const arch = svg
            .selectAll('.arc')
            .data(pieData)
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('fill', (d) => {
                return color(d.data.label) as string
            })

        arch.append('path').attr('d', path)
        //})
    }
    return <div className="basicPieChart"/>
}

interface IResultPieChartProps {
    resultData: ChartData[];
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
}

const ScorePieChartObserver = observer(ScorePieChart);
export default ScorePieChartObserver;